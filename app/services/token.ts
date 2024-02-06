import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY_NAME = 'expo-mob-app';

export type Token = string;

export const saveToken = async (token: Token) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  } catch (e) {
    console.log('saveToken => error', e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY_NAME);
    return token ?? '';
  } catch (e) {
    console.log('getToken => error', e);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  } catch (e) {
    console.log('removeToken => error', e);
  }
  console.log('Done.');
};
