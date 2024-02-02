import { createReducer, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import firebase from 'firebase/compat';

import { Action, addToFavorite, userLogin, userLogout } from '~/app/store/actions';
import { TUserData } from '~/app/store/reducer/user-data.type';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';

// import type { RootState } from '../../app/store';
// const rootReducer = combineSlices(counterSlice, quotesApiSlice)
// export type RootState = ReturnType<typeof rootReducer>
// Define a type for the slice state
// interface CounterState {
//   menuList: {  };
// }

// Define the initial state using that type
const initialState: TUserData = {
  user: null,
  userLoading: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  homeList: [],
  favorites: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userLogin, (state) => {
      state.user = { id: 1 };
    })
    .addCase(userLogout, (state) => {
      state.user = null;
    })
    .addCase(addToFavorite, (state, { payload} ) => {
      const { item } = payload;
      console.log('payload', payload);
      console.log('item', item);
      // const isHasId = state.favorites.includes(item);
      const isHasId = state.favorites.some((listItem) => listItem.id === item.id);
      console.log('isHasId', isHasId);
      console.log('state.favorites', state.favorites);

      if (!isHasId) {
        state.favorites.push(item);
      }
    });
});
export { reducer };
// export const userSlice = createSlice({
//   name: ReducerNameEnum.USER,
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       const { user } = action.payload;
//       state.user = user;
//     },
//     setUserLoading: (state, action: PayloadAction<boolean>) => {
//       state.userLoading = action.payload;
//     },
//
//   },
// });
//
// export const { setUser, setUserLoading } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;
// export const selectCount = (state) => state.counter.value;

// export default userSlice.reducer;
