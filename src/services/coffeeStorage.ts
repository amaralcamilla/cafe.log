import AsyncStorage from '@react-native-async-storage/async-storage';
import {Coffee} from '../types/coffee';

const STORAGE_KEY = '@cafelog:coffees';

export const coffeeStorage = {
  async load(): Promise<Coffee[]> {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  },

  async save(coffees: Coffee[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(coffees));
  },
};
