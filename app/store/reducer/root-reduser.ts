import { combineReducers } from 'redux';

import { dataSlice } from '~/app/store/reducer/data/data-slice';
import { uiSlice } from '~/app/store/reducer/ui/ui-slice';
import { userSlice } from '~/app/store/reducer/user/user-slice';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';

export const rootReducer = combineReducers({
  [ReducerNameEnum.DATA]: dataSlice.reducer,
  [ReducerNameEnum.USER]: userSlice.reducer,
  [ReducerNameEnum.UI]: uiSlice.reducer,
});
