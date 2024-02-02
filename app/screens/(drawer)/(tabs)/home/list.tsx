import { Link } from 'expo-router';
import { H4, YStack, Text } from 'tamagui';

import { Button } from '~/app/screens/(auth)/components';
import { HomeList } from '~/app/screens/(drawer)/(tabs)/home/mock';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { useAppDispatch } from "~/app/hooks";
import { addToFavorite, userLogin } from "~/app/store/actions";
// import { Button, ButtonText } from '~/tamagui.config';

export default function List() {
  const dispatch = useAppDispatch();

  const onChooseFavorite = (name: string) => {
    console.log('name', name);
    dispatch(addToFavorite({ item: { id: name } }));
    return null;
  };

  return (
    <YStack flex={1}>
      <H4>List</H4>
      <Text color="$color">Hello</Text>

      {/*<Link href={{ pathname: EPathRouteScreen.DETAILS, params: { name: 'Vasy Pupkin Test' } }}>*/}
      {/*  <Button>*/}
      {/*    <ButtonText>Details</ButtonText>*/}
      {/*  </Button>*/}
      {/*</Link>*/}

      {HomeList.map((item, index) => (
        <YStack key={index}>
          <YStack>
            <H4>{item.id}</H4>
          </YStack>
          <Button onPress={() => onChooseFavorite(item.id)}>Choose as a favorite</Button>
        </YStack>
      ))}
    </YStack>
  );
}
