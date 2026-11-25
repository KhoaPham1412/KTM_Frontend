export type ProductCategory =
  | 'tteokbokki'
  | 'kimbap'
  | 'chicken'
  | 'noodles'
  | 'rice'
  | 'snack'
  | 'drinks'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: ProductCategory
  rating: number
  featured?: boolean
  spicyLevel?: 0 | 1 | 2 | 3
}
