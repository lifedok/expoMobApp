import { ResultItem, TrendingResult } from '~/app/types/interfaces/apiresults.interface';

export type DataSliceType = {
  trendingMovies: TrendingResult;
  movieList: ResultItem[];
  isLoadingTrendingMovies: boolean;
  favorites: ResultItem[];
  isDataLoading: boolean;
};
