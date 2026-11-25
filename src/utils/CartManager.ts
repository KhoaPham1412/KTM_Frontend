import type { CartItem } from '../types/CartItem'
import type { Product } from '../types/Product'

export class CartManager {
  private items: CartItem[]

  constructor(items: CartItem[] = []) {
    this.items = [...items]
  }

  public addItem(product: Product, quantity = 1): CartItem[] {
    const existingItem = this.items.find((item) => item.id === product.id)
    this.items = existingItem
      ? this.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      : [...this.items, { ...product, quantity }]
    return this.getItems()
  }

  public setQuantity(id: string, quantity: number): CartItem[] {
    this.items = quantity < 1
      ? this.items.filter((item) => item.id !== id)
      : this.items.map((item) => item.id === id ? { ...item, quantity } : item)
    return this.getItems()
  }

  public removeItem(id: string): CartItem[] {
    this.items = this.items.filter((item) => item.id !== id)
    return this.getItems()
  }

  public getItems(): CartItem[] {
    return [...this.items]
  }

  public getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }
}
