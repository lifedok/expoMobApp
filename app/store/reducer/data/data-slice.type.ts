import { IListItem } from '~/app/screens/(drawer)/(tabs)/home/mock';
import { MediaEnum } from '~/app/types/enums/media.enum';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';
import { TrendingResult } from '~/app/types/interfaces/apiresults.interface';

export type DataSliceType = {
  trendingMovie: TrendingResult;
  favorites: IListItem[];
  isDataLoading: boolean;
};

export type TUser = {
  id: number;
};

export type DataType = {
  user: TUser | null;
  userLoginData: TUser | null;
  userLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  homeList: IListItem[];
  favorites: IListItem[];
  theme: 'light' | 'dark';
  trendingMovie: TrendingResult;
};

export type FavoriteType = {
  id: string;
  mediaType: MediaEnum;
  name: string;
  thumb: string;
};
