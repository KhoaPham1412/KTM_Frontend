import type { ProductCategory } from '../types/Product'

export interface CategoryInfo {
  id: ProductCategory
  name: string
  icon: string
}

export const categories: CategoryInfo[] = [
  { id: 'tteokbokki', name: 'Tteokbokki', icon: '🍢' },
  { id: 'kimbap', name: 'Kimbap', icon: '🍙' },
  { id: 'chicken', name: 'Gà Hàn Quốc', icon: '🍗' },
  { id: 'noodles', name: 'Mì Hàn Quốc', icon: '🍜' },
  { id: 'rice', name: 'Cơm Hàn Quốc', icon: '🍚' },
  { id: 'snack', name: 'Ăn vặt', icon: '🥟' },
  { id: 'drinks', name: 'Nước uống', icon: '🥛' },
]

export const categoryName = (id: ProductCategory): string =>
  categories.find((category) => category.id === id)?.name ?? 'Món Hàn'
