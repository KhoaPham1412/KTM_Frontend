import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../components/common/ErrorMessage'
import LoadingState from '../components/common/LoadingState'
import ProductImage from '../components/common/ProductImage'
import QuantityControl from '../components/common/QuantityControl'
import { categoryName } from '../data/categories'
import { useCart } from '../context/useCart'
import { getProductById } from '../services/productService'
import type { Product } from '../types/Product'
import { formatPrice } from '../utils/formatPrice'

function ProductDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    let active = true
    const loadProduct = async (): Promise<void> => {
      setLoading(true)
      setError('')
      try {
        const data = await getProductById(id)
        if (active) setProduct(data)
      } catch {
        if (active) setError('Không tìm thấy món ăn hoặc máy chủ API chưa chạy.')
      } finally {
        if (active) setLoading(false)
      }
    }
    void loadProduct()
    return () => { active = false }
  }, [id])

  if (loading) return <section className="section-pad"><div className="container-wide"><LoadingState /></div></section>
  if (error || !product) return <section className="section-pad"><div className="container-wide"><ErrorMessage message={error || 'Món ăn không tồn tại.'} onRetry={() => navigate('/menu')} /></div></section>

  return <section className="section-pad"><div className="container-wide">
    <Link className="btn btn-outline-brand mb-4" to="/menu">← Quay lại thực đơn</Link>
    <div className="detail-grid"><ProductImage className="detail-image" src={product.image} alt={product.name} /><div><span className="eyebrow">{categoryName(product.category)}</span><h1 className="page-title mt-2">{product.name}</h1><div className="product-meta justify-content-start gap-3"><span><b className="stars">★</b> {product.rating.toFixed(1)} / 5</span><span>•</span><span>{product.spicyLevel ? `Cay cấp ${product.spicyLevel}/3` : 'Không cay'}</span></div><p className="section-copy mt-4" style={{ lineHeight: 1.8 }}>{product.description}</p><div className="detail-price">{formatPrice(product.price)}</div><div className="d-flex align-items-center flex-wrap gap-3"><QuantityControl value={quantity} onChange={(next) => setQuantity(Math.max(1, next))} label="Số lượng món" /><button className="btn btn-brand btn-lg px-4" type="button" onClick={() => { addItem(product, quantity); navigate('/cart') }}>Thêm vào giỏ hàng</button></div><p className="small text-secondary mt-3 mb-0">Nấu nóng sau khi bạn đặt món.</p></div></div>
  </div></section>
}

export default ProductDetailPage
