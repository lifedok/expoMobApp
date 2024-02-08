import { createSlice } from '@reduxjs/toolkit';

import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';
import { UiProcessType } from '~/app/types/ui-process.type';

const initialState: UiProcessType = {
  theme: 'light',
};

export const uiProcess = createSlice({
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

export const { toggleUiTheme } = uiProcess.actions;
