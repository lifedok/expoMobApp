import { AuthorizationStatus } from '~/app/types/enums/route.enum';

export type TUserData = {
  user: TUser | null;
  userLoading: boolean;
  authorizationStatus: AuthorizationStatus;
};

export type TUser = {
  id: number;
};
