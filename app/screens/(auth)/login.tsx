import { signInWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Label,
  Input,
  Title,
  LinkComposite,
  Wrapper,
  InputSecure,
  Button,
} from '~/app/screens/(auth)/components';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { emailRules, passwordRules } from "~/app/utils/patterns";
import { LoginFormType } from "~/app/types/auth-form.type";
import InfoBar from "~/app/components/info-bar/info-bar";

export default function Login() {
  const [isFbLoading, setFbLoading] = useState<boolean>(false);
  const [hasFbErrors, setFbErrors] = useState<string>('');

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
    setFbErrors('');
    const { email, password } = data;

    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
        console.log('res', res);
        console.log('success', firebaseAuth.currentUser?.email);
      })
      .catch((error) => {
        setFbErrors(error.message);
      })
      .finally(() => {
        setFbLoading(false);
      });
  };

  return (
    <Wrapper>
      {hasFbErrors && <InfoBar text={hasFbErrors}/>}
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

      <LinkComposite isFlexEnd activeText="Forgot password" pathname={EPathRouteScreen.FORGOT} />

      <Button mt="$8" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
        {!isFbLoading ? 'Login' : 'Logging'}
      </Button>

      <LinkComposite
        text={"Don't have an Account?"}
        activeText="Sign up"
        pathname={EPathRouteScreen.REGISTER}
      />
    </Wrapper>
  );
}
