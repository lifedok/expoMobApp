import React from 'react';
import { Text, YStack } from 'tamagui';

import { getMovieName } from '~/app/pages/shared/helpers';
import { ResultItem } from '~/app/types/interfaces/apiresults.interface';

interface IFavoriteItemInfo {
  item: ResultItem;
}
export const FavoriteItemInfo = ({ item }: IFavoriteItemInfo): React.ReactNode => {
  return (
    <YStack flex={1} gap={12} flexDirection="column" justifyContent="center">
      <Text fontSize={18}>{getMovieName(item)}</Text>
      <Text fontSize={12} color="grey">
        {item.release_date
          ? `Release date: ${item.release_date}`
          : item.first_air_date
            ? `The first broadcast: ${item.first_air_date}`
            : ''}
      </Text>
    </YStack>
  );
};
