import React from 'react';
import { Text, YStack } from 'tamagui';

import { ResultItem } from '~/app/types/interfaces/apiresults.interface';
import { getMovieName, getMovieReleaseDate } from '~/app/utils/helpers';
import colors from "~/app/consts/colors";

interface IFavoriteItemInfo {
  item: ResultItem;
}
export const FavoriteItemInfo = ({ item }: IFavoriteItemInfo): React.ReactNode => {
  return (
    <YStack flex={1} gap={12} flexDirection="column" justifyContent="center">
      <Text fontSize={18} paddingTop={6}>{getMovieName(item)}</Text>
      <Text fontSize={12} color={colors.textColorOptional}>
        {getMovieReleaseDate({
          releaseDate: item?.release_date,
          firstAirDate: item?.first_air_date,
        })}
      </Text>
    </YStack>
  );
};
