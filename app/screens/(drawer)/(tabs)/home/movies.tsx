import { YStack, styled } from 'tamagui';

import { MovieHeader } from './movies/movie-header/movie-header';
import { MovieList } from './movies/movie-list/movie-list';
import { useGetDataSelector } from "~/app/store/selectors";

export default function Movies() {
  const { trendingMovie } = useGetDataSelector();

  return (
    <Main flex={1}>
      <MovieHeader />
      <MovieList list={trendingMovie}/>
    </Main>
  );
}

const Main = styled(YStack, {
  name: 'Main',
  tag: 'main',
  flexDirection: 'column',
});
