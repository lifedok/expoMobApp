import { signInWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';

import { Label, Input, Title, Button, LinkComposite, Wrapper, InputSecure } from '~/app/(auth)/components';
import { firebaseAuth } from '~/utils/firebase';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<any>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  // const [hasErrors, setErrors] = useState<boolean>(true);
  // const [errorText, setErrorText] = useState<string>('');

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
        onChangeText={(v) => setPassword(v)}/>

      <LinkComposite isFlexEnd activeText="Forgot password" pathname="/reset" />

      <Button mt="$8" onPress={firebaseSignIn}>
        {!isLoading ? 'Login' : 'Logging'}
      </Button>
      <LinkComposite text={"Don't have an Account?"} activeText="Sign up" pathname="/register" />

    </Wrapper>
  );
}
