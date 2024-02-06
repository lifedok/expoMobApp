import { IListItem } from '~/app/screens/(drawer)/(tabs)/home/mock';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';
import { TrendingResult } from "~/app/types/interfaces/apiresults";

export type TUserData = {
  user: TUser | null;
  userLoginData: TUser | null;
  userLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  homeList: IListItem[];
  favorites: IListItem[];
  theme: 'light' | 'dark';
  trendingMovie: TrendingResult;
};

export type TUser = {
  id: number;
};

export type TUserLoginData = {
  userName: string;
  email: string;
};
