export interface getListCats {
  id: string;
  url: string;
  width?: number;
  height?: number;
  //   breeds: [];
  //   favourite: {};
}

export interface FavoriteCat {
  id: string;
  url: string;
}

export interface CatsState {
  liked: FavoriteCat[];
}

export interface GridProps {
  cats: getListCats[];
  loading: boolean;
  hasMore: boolean;
  liked: { id: string }[];
  onLoadMore: () => void;
  onToggleLiked: (cat: getListCats) => void;
  emptyMessage?: string;
}

export interface CardProps {
  cat: getListCats;
  isLiked: boolean;
  onToggleLiked: (cat: getListCats) => void;
  ref?: HTMLDivElement;
}
