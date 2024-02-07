import { useAppSelector } from '~/app/hooks';
// import { AuthorizationStatus } from '~/app/types/enums/route.enum';

// export const useAuthStatus = () => useAppSelector(({ USER }) => USER.authorizationStatus);
//
// export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
//   authorizationStatus === AuthorizationStatus.UNKNOWN;

export const useGetUserSelector = () => useAppSelector(({ USER }) => USER);

export const useGetDataSelector = () => useAppSelector(({ DATA }) => DATA);

export const useGetUiSelector = () => useAppSelector(({ UI }) => UI);
