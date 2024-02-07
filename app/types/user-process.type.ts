import { AuthorizationStatus } from '~/app/types/enums/route.enum';

export type UserProcessType = {
  user: TUser | null;
  authorizationStatus: AuthorizationStatus;
};

export type TUser = {
  id: number;
};

export type AuthDataType = {
  login: string;
  password: string;
};

export type UserLoginDataType = {
  userName: string;
  email: string;
};

export type UserDataType = {
  id: number;
  email: string;
  userName: string;
  avatarUrl: string;
  token: string;
};
