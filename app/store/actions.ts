import { createAction } from '@reduxjs/toolkit';

import { IListItem } from '~/app/screens/(drawer)/(tabs)/home/mock';

export const Action = {
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  ADD_FAVORITE: 'data/addFavorite',
};

export const userLogin = createAction(Action.LOGIN);
export const userLogout = createAction(Action.LOGOUT);
export const addToFavorite = createAction<{ item: IListItem }>(Action.ADD_FAVORITE);
