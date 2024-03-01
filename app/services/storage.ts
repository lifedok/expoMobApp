import AsyncStorage from '@react-native-async-storage/async-storage';

interface IStorageItem {
  key: string;
  value: string;
}

export const setStorageItem = async ({ key, value }: IStorageItem): Promise<void> => {
  try {
    const jsonValue: string = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('setStorageItem => error', e);
  }
};

export const getStorageItem = async ({
  key,
}: Pick<IStorageItem, 'key'>): Promise<string | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('getStorageItem => error', e);
  }
};
