import { createSlice } from '@reduxjs/toolkit';

import { UserSliceType } from '~/app/store/reducer/user/user-slice.type';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';

const initialState: UserSliceType = {
  userAuth: null,
};

export const userSlice = createSlice({
  name: ReducerNameEnum.USER,
  initialState,
  reducers: {
    userLogin: (state, action) => {
      console.log('action.payload', action.payload)
      state.userAuth = action.payload;
    },
  },
});

export const { userLogin } = userSlice.actions;
