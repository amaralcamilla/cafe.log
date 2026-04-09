export type CoffeeType =
  | 'Espresso'
  | 'Cappuccino'
  | 'Latte'
  | 'Americano'
  | 'Cold Brew'
  | 'Macchiato'

export type Intensity = 1 | 2 | 3 | 4 | 5

export interface Coffee {
  id: string
  brand: string
  type: CoffeeType
  intensity: Intensity
  quantity: number
}

export type CoffeeInput = Omit<Coffee, 'id'>
