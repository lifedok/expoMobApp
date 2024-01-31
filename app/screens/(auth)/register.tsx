import { createUserWithEmailAndPassword } from '@firebase/auth';
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

import { firebaseAuth } from '~/app/utils/firebase';

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<any>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasErrors, setErrors] = useState<boolean>(true);

  const handleCreateAccount = async () => {
    setLoading(true);
    setErrors(false);
    console.log('handleCreateAccount', email);
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('user', user);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
        setErrors(true);
      });
  };

  return (
    <Wrapper>
      <Title>Register</Title>

      <Label>Username</Label>
      <Input placeholder="Enter your username" />

      <Label>Email</Label>
      <Input placeholder="Enter your Email" value={email} onChangeText={(v) => setEmail(v)} />

      <Label>Password</Label>
      <InputSecure
        placeholder="Enter your password"
        value={password}
        onChangeText={(v) => setPassword(v)}
      />

      <Label>Confirm password</Label>
      <InputSecure
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={(v) => setConfirmPassword(v)}
      />

      <Button mt="$8" onPress={handleCreateAccount} disabled={!email || !password}>
        {`Creat${hasErrors || !isLoading ? 'e' : 'ing'} account`}
      </Button>

      <LinkComposite text="Have an account?" activeText="Sign in" pathname="/screens/(auth)/login" />
    </Wrapper>
  );
}
