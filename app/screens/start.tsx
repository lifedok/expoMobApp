import React from 'react';
import { YStack, H2, Separator } from 'tamagui';

import { useAppDispatch } from '~/app/hooks';
import { userLogout } from '~/app/store/reducer/user-process';
import { Button } from "~/app/screens/(auth)/components";

export default function StartPage(): React.ReactNode {
  const dispatch = useAppDispatch();

  const getStart = () => {
    console.log('get user token and redirect'); // TODO: user
  };

  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <H2>start page</H2>
      <Button onPress={getStart}>Get Start</Button>
      <Separator />
    </YStack>
  );
}
