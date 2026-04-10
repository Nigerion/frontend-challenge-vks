import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { CatsState, FavoriteCat } from "../../../types";

const STORAGE_KEY = "cat-favorites";

const loadFavorites = (): FavoriteCat[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: CatsState = {
  liked: loadFavorites(),
};

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteCat>) => {
      const cat = action.payload;
      const index = state.liked.findIndex((f) => f.id === cat.id);
      if (index === -1) {
        state.liked.push(cat);
      } else {
        state.liked.splice(index, 1);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.liked));
    },
  },
});

export const { toggleFavorite } = catsSlice.actions;
export default catsSlice.reducer;
