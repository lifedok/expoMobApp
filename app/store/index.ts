import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '~/app/store/reducer/root-reduser';
import { reducer } from '~/app/store/reducer/user-process';

export const store = configureStore({
  // reducer,
  reducer: rootReducer,
});
