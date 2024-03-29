import { signInWithEmailAndPassword } from '@firebase/auth';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useAppDispatch } from '~/app/hooks';
import { Spinner } from '~/app/pages/movies-page/spinner';
import {
  Label,
  Input,
  Title,
  LinkComposite,
  Wrapper,
  InputSecure,
  Button,
} from '~/app/screens/(auth)/components';
import { addStatusInfo } from '~/app/store/reducer/user/user-slice';
import { LoginFormType } from '~/app/types/auth-form.type';
import { ERoutePaths } from '~/app/types/enums/route.enum';
import { ETextStatus } from '~/app/types/interfaces/global-text-info';
import { firebaseAuth } from '~/app/utils/firebase';
import { emailRules, passwordRules } from '~/app/utils/patterns';

export default function Login() {
  const dispatch = useAppDispatch();
  const [isFbLoading, setFbLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<LoginFormType>({ mode: 'onBlur', defaultValues: { email: '', password: '' } });
  const onSubmit = (data: LoginFormType) => {
    reset();
    firebaseSignIn(data);
  };

  const firebaseSignIn = async (data: LoginFormType) => {
    setFbLoading(true);
    dispatch(addStatusInfo({ text: '' }));
    const { email, password } = data;

    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {})
      .catch((error) => {
        dispatch(addStatusInfo({ text: error.message, status: ETextStatus.ERROR }));
      })
      .finally(() => {
        setFbLoading(false);
      });
  };

  return (
    <Wrapper>
      <Title>Login</Title>

      <Controller
        control={control}
        name="email"
        rules={emailRules<LoginFormType>()}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <Label>Email</Label>
            <Input
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...(error?.message && { errorText: error.message })}
            />
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={passwordRules<LoginFormType>()}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <Label>Password</Label>
            <InputSecure
              placeholder="Enter your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...(error?.message && { errorText: error.message })}
            />
          </>
        )}
      />

      <LinkComposite isFlexEnd activeText="Forgot password" pathname={ERoutePaths.FORGOT} />

      <Button mt="$8" onPress={handleSubmit(onSubmit)} disabled={!isValid || isFbLoading}>
        {isFbLoading && <Spinner size="small" />}
        {!isFbLoading ? 'Login' : 'Logging'}
      </Button>

      <LinkComposite
        text={"Don't have an Account?"}
        activeText="Sign up"
        pathname={ERoutePaths.REGISTER}
      />
    </Wrapper>
  );
}
