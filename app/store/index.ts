import { configureStore } from '@reduxjs/toolkit';

import { reducer } from '~/app/store/reducer/user-data';

// import { rootReducer } from '~/app/store/reducer/root-reduser';

// export const store = configureStore({
//   reducer: rootReducer,
// });

export const store = configureStore({ reducer });
