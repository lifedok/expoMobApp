import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGIN_USER_NAME_KEY = 'login-user-name';

export type LoginUserName = string;

export const saveLoginUserName = async (token: LoginUserName): Promise<void> => {
  try {
    await AsyncStorage.setItem(LOGIN_USER_NAME_KEY, token);
  } catch (e) {
    console.log('saveLoginUserName => error', e);
  }
};

export const getLoginUserName = async (): Promise<LoginUserName> => {
  try {
    const token = await AsyncStorage.getItem(LOGIN_USER_NAME_KEY);
    return token ?? '';
  } catch (e) {
    console.log('getLoginUserName => error', e);
  }
};

export const removeLoginUserName = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LOGIN_USER_NAME_KEY);
  } catch (e) {
    console.log('removeToken => error', e);
  }
  console.log('Done.');
};
