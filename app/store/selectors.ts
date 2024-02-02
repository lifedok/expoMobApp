import { useAppSelector } from '~/app/hooks';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';

export const useAuthStatus = () => useAppSelector(({ USER }) => USER.authorizationStatus);
export const useIsDataLoaded = () => useAppSelector(({ DATA }) => DATA.menuDataLoading);

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;

export const useGetUser = () => useAppSelector(({ USER }) => USER.user);

export const useGetMenuData = () => useAppSelector(({ DATA }) => DATA.menuData);
