import Grid from "../../components/grid/Grid";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useGetCatsInfiniteQuery } from "../../service/api/catsApi";
import { toggleFavorite } from "../../service/slice/catsSlice/catsSlice";
import type { getListCats } from "../../types";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const liked = useAppSelector((state) => state.cats.liked);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetCatsInfiniteQuery();

  const allCats = data?.pages.flat() ?? [];

  const handleToggleLiked = (cat: getListCats) => {
    dispatch(toggleFavorite({ id: cat.id, url: cat.url }));
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Grid
      cats={allCats}
      loading={isLoading || isFetchingNextPage}
      hasMore={!!hasNextPage}
      liked={liked}
      onLoadMore={handleLoadMore}
      onToggleLiked={handleToggleLiked}
    />
  );
};
