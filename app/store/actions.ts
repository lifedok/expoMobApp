import { createAction } from '@reduxjs/toolkit';

export const Action = {
  LOGIN: 'user/login',
};

export const addUser = createAction(Action.LOGIN);
