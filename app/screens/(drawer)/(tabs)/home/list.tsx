import { Link } from 'expo-router';
import { H4, YStack, Text } from 'tamagui';

import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { Button } from '~/app/screens/(auth)/components';
import { HomeList } from '~/app/screens/(drawer)/(tabs)/home/mock';
import { addToFavorite, toggleUiTheme } from '~/app/store/actions';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';

export default function List() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(({ theme }) => theme);
  const trendingMovie = useAppSelector(({ trendingMovie }) => trendingMovie);

  const onChooseFavorite = (name: string): void => {
    dispatch(addToFavorite({ item: { id: name } }));
  };

  const onToggleUiTheme = (): void => {
    dispatch(toggleUiTheme());
  };

  console.log('trendingMovie', trendingMovie);
  return (
    <YStack flex={1}>
      <H4>List</H4>
      <Text color="$color">Hello</Text>
      <Button onPress={onToggleUiTheme}>Now theme is {theme}</Button>

      <Link href={{ pathname: EPathRouteScreen.DETAILS, params: { name: 'Vasy Pupkin Test' } }}>
        <H4>Details</H4>
      </Link>

      <Link href={`${EPathRouteScreen.HOME}/1`}>
        <H4>Details 2</H4>
      </Link>

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
