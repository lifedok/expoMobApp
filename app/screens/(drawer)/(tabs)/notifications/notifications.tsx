import { H4, YStack, Text } from 'tamagui';

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { addToFavorite, removeFromFavorite } from "~/app/store/actions";
import { Button } from "~/app/screens/(auth)/components";

export default function Notifications() {
  const favorites = useAppSelector(({ favorites }) => favorites);
  const dispatch = useAppDispatch();

  const onRemoveFavorite = (name: string): void => {
    dispatch(removeFromFavorite({ item: { id: name } }));
  };

  return (
    <YStack flex={1}>
      <H4>Favorites</H4>
      <Text color="$color">Hello 12</Text>

      <YStack alignItems="center" justifyContent="center">
        {favorites.length ? (
          favorites.map((item, index) => {
            console.log('item', item);
            return (
              <YStack key={`favorites_${index}`}>
                <Text color="red">
                  {item.id}
                </Text>
                <Button onPress={() => onRemoveFavorite(item.id)}>Remove from favorites item {item.id}</Button>
              </YStack>
            );
          })
        ) : (
          <Text>No results</Text>
        )}
      </YStack>

      {/*<Link href={{ pathname: '/(drawer)/(tabs)/home/details',*/}
      {/*  params: { name: 'Vasy Pupkin' }}}>*/}
      {/*  <Button>*/}
      {/*    <ButtonText>Details</ButtonText>*/}
      {/*  </Button>*/}
      {/*</Link>*/}
    </YStack>
  );
}
