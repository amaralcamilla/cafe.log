import {useState, useEffect} from 'react';
import {Coffee, CoffeeInput} from '../types/coffee';
import {coffeeService} from '../services/coffeeService';
import {coffeeStorage} from '../services/coffeeStorage';

export function useCoffees() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);

  useEffect(() => {
    coffeeStorage.load().then(setCoffees);
  }, []);

  useEffect(() => {
    coffeeStorage.save(coffees);
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
