import axios from 'axios'
import type { Product } from '../types/Product'

const api = axios.create({ baseURL: 'http://localhost:3001' })

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products')
    return response.data
  } catch {
    // Allow the storefront to show its sample menu when json-server is not running.
    const response = await axios.get<{ products: Product[] }>('/db.json')
    return response.data.products
  }
}

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
  } catch {
    const response = await axios.get<{ products: Product[] }>('/db.json')
    const product = response.data.products.find((item) => item.id === id)
    if (!product) throw new Error('Không tìm thấy món ăn.')
    return product
  }
}

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await api.post<Product>('/products', {
    ...product,
    id: `mon-${Date.now()}`,
  })
  return response.data
}

export const updateProduct = async (id: string, product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, { ...product, id })
  return response.data
}

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`)
}
