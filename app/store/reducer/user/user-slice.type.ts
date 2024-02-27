import { IGlobalHandler } from '~/app/types/interfaces/global-text-info';

export type UserSliceType = {
  userAuth: AuthDataType | null;
  statusInfo: IGlobalHandler;
};

export type AuthDataType = {
  email: string;
  username?: string;
};
