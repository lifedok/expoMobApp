import { combineReducers } from 'redux';

import { dataProcess } from '~/app/store/reducer/data-process';
import { uiProcess } from '~/app/store/reducer/ui-process';
import { userProcess } from '~/app/store/reducer/user-process';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';

export const rootReducer = combineReducers({
  [ReducerNameEnum.DATA]: dataProcess.reducer,
  [ReducerNameEnum.USER]: userProcess.reducer,
  [ReducerNameEnum.UI]: uiProcess.reducer,
});
