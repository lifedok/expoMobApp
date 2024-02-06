import { TrendingResult } from '~/app/types/interfaces/apiresults';

export const getTrending = async (): Promise<TrendingResult> => {
  const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`);
  const json = await response.json();

  return json;
};
