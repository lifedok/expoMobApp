import { Link } from 'expo-router';
import React, { memo } from 'react';
import { Text, Card, CardProps, Paragraph, YStack, styled, Image } from 'tamagui';

import colors from '~/app/consts/colors';
import { ERoutePaths } from '~/app/types/enums/route.enum';
import { ResultItem } from '~/app/types/interfaces/apiresults.interface';
import { getImagePath, getMovieName } from '~/app/utils/helpers';

interface IMovieItem extends CardProps {
  item: ResultItem;
}
const MovieItem = (props: IMovieItem): React.JSX.Element => {
  const { item, ...cardProp } = props;

  return (
    <Link
      asChild
      href={{
        pathname: `${ERoutePaths.HOME}/${item.id}`,
        params: { type: item?.media_type },
      }}>
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
          <Image
            source={getImagePath({ path: item.poster_path, width: 200, image: 'poster' })}
            alt={item.title}
            style={{ width: cardProp.width as number, height: 200 }}
          />
        </Card.Header>
        <Card.Footer p={8} backgroundColor={colors.bgSecondary}>
          <YStack>
            <Text fontSize={20} color={colors.textColorSecondary} numberOfLines={1}>
              {getMovieName(item)}
            </Text>
            <Paragraph theme="alt2" color={colors.textColorOptional}>
              {item.release_date || item.first_air_date
                ? new Date(item.release_date! || item.first_air_date!).getFullYear()
                : 'No release date was provided'}
            </Paragraph>
          </YStack>
        </Card.Footer>
      </CardItemStyles>
    </Link>
  );
};

export default memo(MovieItem);

const CardItemStyles = styled(Card, {
  shadowColor: colors.shadowColor,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
});
