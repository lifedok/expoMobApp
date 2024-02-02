import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';

// import type { RootState } from '../../app/store';
// const rootReducer = combineSlices(counterSlice, quotesApiSlice)
// export type RootState = ReturnType<typeof rootReducer>
// Define a type for the slice state
// interface CounterState {
//   menuList: {  };
// }

// Define the initial state using that type
const initialState = {
  menuData: { id: 1 },
  menuDataLoading: false,
};

export const menuDataSlice = createSlice({
  name: ReducerNameEnum.DATA,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setMenuData: (state, action) => {
      state.menuData = action.payload;
    },
    setMenuDataLoading: (state, action: PayloadAction<boolean>) => {
      state.menuDataLoading = action.payload;
    },
  },
});

export const { setMenuData, setMenuDataLoading } = menuDataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;
// export const selectCount = (state) => state.counter.value;

// export default userSlice.reducer;
