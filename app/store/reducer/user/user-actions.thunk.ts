import { createAsyncThunk } from '@reduxjs/toolkit';

import { ReducerNameEnum } from '~/app/types/enums/reducer-name.enum';
const API_KEY = process.env.EXPO_PUBLIC_KEY;
export const fetchUser = createAsyncThunk<void, {page: number}>(
  `${ReducerNameEnum.USER}/fetchUser`,
  async ({page: page}): Promise<void> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}&page=${page}`
  );

  console.log('response', response);
  const data = await response.json();
  return data;
});
