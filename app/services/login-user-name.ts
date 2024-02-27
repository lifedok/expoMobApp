import AsyncStorage from '@react-native-async-storage/async-storage';

interface IStorageItem {
  key: string;
  value: string;
}

export const setStorageItem = async ({ key, value }: IStorageItem): Promise<void> => {
  try {
    console.log('setStorageItem ==> key, value', key, value);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('setStorageItem => error', e);
  }
};

export const getStorageItem = async ({
  key,
}: Pick<IStorageItem, 'key'>): Promise<string | undefined> => {
  try {
    const userName = await AsyncStorage.getItem(key);
    if (userName !== null) return userName;
  } catch (e) {
    console.log('getStorageItem => error', e);
  }
};

export const removeStorageItem = async ({ key }: Pick<IStorageItem, 'key'>): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('removeUserName => error', e);
  }
  console.log('Done.');
};

export const setStorageData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('setStorageData => error', e);
  }
};

export const getStorageData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('getStorageData => error', e);
  }
};

export const getAllKeys = async (): Promise<void> => {
  let keys: any;
  try {
    keys = await AsyncStorage.getAllKeys();
    console.log('keys', keys);
    return keys;
  } catch (e) {
    // read key error
  }
  console.log(keys);
};
