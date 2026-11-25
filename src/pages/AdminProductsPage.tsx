import { useEffect, useState } from 'react'
import ProductForm from '../components/product/ProductForm'
import ProductImage from '../components/common/ProductImage'
import LoadingState from '../components/common/LoadingState'
import { deleteProduct, getProducts } from '../services/productService'
import type { Product } from '../types/Product'
import { formatPrice } from '../utils/formatPrice'

function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadProducts = async (): Promise<void> => {
    try { setProducts(await getProducts()); setError('') }
    catch { setError('Không tải được danh sách. Khởi động API bằng npm run api rồi thử lại.') }
    finally { setLoading(false) }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadProducts() }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  const handleDelete = async (product: Product): Promise<void> => {
    if (!window.confirm(`Bạn muốn xóa món “${product.name}” khỏi menu?`)) return
    try {
      await deleteProduct(product.id)
      setProducts((current) => current.filter((item) => item.id !== product.id))
      setMessage(`Đã xóa ${product.name}.`)
      setError('')
    } catch {
      setError('Không xóa được món. Hãy kiểm tra API có đang chạy không.')
    }
  }

  return <><div className="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-4"><div><span className="eyebrow">ADMIN · MENU</span><h1 className="section-title mt-2 mb-1">Quản lý thực đơn</h1><p className="section-copy mb-0">Thêm, chỉnh sửa hoặc xóa món ăn trong cửa hàng.</p><p className="small text-secondary mt-2 mb-0">Demo học tập: thao tác ghi cần bật <code>npm run api</code>. Đăng nhập này chỉ chặn giao diện, chưa xác thực an toàn ở máy chủ.</p></div><button className="btn btn-outline-brand" onClick={() => { setEditingProduct(null); setFormOpen(true); setMessage('') }}>+ Thêm món mới</button></div>
    {message && <div className="alert alert-success" role="status">{message}</div>}{error && <div className="alert alert-danger" role="alert">{error}</div>}
    {(editingProduct || formOpen) && <ProductForm key={editingProduct?.id ?? 'new-product'} editingProduct={editingProduct} onCancelEdit={() => { setEditingProduct(null); setFormOpen(false) }} onSaved={(product) => { setProducts((current) => editingProduct ? current.map((item) => item.id === product.id ? product : item) : [product, ...current]); setEditingProduct(null); setFormOpen(false); setMessage(editingProduct ? 'Đã cập nhật món ăn.' : 'Đã thêm món mới.'); setError('') }} />}
    {loading ? <LoadingState label="Đang tải thực đơn quản trị..." /> : <div className="admin-product-list">{products.map((product) => <article className="admin-product-row" key={product.id}><ProductImage className="admin-product-image" src={product.image} alt={product.name} /><div className="flex-grow-1"><strong>{product.name}</strong><div className="small text-secondary">{product.id} · {formatPrice(product.price)}</div></div><button className="btn btn-sm btn-outline-brand" onClick={() => { setFormOpen(false); setEditingProduct(product); setMessage('') }}>Sửa</button><button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => void handleDelete(product)}>Xóa</button></article>)}</div>}
  </>
}

export default AdminProductsPage
