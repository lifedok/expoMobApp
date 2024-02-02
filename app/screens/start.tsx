import { YStack, H2, Separator, Theme } from 'tamagui';

import { useAppDispatch } from '~/app/hooks';
import { Button } from '~/app/screens/(auth)/components';
import { Action, addUser } from "~/app/store/actions";
import React from "react";
// import { setUser } from "~/app/store/reducer/user-data";

export default function StartPage(): React.ReactNode {
  const dispatch = useAppDispatch();

  const checkDispatcher = () => {
    console.log('checkDispatcher');
    dispatch(addUser());
  };
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <H2>start page</H2>
      <Button onPress={checkDispatcher}>Check dispather</Button>
      <Separator />
    </YStack>
  );
}
