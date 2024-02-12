import React, { useState } from 'react';
import { YStack, styled, Spinner, Input } from 'tamagui';

import { MovieList } from '~/app/pages/movies-page/movie-list';
import { useGetDataSelector } from '~/app/store/selectors';

export default function MoviesPage(): React.JSX.Element {
  const { trendingMovies, isLoadingTrendingMovies } = useGetDataSelector();
  const [searchString, setSearchString] = useState('');

  return (
    <Main>
      <InputContainer>
        <Input
          placeholder="Search for a movie, tv show, person...."
          placeholderTextColor="#000"
          borderWidth={1}
          size="$4"
          value={searchString}
          onChangeText={(text) => setSearchString(text)}
        />
      </InputContainer>

      {isLoadingTrendingMovies ? (
        <Spinner py={14} size="large" color="$blue10" width="100%" />
      ) : (
        <MovieList list={trendingMovies} />
      )}
    </Main>
  );
}

const Main = styled(YStack, {
  flex: 1,
  name: 'Main',
  tag: 'main',
  flexDirection: 'column',
});

export const InputContainer = styled(YStack, {
  paddingVertical: 12,
  paddingHorizontal: 12,
  paddingBottom: 6,
  maxWidth: 960,
  justifyContent: 'flex-end',
});
