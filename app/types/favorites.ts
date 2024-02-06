import { MediaEnum } from '~/app/types/enums/media.enum';

export type FavoriteType = {
  id: string;
  mediaType: MediaEnum;
  name: string;
  thumb: string;
};
