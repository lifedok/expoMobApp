import { Dimensions } from 'react-native';
import { ScrollView, XStack, Text } from 'tamagui';

import { MovieItem } from '../movie-item/movie-item';

import { TrendingResult } from '~/app/types/interfaces/apiresults.interface';

interface IMovieList {
  list: TrendingResult;
}
export const MovieList = ({ list }: IMovieList) => {
  const window = Dimensions.get('window');

  const { results } = list;
  return (
    <ScrollView
      showsVerticalScrollIndicator
      width="100%"
      backgroundColor="$backgroundColor"
      borderRadius="$4"
      contentContainerStyle={{
        paddingVertical: 12,
        paddingHorizontal: 6,
      }}>
      <XStack flexWrap="wrap" gap="8px" alignItems="center" justifyContent="center">
        {results ? (
          results.map((item) => {
            return (
              <MovieItem
                item={item}
                width={window.width / 2 - 8 - 6}
                key={item.id}
                animation="bouncy"
                scale={0.9}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
              />
            );
          })
        ) : (
          <Text>No results</Text>
        )}
      </XStack>
    </ScrollView>
  );
};
