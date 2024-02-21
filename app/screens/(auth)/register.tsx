import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useAppDispatch } from '~/app/hooks';
import {
  Button,
  Input,
  InputSecure,
  Label,
  LinkComposite,
  Title,
  Wrapper,
} from '~/app/screens/(auth)/components';
import { SignInFormData } from '~/app/types/auth-form-data';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { emailRules, passwordRules, usernameRules } from '~/app/utils/patterns';

export default function Register() {
  const dispatch = useAppDispatch();
  const [hasErrors, setErrors] = useState<boolean>(true);
  const [isFbLoading, setFbLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isLoading, isValid },
  } = useForm<SignInFormData>({
    mode: 'onBlur',
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: SignInFormData) => {
    reset();
    console.log(data);
    console.log('isValid', isValid);
    if (isValid) {
      createAccount(data);
    }
  };

  const createAccount = async (data: SignInFormData) => {
    setFbLoading(true);
    // setFbErrors(false);

    const { email, password } = data;

    // console.log('handleCreateAccount', email);
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('user', user);
        // setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setErrors(true);
      })
      .finally(() => {
        setFbLoading(false);
      });
  };

  return (
    <Wrapper>
      <Title>Register</Title>

      <Controller
        control={control}
        name="username"
        rules={usernameRules<SignInFormData>()}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <Label>Username</Label>
            <Input
              placeholder="Enter your username"
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
        name="email"
        rules={emailRules<SignInFormData>()}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <Label>Email</Label>
            <Input
              placeholder="Enter your Email"
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
        rules={passwordRules<SignInFormData>()}
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

      <Controller
        control={control}
        name="password"
        rules={passwordRules<SignInFormData>()}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <Label>Confirm password</Label>
            <InputSecure
              placeholder="Confirm password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...(error?.message && { errorText: error.message })}
            />
          </>
        )}
      />

      <Button mt="$8" onPress={handleSubmit(onSubmit)} disabled={!isValid}>
        {`Creat${!isFbLoading ? 'e' : 'ing'} account`}
      </Button>

      <LinkComposite
        text="Have an account?"
        activeText="Sign in"
        pathname={EPathRouteScreen.LOGIN}
      />
    </Wrapper>
  );
}
