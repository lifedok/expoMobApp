import { H4, YStack, Text } from 'tamagui';

import { useAppSelector } from '~/app/hooks';

export default function Notifications() {
  const favorites = useAppSelector(({ favorites }) => favorites);

  console.log('favorites', favorites);
  console.log('favorites.length', favorites.length);

  return (
    <YStack flex={1}>
      <H4>Favorites</H4>
      <Text color="$color">Hello 12</Text>

      <YStack alignItems="center" justifyContent="center">
        {favorites.length ? (
          favorites.map((item, index) => {
            console.log('item', item);
            return (
              <Text color="red" key={index}>
                {item.id}
              </Text>
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
