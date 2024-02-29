import { router } from 'expo-router';
import React from 'react';

import { Button, Title, Wrapper } from '~/app/screens/(auth)/components';
import { ERoutePaths } from '~/app/types/enums/route.enum';
import { firebaseAuth } from '~/app/utils/firebase';

export default function NotFoundScreen(): React.JSX.Element {
  const isCurrentUser = !!firebaseAuth.currentUser;

  const handleReplace = () => {
    router.replace(isCurrentUser ? ERoutePaths.MOVIES : ERoutePaths.LOGIN);
  };
  return (
    <Wrapper>
      <Title>Oops!</Title>
      <Title>This screen doesn't exist.</Title>

      <Button mt="$8" onPress={() => handleReplace()}>
        Go to back screen!
      </Button>
    </Wrapper>
  );
}
