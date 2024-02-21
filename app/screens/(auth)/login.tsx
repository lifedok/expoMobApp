import { signInWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useAppDispatch } from '~/app/hooks';
import {
  Label,
  Input,
  Title,
  LinkComposite,
  Wrapper,
  InputSecure,
  Button,
} from '~/app/screens/(auth)/components';
import { setErrorText, userLogin } from '~/app/store/reducer/user/user-slice';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { emailRules, passwordRules } from "~/app/utils/patterns";
import { LoginFormData } from "~/app/types/auth-form-data";

export default function Login() {
  const dispatch = useAppDispatch();
  const [isFbLoading, setFbLoading] = useState<boolean>(false);
  const [hasFbErrors, setFbErrors] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isLoading, isValid },
  } = useForm<LoginFormData>({ mode: 'onBlur', defaultValues: { email: '', password: '' } });
  const onSubmit = (data: LoginFormData) => {
    reset();
    console.log(data);
    console.log('isValid', isValid);
    if (isValid) {
      firebaseSignIn(data);
    }
  };

  const firebaseSignIn = async (data: LoginFormData) => {
    console.log('firebaseSignIn');
    setFbLoading(true);
    setFbErrors(false);

    const { email, password } = data;

    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        dispatch(userLogin({ email }));
        console.log('success', firebaseAuth.currentUser?.email);
      })
      .catch((error) => {
        alert(error.message);
        dispatch(setErrorText(error.message));
        setFbErrors(true);
      }) //lifedok@gmail.com
      .finally(() => {
        setFbLoading(false);
      });
  };

  return (
    <Wrapper>
      <Title>Login</Title>
      {hasFbErrors && <Title>{hasFbErrors}</Title>}

      <Controller
        control={control}
        name="email"
        rules={emailRules<LoginFormData>()}
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
        rules={passwordRules<LoginFormData>()}
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
