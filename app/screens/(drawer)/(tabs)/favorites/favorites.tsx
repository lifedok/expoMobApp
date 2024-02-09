import { H4, YStack, Text } from 'tamagui';

import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { removeFromFavorite } from '~/app/store/reducer/data/data-slice';
import { Button } from "~/app/screens/(auth)/components";
import { useGetDataSelector } from "~/app/store/selectors";

export default function Favorites() {
  const favorites = useGetDataSelector().favorites;
  const data = useGetDataSelector;
  const dispatch = useAppDispatch();

  const onRemoveFavorite = (name: string): void => {
    dispatch(removeFromFavorite({ item: { id: name } }));
  };

  console.log('favorites', favorites)
  console.log('data', data)
  return (
    <YStack flex={1}>
      <H4>Favorites</H4>
      <Text color="$color">Hello 12</Text>

      <YStack alignItems="center" justifyContent="center">
        {/*{favorites.length ? (*/}
        {/*  favorites.map((item, index) => {*/}
        {/*    console.log('item', item);*/}
        {/*    return (*/}
        {/*      <YStack key={`favorites_${index}`}>*/}
        {/*        <Text color="red">{item.id}</Text>*/}
        {/*        <Button onPress={() => onRemoveFavorite(item.id)}>*/}
        {/*          Remove from favorites item {item.id}*/}
        {/*        </Button>*/}
        {/*      </YStack>*/}
        {/*    );*/}
        {/*  })*/}
        {/*) : (*/}
        {/*  <Text>No results</Text>*/}
        {/*)}*/}
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
