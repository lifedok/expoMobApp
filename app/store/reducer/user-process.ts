import { createSlice } from '@reduxjs/toolkit';

import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';
import { UserProcessType } from '~/app/types/user-process.type';

const initialState: UserProcessType = {
  user: null,
  userAuth: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  errorText: '',
};

export const userProcess = createSlice({
  name: ReducerNameEnum.USER,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    userLogin: (state, action) => {
      state.userAuth = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
    setErrorText: (state, action) => {
      state.errorText = action.payload;
    },

  },
});

export const { requireAuthorization, userLogin, setUser, userLogout, setErrorText } = userProcess.actions;
