
export type SignInFormType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormType = Required<Pick<SignInFormType, 'email' | 'password'>>;

export type ForgotFormType = Required<Pick<LoginFormType, 'email'>>;

