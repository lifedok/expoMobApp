import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';

import { Label, Input, Title, Button, LinkComposite, Wrapper } from '~/app/(auth)/components';
import { firebaseAuth } from '~/utils/firebase';

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<any>('');
  const [confirmPassword, setConfirmPassword] = useState<any>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSecureText, setSecureText] = useState<boolean>(true);
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
      <Input
        placeholder="Enter your password"
        value={password}
        secureTextEntry
        onChangeText={(v) => setPassword(v)}
      />

      <Label>Confirm password</Label>
      <Input
        mb="$4"
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={(v) => setConfirmPassword(v)}
      />

      <Button mt="$8" onPress={handleCreateAccount} disabled={!email || !password}>
        {`Creat${hasErrors || !isLoading ? 'e' : 'ing'} account`}
      </Button>

      <LinkComposite text="Have an account?" activeText="Sign in" pathname="/login" />
    </Wrapper>
  );
}
