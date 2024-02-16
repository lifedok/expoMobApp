import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Text, Card, CardProps, Paragraph, YStack, styled } from 'tamagui';

import { getImagePath, getMovieName } from '~/app/pages/shared/helpers';
import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { ResultItem } from '~/app/types/interfaces/apiresults.interface';

interface IMovieItem extends CardProps {
  item: ResultItem;
}
export const MovieItem = (props: IMovieItem) => {
  const { item, ...cardProp } = props;

  return (
    <Link href={`${EPathRouteScreen.HOME}/${item.id}` as never} asChild>
      <CardItemStyles
        elevate
        width={200}
        height={260}
        scale={1}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.975 }}
        overflow="hidden"
        animation="bouncy"
        {...cardProp}>
        <Card.Header p={0}>
          <Animated.Image
            source={getImagePath({ path: item.poster_path, width: 200, image: 'poster' })}
            alt={item.title}
            style={{ width: cardProp.width as number, height: 200 }}
          />
        </Card.Header>
        <Card.Footer p={8} backgroundColor="darkblue">
          <YStack>
            <Text fontSize={20} color="lightblue">
              {getMovieName(item)}
            </Text>
            <Paragraph theme="alt2">
              {item.release_date || item.first_air_date
                ? new Date(item.release_date! || item.first_air_date!).getFullYear()
                : ''}
            </Paragraph>
          </YStack>
        </Card.Footer>
      </CardItemStyles>
    </Link>
  );
};

const CardItemStyles = styled(Card, {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
});
