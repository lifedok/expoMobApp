import { IGlobalTextInfo } from "~/app/types/interfaces/global-text-info";

export type UserSliceType = {
  userAuth: AuthDataType | null;
  statusInfo: IGlobalTextInfo
};

export type AuthDataType = {
  email: string;
  username?: string;
};
