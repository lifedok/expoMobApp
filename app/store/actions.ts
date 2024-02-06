import { createAction } from '@reduxjs/toolkit';

import { IListItem } from '~/app/screens/(drawer)/(tabs)/home/mock';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';
import { TrendingResult } from '~/app/types/interfaces/apiresults';

export const Action = {
  AUTHORIZATION: 'user/auth',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  ADD_FAVORITE: 'data/addFavorite',
  REMOVE_FAVORITE: 'data/removeFavorite',
  TOGGLE_UI_THEME: 'ui/toggleTheme',
  TOGGLE_TRENDING_MOVIE: 'data/loadTrendingMovie',
};

export const requireAuthorization = createAction<AuthorizationStatus>(Action.AUTHORIZATION);
export const userLogin = createAction(Action.LOGIN);
export const userLogout = createAction(Action.LOGOUT);
export const addToFavorite = createAction<{ item: IListItem }>(Action.ADD_FAVORITE);
export const removeFromFavorite = createAction<{ item: IListItem }>(Action.REMOVE_FAVORITE);
export const toggleUiTheme = createAction(Action.TOGGLE_UI_THEME);
export const loadTrendingMovie = createAction<TrendingResult>(Action.TOGGLE_TRENDING_MOVIE);
