import { router } from 'expo-router';

import { Button, Title, Wrapper } from '~/app/screens/(auth)/components';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';

export default function NotFoundScreen() {
  return (
    <Wrapper>
      <Title>Oops!</Title>
      <Title>This screen doesn't exist.</Title>

      <Button mt="$8" onPress={() => router.replace(EPathRouteScreen.HOME)}>
        Go to home screen!
      </Button>
    </Wrapper>
  );
}
