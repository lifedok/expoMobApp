import { sendPasswordResetEmail } from '@firebase/auth';
import { router } from 'expo-router';
import { useState } from 'react';
import { YStack, H4, styled } from 'tamagui';

import { Label, Input, Title, Button, LinkComposite, Wrapper } from './components/index.tsx';

import { firebaseAuth } from '~/app/utils/firebase';

export default function Reset() {
  const [email, setEmail] = useState<string>('');
  const [isResetLink, setResetLink] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasErrors, setErrors] = useState<boolean>(true);

  const handleResetPassword = async () => {
    setLoading(true);
    setErrors(false);
    await sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        setLoading(false);
        setResetLink(true);
      })
      .catch((error) => {
        alert(error.message);
        setErrors(true);
        setResetLink(false);
      });
  };

  return (
    <Wrapper>
      <Title>Reset</Title>

      {isResetLink ? (
        <BlockResult>
          <Text>A password reset request has been sent.</Text>
          <Text>Check your email or spam folder to find password reset link</Text>
          <Button onPress={() => router.replace('/screens/(auth)/login')} mt="$10">
            Back to login
          </Button>
        </BlockResult>
      ) : (
        <BlockInput>
          <Label>Email</Label>
          <Input placeholder="Enter your email" value={email} onChangeText={(v) => setEmail(v)} />
          <Button onPress={handleResetPassword} disabled={!email} mt="$8">
            {`Reset${hasErrors || !isLoading ? '' : 'ing'} password`}
          </Button>
          <LinkComposite activeText="Back to login" pathname="/screens/(auth)/login" />
        </BlockInput>
      )}
    </Wrapper>
  );
}

const Text = styled(H4, {
  textAlign: 'center',
  mt: '$5',
});

const BlockInput = styled(YStack, {
  alignItems: 'center',
  width: '100%',
});

const BlockResult = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
});
