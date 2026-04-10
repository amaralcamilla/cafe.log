export type CoffeeType =
  | 'Coado'
  | 'Espresso'
  | 'Cappuccino'
  | 'Latte'
  | 'Americano'
  | 'Cold Brew'
  | 'Macchiato'

export type Roast = 'Clara' | 'Média' | 'Escura'

export type Rating = 0 | 1 | 2 | 3 | 4 | 5

export interface Coffee {
  id: string
  brand: string
  type: CoffeeType
  rating: Rating
  roast: Roast
  comment: string
}

export type CoffeeInput = Omit<Coffee, 'id'>
