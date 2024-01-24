import { YStack, H2, Separator, Theme } from 'tamagui';

const Page = () => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>News</H2>
        <Separator />
      </YStack>
    </Theme>
  );
};

export default Page;
