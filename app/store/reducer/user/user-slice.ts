import { createSlice } from '@reduxjs/toolkit';

import { UserSliceType } from '~/app/store/reducer/user/user-slice.type';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';

const initialState: UserSliceType = {
  statusInfo: {
    text: '',
  },
};

export const userSlice = createSlice({
  name: ReducerNameEnum.USER,
  initialState,
  reducers: {
    addStatusInfo: (state, { payload }) => {
      state.statusInfo = { ...payload };
    },
  },
});

export const { addStatusInfo } = userSlice.actions;
