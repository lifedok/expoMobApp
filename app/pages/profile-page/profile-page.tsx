import React from 'react';
import { YStack, H2, Separator, Theme, Text } from 'tamagui';

export default function ProfilePage(): React.JSX.Element {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Profile</H2>
        <Separator />

        <Text>sdfs</Text>
      </YStack>

      {/*<Tabs>*/}
      {/*  <Tabs.Screen name="Home" component={HomeScreen} />*/}
      {/*  <Tabs.Screen name="Settings" component={SettingsScreen} />*/}
      {/*</Tabs>*/}
    </Theme>
  );
}
