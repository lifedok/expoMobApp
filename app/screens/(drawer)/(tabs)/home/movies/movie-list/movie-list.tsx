import { Dimensions } from "react-native";
import { ScrollView, XStack, Text, styled, YStack, Spinner } from "tamagui";

import { MovieItem } from "../movie-item/movie-item";

import { ResultItem, TrendingResult } from "~/app/types/interfaces/apiresults.interface";

interface IMovieList {
  list: TrendingResult;
}

export const MovieList = ({ list }: IMovieList) => {
  const window = Dimensions.get("window");

  const { results } = list;

  const paddingHorizontal: number = 6;
  const gap: number = 8;
  return (
    <ScrollView
      showsVerticalScrollIndicator
      width="100%"
      backgroundColor="$backgroundColor"
      borderRadius="$4"
      contentContainerStyle={{
        paddingVertical: 12,
        paddingHorizontal: paddingHorizontal
      }}>
      <MovieListStyles gap={`${gap}px`}>

        {results ? (
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
          <Text>No results</Text>
        )}
      </MovieListStyles>
    </ScrollView>
  );
};

const MovieListStyles = styled(YStack, {
  flexWrap: "wrap",
  flexDirection: 'row',
  alignItems: "center",
  justifyContent: "center"
});
