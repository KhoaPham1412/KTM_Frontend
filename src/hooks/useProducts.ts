import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../services/productService'
import type { Product } from '../types/Product'

function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setProducts(await getProducts())
    } catch {
      setError('Không thể kết nối API món ăn. Hãy kiểm tra máy chủ demo rồi thử lại.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadProducts() }, 0)
    return () => window.clearTimeout(timer)
  }, [loadProducts])

  return { products, loading, error, retry: loadProducts }
}

export default useProducts
