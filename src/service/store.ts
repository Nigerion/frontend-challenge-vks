import { configureStore } from "@reduxjs/toolkit";

import { catsApi } from "./api/catsApi";
import catsReducer from "./slice/catsSlice/catsSlice";

export const store = configureStore({
  reducer: { cats: catsReducer, [catsApi.reducerPath]: catsApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
