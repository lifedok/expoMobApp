import { createSlice } from '@reduxjs/toolkit';

import { UserSliceType } from '~/app/store/reducer/user/user-slice.type';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';

const initialState: UserSliceType = {
  userAuth: null,
  statusInfo: {
    text: '',
  },
};

export const userSlice = createSlice({
  name: ReducerNameEnum.USER,
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.userAuth = action.payload;
    },
    addStatusInfo: (state, { payload }) => {
      state.statusInfo = { ...payload };
    },
  },
});

export const { setUserLogin, addStatusInfo } = userSlice.actions;
