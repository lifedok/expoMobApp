import { createAsyncThunk } from "@reduxjs/toolkit";

import { ReducerNameEnum } from "~/app/types/enums/reducer-name.enum";
import { AppDispatch, State } from "~/app/types/state";
import { isLoadingTrendingMovies, loadTrendingMovies } from "~/app/store/reducer/data/data-slice";

const API_KEY = process.env.EXPO_PUBLIC_KEY;

export const fetchTrendingMovies = createAsyncThunk<void, { page: number }, {
  dispatch: AppDispatch,
  state: State,
}>(
  `${ReducerNameEnum.DATA}/fetchTrendingMovies`,
  async ({ page: page}, {dispatch}): Promise<void> => {
    try {
      dispatch(isLoadingTrendingMovies(true));
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`
      );
      const data = await response.json();

      if(data) {
        dispatch(loadTrendingMovies(data));
        dispatch(isLoadingTrendingMovies(false));
      }

    } catch (error) {
      console.log("error", error);
    }
  });
