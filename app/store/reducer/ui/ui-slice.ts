import { createSlice } from '@reduxjs/toolkit';

import { UiSliceType } from '~/app/store/reducer/ui/ui-slice.type';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';

const initialState: UiSliceType = {
  theme: 'light',
};

export const uiSlice = createSlice({
  name: ReducerNameEnum.UI,
  initialState,
  reducers: {
    toggleUiTheme: (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark';
      } else {
        state.theme = 'light';
      }
    },
  },
});

export const { toggleUiTheme } = uiSlice.actions;
