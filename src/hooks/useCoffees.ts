import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Coffee, CoffeeInput} from '../types/coffee';
import {coffeeService} from '../services/coffeeService';

const STORAGE_KEY = '@cafelog:coffees';

export function useCoffees() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(json => {
      if (json) {
        setCoffees(JSON.parse(json));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(coffees));
  }, [coffees]);

  function add(input: CoffeeInput) {
    setCoffees(prev => [coffeeService.create(input), ...prev]);
  }

  function edit(id: string, input: CoffeeInput) {
    setCoffees(prev =>
      prev.map(cafe => (cafe.id === id ? coffeeService.update(cafe, input) : cafe)),
    );
  }

  function remove(id: string) {
    setCoffees(prev => coffeeService.remove(prev, id));
  }

  return {coffees, add, edit, remove};
}
