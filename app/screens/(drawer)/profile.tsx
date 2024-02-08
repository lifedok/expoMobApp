import { YStack, H2, Separator, Theme } from 'tamagui';

const Page = () => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Profile</H2>
        <Separator />
      </YStack>

      {/*<Tabs>*/}
      {/*  <Tabs.Screen name="Home" component={HomeScreen} />*/}
      {/*  <Tabs.Screen name="Settings" component={SettingsScreen} />*/}
      {/*</Tabs>*/}
    </Theme>
  );
};

export default Page;
