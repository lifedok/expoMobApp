import { router } from 'expo-router';

import { Button, Title, Wrapper } from '~/app/(auth)/components';

export default function NotFoundScreen() {
  return (
    <Wrapper>
      <Title>Oops!</Title>
      <Title>This screen doesn't exist.</Title>

      <Button mt="$8" onPress={() => router.replace('/(auth)/login')}>
        Go to home screen!
      </Button>
    </Wrapper>
  );
}
