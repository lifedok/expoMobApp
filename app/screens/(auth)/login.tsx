import { signInWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';

import {
  Label,
  Input,
  Title,
  Button,
  LinkComposite,
  Wrapper,
  InputSecure,
} from './components/index.tsx';

import { AuthData } from '~/app/types/auth-data';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';
import { userLogin } from "~/app/store/actions";
import { useAppDispatch } from "~/app/hooks";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  // const [hasErrors, setErrors] = useState<boolean>(true);
  // const [errorText, setErrorText] = useState<string>('');
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    dispatch(userLogin());
  };

  const firebaseSignIn = async () => {
    //   setLoading(true);
    //   setErrors(false);
    //
    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        // setErrors(true);
      });
  };

  return (
    <Wrapper>
      <Title>Login</Title>

      <Label>Email</Label>
      <Input value={email} onChangeText={(v) => setEmail(v)} placeholder="Enter your email" />

      <Label>Password</Label>
      <InputSecure
        placeholder="Enter your password"
        value={password}
        onChangeText={(v) => setPassword(v)}
      />

      <LinkComposite isFlexEnd activeText="Forgot password" pathname={EPathRouteScreen.FORGOT} />

      <Button mt="$8" onPress={onSubmit}>
        {!isLoading ? 'Login' : 'Logging'}
      </Button>
      <LinkComposite
        text={"Don't have an Account?"}
        activeText="Sign up"
        pathname={EPathRouteScreen.REGISTER}
      />
    </Wrapper>
  );
}
