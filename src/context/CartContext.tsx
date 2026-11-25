import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem } from '../types/CartItem'
import { CartManager } from '../utils/CartManager'
import { CartContext, type CartContextValue } from './cartContextState'

const getSavedItems = (): CartItem[] => {
  try {
    const savedItems = localStorage.getItem('seoul-bite-cart')
    return savedItems ? JSON.parse(savedItems) as CartItem[] : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getSavedItems)

  useEffect(() => {
    localStorage.setItem('seoul-bite-cart', JSON.stringify(items))
  }, [items])

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: new CartManager(items).getTotal(),
    addItem: (product, quantity = 1) => setItems((current) => new CartManager(current).addItem(product, quantity)),
    setQuantity: (id, quantity) => setItems((current) => new CartManager(current).setQuantity(id, quantity)),
    removeItem: (id) => setItems((current) => new CartManager(current).removeItem(id)),
    clearCart: () => setItems([]),
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
