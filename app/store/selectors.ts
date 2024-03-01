import { useAppSelector } from '~/app/hooks';

export const useGetUserSelector = () => useAppSelector(({ USER }) => USER);

export const useGetDataSelector = () => useAppSelector(({ DATA }) => DATA);

export const useGetUiSelector = () => useAppSelector(({ UI }) => UI);
