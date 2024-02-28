import AsyncStorage from '@react-native-async-storage/async-storage';

interface IStorageItem {
  key: string;
  value: string;
}

export const setStorageItem = async ({ key, value }: IStorageItem): Promise<void> => {
  try {
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
