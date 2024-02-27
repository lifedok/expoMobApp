import { router } from 'expo-router';

import { Button, Title, Wrapper } from '~/app/screens/(auth)/components';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { firebaseAuth } from "~/app/utils/firebase";

export default function NotFoundScreen() {
  const isCurrentUser = !!firebaseAuth.currentUser;

  const handleReplace = () => {
    router.replace(
      !!isCurrentUser ? (EPathRouteScreen.HOME as never) : (EPathRouteScreen.LOGIN as never)
    );
  }
  return (
    <Wrapper>
      <Title>Oops!</Title>
      <Title>This screen doesn't exist.</Title>

      {/*TODO*/}
      <Button mt="$8" onPress={() => handleReplace()}>
        Go to back screen!
      </Button>
    </Wrapper>
  );
}
