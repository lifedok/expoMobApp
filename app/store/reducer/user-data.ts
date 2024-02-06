import { createReducer } from '@reduxjs/toolkit';

import {
  addToFavorite,
  loadTrendingMovie,
  removeFromFavorite,
  requireAuthorization,
  toggleUiTheme,
  userLogin,
  userLogout,
} from '~/app/store/actions';
import { TUserData } from '~/app/store/reducer/user-data.type';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';

const initialState: TUserData = {
  user: null,
  userLoginData: null,
  userLoading: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  homeList: [],
  favorites: [],
  theme: 'light',
  trendingMovie: {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 1,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(userLogin, (state) => {
      state.user = { id: 1 };
    })
    .addCase(userLogout, (state) => {
      state.user = null;
    })
    .addCase(addToFavorite, (state, { payload }) => {
      const { item } = payload;
      const isHasId = state.favorites.some((listItem) => listItem.id === item.id);
      if (!isHasId) {
        state.favorites.push(item);
      }
    })
    .addCase(removeFromFavorite, (state, { payload }) => {
      const { item } = payload;
      state.favorites.splice(
        state.favorites.findIndex((listItem) => listItem.id === item.id),
        1
      );
    })
    .addCase(toggleUiTheme, (state) => {
      state.theme === 'light' ? (state.theme = 'dark') : (state.theme = 'light');
    })
    .addCase(loadTrendingMovie, (state, action) => {
      state.trendingMovie = action.payload;
    });
});
export { reducer };
