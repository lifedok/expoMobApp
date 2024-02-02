import { IListItem } from '~/app/screens/(drawer)/(tabs)/home/mock';
import { AuthorizationStatus } from '~/app/types/enums/route.enum';

export type TUserData = {
  user: TUser | null;
  userLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  homeList: IListItem[];
  favorites: IListItem[];
};

export type TUser = {
  id: number;
};
