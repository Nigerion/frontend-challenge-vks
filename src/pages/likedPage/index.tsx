import Grid from "../../components/grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleFavorite } from "../../service/slice/catsSlice/catsSlice";
import type { getListCats } from "../../types";

export const LikedPage = () => {
  const dispatch = useAppDispatch();
  const liked = useAppSelector((state) => state.cats.liked);

  const handleToggleFavorite = (cat: getListCats) => {
    dispatch(toggleFavorite({ id: cat.id, url: cat.url }));
  };

  if (liked.length === 0) {
    return (
      <div className="empty-state">Вы пока не добавили ни одного кота</div>
    );
  }

  return (
    <Grid
      cats={liked}
      loading={false}
      hasMore={false}
      liked={liked}
      onLoadMore={() => {}}
      onToggleLiked={handleToggleFavorite}
    />
  );
};

export default LikedPage;
