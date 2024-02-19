import { AuthorizationStatus } from '~/app/types/enums/route.enum';
import { ResultItem, TrendingResult } from '~/app/types/interfaces/apiresults.interface';

export type DataSliceType = {
  trendingMovies: TrendingResult;
  movieList: ResultItem[];
  isLoadingTrendingMovies: boolean;
  favorites: ResultItem[];
  isDataLoading: boolean;
};

export type TUser = {
  id: number;
};

export type UserType = {
  user: TUser | null;
  userLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  theme: 'light' | 'dark';
};
