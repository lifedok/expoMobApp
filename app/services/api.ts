import { TrendingResult } from '~/app/types/interfaces/apiresults.interface';

const API_KEY = process.env.EXPO_PUBLIC_KEY;

export const getTrending = async (page: number = 1): Promise<TrendingResult> => {
  const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`);
  const json = await response.json();

  return json;
};
