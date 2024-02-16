import { MediaType, TrendingResult } from '~/app/types/interfaces/apiresults.interface';
const API_KEY = process.env.EXPO_PUBLIC_KEY;

export const getSearchResults = async (query: string): Promise<TrendingResult> => {
  console.log('SEARCH: ', query);

  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?language=en-US&api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  if (!response.ok) throw new Error('Failed to fetch getSearchResults');

  return await response.json();
};

export const getMovieDetails = async (id: number, type: MediaType): Promise<any> => {

  const response = await fetch(
    `https://api.themoviedb.org/3/${type ?? MediaType.Movie}/${id}?api_key=${API_KEY}`
  );

  if (!response.ok) throw new Error('Failed to fetch getMovieDetails');

  return await response.json();
};
