
export type UserSliceType = {
  userAuth: AuthDataType | null;
};

export type AuthDataType = {
  email: string;
  username?: string;
};
