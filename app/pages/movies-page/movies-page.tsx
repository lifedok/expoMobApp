import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import { YStack, styled, Input, H4 } from 'tamagui';

import { useAppDispatch } from '~/app/hooks';
import useDebounce from '~/app/hooks/useDebounce';
import MovieItem from '~/app/pages/movies-page/movie-item';
import { Spinner } from '~/app/pages/movies-page/spinner';
import { getSearchResults } from '~/app/services/api';
import { fetchTrendingMovies } from '~/app/store/reducer/data/data-actions.thunk';
import { useGetDataSelector } from '~/app/store/selectors';
import { ResultItem } from '~/app/types/interfaces/apiresults.interface';

export default function MoviesPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const window = Dimensions.get('window');

  const { movieList, isLoadingTrendingMovies } = useGetDataSelector();
  const [searchValue, setSearchValue] = useState('');

  const debouncedString = useDebounce(searchValue, 200);

  const searchQuery = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length > 0,
  });

  const paddingHorizontal: number = 6;
  const gap: number = 6;
  const paddingTop: number = 6;

  const bottomTabBarHeight: number = useBottomTabBarHeight();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTrendingMovies({ page: currentPage }));
  }, [currentPage]);

  const loadMorePage = () => {
    if (!isLoadingTrendingMovies || !searchQuery.data?.results) {
      setCurrentPage(currentPage + 1);
    }
  };

  const _renderSpinner = () => {
    return <Spinner py={14} width="100%" />;
  };

  const _renderItem = (item: ResultItem) => {
    const width = window.width / 2 - (gap + paddingHorizontal / 2);
    return (
      <MovieItem
        item={item}
        width={width}
        key={item.id}
        animation="bouncy"
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
      />
    );
  };

  const _renderLoader = () => {
    return (
      <LoaderWrapper>
        {isLoadingTrendingMovies ? _renderSpinner() : null}
        {searchValue.length > 0 && !searchQuery?.data?.results.length && <H4>No results</H4>}
      </LoaderWrapper>
    );
  };

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

      {searchQuery.isLoading && _renderSpinner()}

      <FlatList
        data={searchQuery.data?.results ? searchQuery.data.results : movieList}
        renderItem={({ item }) => _renderItem(item)}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        initialNumToRender={5}
        contentContainerStyle={{
          paddingTop,
          paddingHorizontal,
          paddingVertical: 12,
          paddingBottom: bottomTabBarHeight + paddingTop,
          borderRadius: 12,
          width: '100%',
          gap,
        }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        style={{ flex: 1 }}
        horizontal={false}
        numColumns={2}
        ListFooterComponent={_renderLoader}
        onEndReached={loadMorePage}
      />
    </Main>
  );
}

const Main = styled(YStack, {
  flex: 1,
  name: 'Main',
  tag: 'main',
  flexDirection: 'column',
  backgroundColor: '$blue0',
});

export const InputContainer = styled(YStack, {
  paddingVertical: 12,
  paddingHorizontal: 12,
  paddingBottom: 6,
  maxWidth: 960,
  justifyContent: 'flex-end',
});

const LoaderWrapper = styled(YStack, {
  width: '100%',
  height: 42,
  justifyContent: 'center',
  alignItems: 'center',
});
