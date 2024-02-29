import { ImageSourcePropType } from 'react-native';

import { IMAGES } from '~/app/contsts/images';
import { ResultItem } from '~/app/types/interfaces/apiresults.interface';

export const getMovieName = (item?: ResultItem): string | undefined => {
  return item?.original_name || item?.title || item?.name;
};

type Link = string;
const IMAGE_PATH: Link = 'https://image.tmdb.org/t/p/w';

const getPath = (img: string, width: number): string => {
  return `${IMAGE_PATH}${width}${img}`;
};

export const getImagePath = ({
  path,
  width,
  image,
}: {
  path?: string;
  width?: number;
  image?: 'poster' | 'bg';
}): ImageSourcePropType => {
  const img = image === 'poster' ? IMAGES.noPoster : IMAGES.noBackdrop;
  return path ? { uri: getPath(path, width ?? 400) } : img;
};

type MovieReleaseDateType = {
  releaseDate?: string;
  firstAirDate?: string;
};
export const getMovieReleaseDate = ({
  releaseDate,
  firstAirDate,
}: MovieReleaseDateType): string => {
  return releaseDate
    ? `Release date: ${releaseDate}`
    : firstAirDate
      ? `The first broadcast: ${firstAirDate}`
      : 'The information was not provided';
};
