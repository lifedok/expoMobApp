import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { YStack, styled, Spinner, Input } from 'tamagui';

import { useAppDispatch } from '~/app/hooks';
import useDebounce from '~/app/hooks/useDebounce';
import { MovieList } from '~/app/pages/movies-page/movie-list';
import { getImagePath, getMovieName } from '~/app/pages/shared/helpers';
import { getSearchResults } from '~/app/services/api';
import { fetchTrendingMovies } from '~/app/store/reducer/data/data-actions.thunk';
import { useGetDataSelector } from '~/app/store/selectors';

export default function MoviesPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { movieList, isLoadingTrendingMovies } = useGetDataSelector();
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedString = useDebounce(searchValue, 300);
  const searchQuery = useQuery({
    queryKey: ['search', debouncedString],
    queryFn: () => getSearchResults(debouncedString),
    enabled: debouncedString.length > 0,
  });

  useEffect(() => {
    dispatch(fetchTrendingMovies({ page: currentPage }));
  }, [currentPage]);

  const loadMorePage = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderItem = (props: any) => {
    const { item } = props;
    return (
      <View style={styles.itemWrapperStyle}>
        <Image
          style={styles.itemImageStyle}
          source={getImagePath({
            path: item.poster_path,
            image: 'poster',
            width: 200,
          })}
        />
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}>{`${getMovieName(item)}`}</Text>
          {/*<Text style={styles.txtEmailStyle}>{item.email}</Text>*/}
        </View>
      </View>
    );
  };

  const renderLoader = () => {
    return (
      <View style={{ width: '100%', height: 42 }}>
        {isLoadingTrendingMovies ? (
          <View style={LoaderWithInfoStyles.content}>
            <ActivityIndicator animating size="large" color="#5868F9" style={{ marginTop: 20 }} />
            <Text style={{ marginTop: 12, color: '#5868F9' }}>Loading...</Text>
          </View>
        ) : null}
      </View>
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

      <FlatList
        data={movieList}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={renderLoader}
        onEndReached={loadMorePage}
        onEndReachedThreshold={0}
      />

      {/*{isLoadingTrendingMovies || searchQuery.isLoading ? (*/}
      {/*  <Spinner py={14} size="large" color="$blue10" width="100%" />*/}
      {/*) : (*/}
      {/*  <MovieList list={searchQuery.data ? searchQuery.data : trendingMovies} />*/}
      {/*)}*/}
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

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: 'space-around',
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: '#777',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

const LoaderWithInfoStyles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
