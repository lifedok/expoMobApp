import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  isLoadingTrendingMovies,
  loadMovieList,
  loadTrendingMovies,
} from '~/app/store/reducer/data/data-slice';
import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';
import { ResultItem, TrendingResult } from '~/app/types/interfaces/apiresults.interface';
import { AppDispatch, State } from '~/app/types/state';

const API_KEY = process.env.EXPO_PUBLIC_KEY;

export const fetchTrendingMovies = createAsyncThunk<
  void,
  { page: number },
  {
    dispatch: AppDispatch;
    state: State;
  }
>(`${ReducerNameEnum.DATA}/fetchTrendingMovies`, async ({ page }, { dispatch }): Promise<void> => {
  try {
    dispatch(isLoadingTrendingMovies(true));
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`
    );
    const data: Promise<TrendingResult> = await response.json();

    if (data && (await data).results) {
      dispatch(loadTrendingMovies(data));
      const results = (await data).results;
      dispatch(loadMovieList(results));
    }
  } catch (error) {
    console.log('error', error);
    throw error;
  } finally {
    dispatch(isLoadingTrendingMovies(false));
  }
});

export const fetchSearchResults = createAsyncThunk<
  ResultItem[] | undefined,
  { query: string },
  {
    dispatch: AppDispatch;
    state: State;
  }
>(
  `${ReducerNameEnum.DATA}/searchMovies`,
  async ({ query }, { dispatch }): Promise<ResultItem[] | undefined> => {
    try {
      dispatch(isLoadingTrendingMovies(true));
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );

      const data = await response.json();
      console.log('fetchSearchResults data', data);
      return data;
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(isLoadingTrendingMovies(false));
    }
  }
);
