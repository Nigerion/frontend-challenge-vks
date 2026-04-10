import { type BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import type { AxiosError } from "axios";

import type { getListCats } from "../../types";
import type { AxiosBaseQueryArgs, AxiosBaseQueryError } from "../../types/api";
import { api } from "./api";

const LIMIT = 20;

const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await api({
        url: url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
          message: err.message,
        },
      };
    }
  };

export const catsApi = createApi({
  reducerPath: "catsApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getCats: build.infiniteQuery<getListCats[], void, number>({
      infiniteQueryOptions: {
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          if (lastPage.length === 0) return undefined;
          return lastPageParam + 1;
        },
      },
      query: ({ pageParam = 0 }) => ({
        url: "/images/search",
        method: "get",
        params: {
          limit: LIMIT,
          page: pageParam,
          order: "DESC",
        },
      }),
    }),
  }),
});

export const { useGetCatsInfiniteQuery } = catsApi;
