import { H4, YStack, Text } from 'tamagui';
import { Button, ButtonText } from "~/tamagui.config";
import { Link } from "expo-router";

export default function List() {
  return (
    <YStack flex={1}>
      <H4>List</H4>
      <Text color="$color">Hello</Text>

      <Link href={{ pathname: '/(drawer)/(tabs)/home/details',
        params: { name: 'Vasy Pupkin' }}}>
        <Button>
          <ButtonText>Details</ButtonText>
        </Button>
      </Link>
    </YStack>
  );
}
