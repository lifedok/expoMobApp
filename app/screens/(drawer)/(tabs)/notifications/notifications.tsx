import { H4, YStack, Text } from 'tamagui';

export default function Notifications() {
  return (
    <YStack flex={1}>
      <H4>Notifications</H4>
      <Text color="$color">Hello</Text>

      {/*<Link href={{ pathname: '/(drawer)/(tabs)/home/details',*/}
      {/*  params: { name: 'Vasy Pupkin' }}}>*/}
      {/*  <Button>*/}
      {/*    <ButtonText>Details</ButtonText>*/}
      {/*  </Button>*/}
      {/*</Link>*/}
    </YStack>
  );
}
