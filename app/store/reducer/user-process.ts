import { createSlice } from '@reduxjs/toolkit';

import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';
import { UserProcessType } from '~/app/types/user-process.type';

const initialState: UserProcessType = {
  user: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

export const userProcess = createSlice({
  name: ReducerNameEnum.USER,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    userLogin: (state) => {
      state.user = { id: 1 };
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});

export const { requireAuthorization, userLogin, userLogout } = userProcess.actions;
