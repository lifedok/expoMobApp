import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { YStack, styled, Spinner, Input } from 'tamagui';

import useDebounce from '~/app/hooks/useDebounce';
import { MovieList } from '~/app/pages/movies-page/movie-list';
import { getSearchResults } from '~/app/services/api';
import { useGetDataSelector } from '~/app/store/selectors';

export default function MoviesPage(): React.JSX.Element {
  const { trendingMovies, isLoadingTrendingMovies } = useGetDataSelector();
  const [searchValue, setSearchValue] = useState('');
  const debouncedString = useDebounce(searchValue, 300);

  const searchQuery = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length > 0,
  });

  return (
    <Main>
      <InputContainer>
        <Input
          placeholder="Search for a movie, tv show, person...."
          placeholderTextColor="#000"
          borderWidth={1}
          size="$4"
          value={searchValue}
          onChangeText={(v) => setSearchValue(v)}
        />
      </InputContainer>

      {isLoadingTrendingMovies || searchQuery.isLoading ? (
        <Spinner py={14} size="large" color="$blue10" width="100%" />
      ) : (
        <MovieList list={searchQuery.data ? searchQuery.data : trendingMovies} />
      )}
    </Main>
  );
}

const Main = styled(YStack, {
  flex: 1,
  name: 'Main',
  tag: 'main',
  flexDirection: 'column',
  backgroundColor: '$blue0'
});

export const InputContainer = styled(YStack, {
  paddingVertical: 12,
  paddingHorizontal: 12,
  paddingBottom: 6,
  maxWidth: 960,
  justifyContent: 'flex-end',
});
