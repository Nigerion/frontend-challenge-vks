import { useCallback, useRef } from "react";

import type { GridProps } from "../../types";
import Card from "../card/Card";
import cl from "./Grid.module.scss";

const Grid = ({
  cats,
  loading,
  hasMore,
  liked,
  onLoadMore,
  onToggleLiked,
  emptyMessage = "Ничего не найдено",
}: GridProps) => {
  const observer = useRef<IntersectionObserver>(undefined);

  const lastCatRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  const isLiked = (id: string) => liked.some((f) => f.id === id);

  if (cats.length === 0 && !loading) {
    return <div className={cl.empty}>{emptyMessage}</div>;
  }

  return (
    <>
      <div className={cl.grid}>
        {cats.map((cat, index) => {
          const isLast = index === cats.length - 1;
          return (
            <Card
              key={cat.id}
              cat={cat}
              isLiked={isLiked(cat.id)}
              onToggleLiked={onToggleLiked}
              ref={isLast && hasMore ? lastCatRef : null}
            />
          );
        })}
      </div>
      {loading && (
        <div className={cl.loader}>... загружаем еще котиков ...</div>
      )}
      {!hasMore && cats.length > 0 && !loading && (
        <div className={cl.loader}>Больше картинок нету</div>
      )}
    </>
  );
};

export default Grid;
