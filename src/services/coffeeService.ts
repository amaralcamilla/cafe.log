import {Coffee, CoffeeInput} from '../types/coffee';

export const coffeeService = {
  create(input: CoffeeInput): Coffee {
    return {id: Date.now().toString(), ...input};
  },

  update(coffee: Coffee, input: CoffeeInput): Coffee {
    return {...coffee, ...input};
  },

  remove(coffees: Coffee[], id: string): Coffee[] {
    return coffees.filter(c => c.id !== id);
  },
};
