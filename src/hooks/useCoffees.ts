import {useState} from 'react';
import {Coffee, CoffeeInput} from '../types/coffee';

export const useCoffees = () => {
  // Lista de cafés guardada em memória enquanto o app está aberto
  const [coffees, setCoffees] = useState<Coffee[]>([]);

  // CREATE – adiciona um novo café no topo da lista
  function add(input: CoffeeInput) {
    const newCoffee: Coffee = {
      id: Date.now().toString(), // usa o timestamp como id único
      ...input,                  // copia brand, type, intensity e quantity
    };
    setCoffees(prev => [newCoffee, ...prev]);
  }

  // UPDATE – substitui os dados de um café pelo id
  function edit(id: string, input: CoffeeInput) {
      // O map passa por todos os cafés do array. Isso é necessário porque você não sabe a posição do item — só tem o id.
      // No React, o estado deve ser imutável. Ou seja:  Não pode modificar o array original --> Precisa criar um novo array
      // Dentro do map: se encontrar o café com o id certo → atualiza / Se não → mantém igual
    setCoffees(prev =>
      prev.map(coffee => {
        if (coffee.id === id) {
          return {...coffee, ...input}; // mantém o id, atualiza o restante
        }
        return coffee;                 // os outros ficam inalterados
      }),
    );
  }

  // DELETE – remove o café com o id informado
  function remove(id: string) {
    setCoffees(prev => prev.filter(coffee => coffee.id !== id));
  }

  return {coffees, add, edit, remove};
};
