import { createSlice } from '@reduxjs/toolkit';

import { DataProcessType } from '~/app/types/data-process.type';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';

const initialState: DataProcessType = {
  trendingMovie: [],
  favorites: [],
  isDataLoading: false,
};

export const dataProcess = createSlice({
  name: ReducerNameEnum.DATA,
  initialState,
  reducers: {
    loadTrendingMovie: (state, action) => {
      state.trendingMovie = action.payload;
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

export const { loadTrendingMovie, addToFavorite, removeFromFavorite } = dataProcess.actions;
