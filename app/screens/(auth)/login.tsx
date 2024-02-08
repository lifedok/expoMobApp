import { signInWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';

import { useAppDispatch } from '~/app/hooks';
import {
  Label,
  Input,
  Title,
  Button,
  LinkComposite,
  Wrapper,
  InputSecure,
} from '~/app/screens/(auth)/components';
import { setErrorText, userLogin } from '~/app/store/reducer/user-process';
import { useGetUserSelector } from '~/app/store/selectors';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasErrors, setErrors] = useState<boolean>(true);
  // const [errorText, setErrorText] = useState<string>('');
  const dispatch = useAppDispatch();
  const { errorText } = useGetUserSelector();

  const isFormError = (): boolean => {
    let isError: boolean = false;
    if (email?.length) {
      if (!email.includes('@')) {
        dispatch(setErrorText('Invalid email'));
        isError = true;
      } else if (email.indexOf(' ') != -1) {
        dispatch(setErrorText('Email can not contain spaces'));
        isError = true;
      }
    }
    if (password?.length) {
      if (password.length < 6) {
        dispatch(setErrorText('Password should be more then 6 charters'));
        isError = true;
      } else if (password.indexOf(' ') != -1) {
        dispatch(setErrorText('Password can not contain spaces'));
        isError = true;
      }
    }
    return isError;
  };

  const onSubmit = () => {
    console.log('onSubmit');
    const formIsValid = isFormError();
    if (!formIsValid) {
      firebaseSignIn();
    }
  };

  const firebaseSignIn = async () => {
    setLoading(true);
    setErrors(false);

    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        dispatch(userLogin({ email }));
        console.log('success', firebaseAuth.currentUser?.email);
      })
      .catch((error) => {
        alert(error.message);
        dispatch(setErrorText(error.message));
        setErrors(true);
      }) //lifedok@gmail.com
      .finally(() => {
        setLoading(false);
      });
  };

  console.log('email', email);
  console.log('password', password);

  return (
    <Wrapper>
      <Title>Login</Title>
      {errorText && <Title>{errorText}</Title>}

      <Label>Email</Label>
      <Input placeholder="Enter your email" value={email} onChangeText={(v) => setEmail(v)} />

      <Label>Password</Label>
      <InputSecure
        placeholder="Enter your password"
        value={password}
        onChangeText={(v) => setPassword(v)}
      />

      <LinkComposite isFlexEnd activeText="Forgot password" pathname={EPathRouteScreen.FORGOT} />

      <Button mt="$8" onPress={onSubmit} disabled={!email || !password}>
        {hasErrors || !isLoading ? 'Login' : 'Logging'}
      </Button>

      <LinkComposite
        text={"Don't have an Account?"}
        activeText="Sign up"
        pathname={EPathRouteScreen.REGISTER}
      />
    </Wrapper>
  );
}
