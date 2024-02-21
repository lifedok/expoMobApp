
export type SignInFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormData = Required<Pick<SignInFormData, 'email' | 'password'>>;

export type ForgotFormData = Required<Pick<LoginFormData, 'email'>>;

