import { createSlice } from "@reduxjs/toolkit";

import { DataSliceType } from '~/app/store/reducer/data/data-slice.type';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';

const initialState: DataSliceType = {
  trendingMovies: {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  },
  movieList: [],
  isLoadingTrendingMovies: false,
  favorites: [],
  isDataLoading: false,
};

export const dataSlice = createSlice({
  name: ReducerNameEnum.DATA,
  initialState,
  reducers: {
    loadTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    loadMovieList: (state, action) => {
      const data = [...new Set(state.movieList.concat(action.payload))];
      state.movieList = data;
    },
    isLoadingTrendingMovies: (state, action) => {
      state.isLoadingTrendingMovies = action.payload;
    },
    addToFavorite: (state, { payload }) => {
      const { item } = payload;
      const isHasId = state.favorites.some((listItem) => listItem.id === item.id);
      if (!isHasId) {
        state.favorites.push(item);
      }
    },
    removeFromFavorite: (state, { payload }) => {
      const { item } = payload;
      state.favorites.splice(
        state.favorites.findIndex((listItem) => listItem.id === item.id),
        1
      );
    },
  },
});

export const { loadTrendingMovies, isLoadingTrendingMovies, addToFavorite, removeFromFavorite, loadMovieList } = dataSlice.actions;
