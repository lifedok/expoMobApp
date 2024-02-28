import { Link } from 'expo-router';
import { memo } from 'react';
import Animated from 'react-native-reanimated';
import { Text, Card, CardProps, Paragraph, YStack, styled } from 'tamagui';

import { EPathRouteScreen } from '~/app/types/enums/route.enum';
import { ResultItem } from '~/app/types/interfaces/apiresults.interface';
import { getImagePath, getImageTransitionTag, getMovieName } from '~/app/utils/helpers';

interface IMovieItem extends CardProps {
  item: ResultItem;
}
const MovieItem = (props: IMovieItem) => {
  const { item, ...cardProp } = props;

  return (
    <Link
      asChild
      href={
        {
          pathname: `${EPathRouteScreen.HOME}/${item.id}`,
          params: { type: item?.media_type },
        } as never
      }>
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
            sharedTransitionTag={getImageTransitionTag({
              media_type: item.media_type,
              id: item.id,
            })}
          />
        </Card.Header>
        <Card.Footer p={8} backgroundColor="darkblue">
          <YStack>
            <Text fontSize={20} color="lightblue" numberOfLines={1}>
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

export default memo(MovieItem);

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
