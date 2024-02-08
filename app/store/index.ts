import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '~/app/store/reducer/root-reduser';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
