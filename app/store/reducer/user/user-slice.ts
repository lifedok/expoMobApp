import { createSlice } from '@reduxjs/toolkit';

import { fetchUser } from '~/app/store/reducer/user/user-actions.thunk';
import { UserSliceType } from '~/app/store/reducer/user/user-slice.type';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';

const initialState: UserSliceType = {
  user: null,
  userAuth: null,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  testUserData: null,
  isLoading: false,
  errorText: '',
};

export const userSlice = createSlice({
  name: ReducerNameEnum.USER,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    userLogin: (state, action) => {
      state.userAuth = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
    setErrorText: (state, action) => {
      state.errorText = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchUser.pending, (state, action) => {
        console.log('pending action', action);
        state.isLoading = true;
        state.errorText = '';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // Add user to the state array
        console.log('fulfilled action', action);
        state.isLoading = false;
        state.testUserData = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        console.log('rejected action', action);
        state.isLoading = false;
      });
  },
});

export const { requireAuthorization, userLogin, userLogout, setErrorText } =
  userSlice.actions;
