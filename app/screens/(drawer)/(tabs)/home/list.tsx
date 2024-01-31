import { Link } from 'expo-router';
import { H4, YStack, Text } from 'tamagui';

import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { Button, ButtonText } from '~/tamagui.config';

export default function List() {
  return (
    <YStack flex={1}>
      <H4>List</H4>
      <Text color="$color">Hello</Text>

      <Link href={{ pathname: EPathRouteScreen.DETAILS, params: { name: 'Vasy Pupkin Test' } }}>
        <Button>
          <ButtonText>Details</ButtonText>
        </Button>
      </Link>
    </YStack>
  );
}
