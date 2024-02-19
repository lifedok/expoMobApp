import { User as IUser } from '@firebase/auth';

import { AuthorizationStatus } from '~/app/types/enums/route.enum';

export type UserSliceType = {
  user: IUser | null;
  userAuth: AuthDataType | null;
  authorizationStatus: AuthorizationStatus;
  testUserData: any;
  isLoading: boolean;
  errorText?: string;
};

export type AuthDataType = {
  email: string;
  userName?: string;
};

export type UserDataType = {
  id: number;
  email: string;
  userName: string;
  avatarUrl: string;
  token: string;
};
