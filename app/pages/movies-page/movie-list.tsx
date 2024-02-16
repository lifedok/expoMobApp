import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import { ScrollView, Text, styled, YStack } from 'tamagui';

import { MovieItem } from './movie-item';

import { ResultItem, TrendingResult } from '~/app/types/interfaces/apiresults.interface';

interface IMovieList {
  list: TrendingResult;
}

export const MovieList = ({ list }: IMovieList) => {
  const bottomTabBarHeight: number = useBottomTabBarHeight();

  const window = Dimensions.get('window');

  const { results } = list;

  const paddingHorizontal: number = 6;
  const gap: number = 8;
  const paddingTop: number = 6;

  return (
    <ScrollView
      showsVerticalScrollIndicator
      width="100%"
      backgroundColor="$backgroundColor"
      borderRadius="$4"
      contentContainerStyle={{
        paddingVertical: 12,
        paddingTop,
        paddingHorizontal,
        paddingBottom: bottomTabBarHeight + paddingTop,
      }}>
      <MovieListStyles gap={`${gap}px`}>
        {results && results.length > 0 ? (
          results.map((item: ResultItem) => {
            return (
              <MovieItem
                item={item}
                width={window.width / 2 - gap - paddingHorizontal}
                key={item.id}
                animation="bouncy"
                scale={0.9}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
              />
            );
          })
        ) : (
          <Text fontSize={16} color={'$blue10'}>No results</Text>
        )}
      </MovieListStyles>
    </ScrollView>
  );
};

const MovieListStyles = styled(YStack, {
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});
