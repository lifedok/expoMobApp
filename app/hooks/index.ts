import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, State } from '~/app/types/state';

// export const useAppDispatch = () => useDispatch<AppDispatch>();
//
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector = useSelector.withTypes<State>();
// export const useAppStore = useStore.withTypes<store>()

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
