import { createAsyncThunk } from '@reduxjs/toolkit';

import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';
const API_KEY = process.env.EXPO_PUBLIC_KEY;
const page = 1;
export const fetchUser = createAsyncThunk(
  `${ReducerNameEnum.USER}/fetchUser`,
  async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`
  );

  const data = await response.json();
  return data;
});
