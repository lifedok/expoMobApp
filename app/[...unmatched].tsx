import { router } from 'expo-router';

import { Button, Title, Wrapper } from '~/app/screens/(auth)/components';
// /screens
export default function NotFoundScreen() {
  return (
    <Wrapper>
      <Title>Oops!</Title>
      <Title>This screen doesn't exist.</Title>

      <Button mt="$8" onPress={() => router.replace('/screens/(auth)/login')}>
        Go to home screen!
      </Button>
    </Wrapper>
  );
}
