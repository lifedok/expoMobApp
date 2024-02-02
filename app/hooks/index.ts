import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

import { AppDispatch, RootState } from "~/app/types/state";

// export const useAppDispatch = () => useDispatch<AppDispatch>();
//
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
// export const useAppStore = useStore.withTypes<AppStore>()

