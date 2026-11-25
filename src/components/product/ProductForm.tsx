import { useRef, useState, type FormEvent } from 'react'
import { categories } from '../../data/categories'
import { createProduct, updateProduct } from '../../services/productService'
import type { Product, ProductCategory } from '../../types/Product'

interface ProductFormProps {
  onSaved: (product: Product) => void
  editingProduct?: Product | null
  onCancelEdit?: () => void
}

function ProductForm({ onSaved, editingProduct = null, onCancelEdit }: ProductFormProps) {
  const [open, setOpen] = useState(Boolean(editingProduct))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(editingProduct?.name ?? '')
  const [price, setPrice] = useState(editingProduct ? String(editingProduct.price) : '')
  const [description, setDescription] = useState(editingProduct?.description ?? '')
  const [category, setCategory] = useState<ProductCategory>(editingProduct?.category ?? 'tteokbokki')


  const showForm = (): void => {
    setOpen((isOpen) => !isOpen)
    window.setTimeout(() => nameRef.current?.focus(), 0)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setError('')
    if (!name.trim() || Number(price) < 1000 || !description.trim()) {
      setError('Vui lòng nhập tên, mô tả và giá món hợp lệ (từ 1.000đ).')
      return
    }
    setSaving(true)
    try {
      const productData = { name: name.trim(), price: Number(price), description: description.trim(), category, rating: editingProduct?.rating ?? 4.7, image: editingProduct?.image ?? 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?auto=format&fit=crop&w=900&q=85', featured: editingProduct?.featured, spicyLevel: editingProduct?.spicyLevel }
      const product = editingProduct ? await updateProduct(editingProduct.id, productData) : await createProduct(productData)
      onSaved(product)
      setName('')
      setPrice('')
      setDescription('')
      if (!editingProduct) setOpen(false)
    } catch {
      setError('Chưa kết nối được API để lưu món. Hãy mở terminal trong thư mục seoul-bite, chạy “npm run api”, rồi gửi lại.')
    } finally {
      setSaving(false)
    }
  }

  return <section className="mb-4">
    {!editingProduct && <button className="btn btn-outline-brand" type="button" onClick={showForm}>{open ? 'Đóng biểu mẫu' : '+ Thêm món mới'}</button>}
    {open && <form className="form-card mt-3" onSubmit={handleSubmit} noValidate>
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3"><div><span className="eyebrow">{editingProduct ? 'PUT API' : 'POST API'}</span><h2 className="h5 fw-bold mt-1 mb-0">{editingProduct ? `Sửa món: ${editingProduct.name}` : 'Thêm món vào thực đơn'}</h2><p className="small text-secondary mt-2 mb-0">Để lưu thay đổi, hãy chạy <code>npm run api</code> ở terminal thứ hai.</p></div><span className="small text-secondary">Dữ liệu gửi đến API demo.</span></div>
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label" htmlFor="product-name">Tên món</label><input ref={nameRef} id="product-name" className="form-control" value={name} onChange={(event) => setName(event.target.value)} required /></div>
        <div className="col-md-3"><label className="form-label" htmlFor="product-price">Giá (đ)</label><input id="product-price" className="form-control" type="number" min="1000" value={price} onChange={(event) => setPrice(event.target.value)} required /></div>
        <div className="col-md-3"><label className="form-label" htmlFor="product-category">Danh mục</label><select id="product-category" className="form-select" value={category} onChange={(event) => setCategory(event.target.value as ProductCategory)}>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
        <div className="col-12"><label className="form-label" htmlFor="product-description">Mô tả</label><textarea id="product-description" className="form-control" rows={2} value={description} onChange={(event) => setDescription(event.target.value)} required /></div>
        {error && <div className="col-12"><p className="text-danger mb-0" role="alert">{error}</p></div>}
        <div className="col-12 d-flex gap-2"><button className="btn btn-brand px-4" type="submit" disabled={saving}>{saving ? 'Đang lưu...' : editingProduct ? 'Lưu thay đổi' : 'Lưu món mới'}</button>{editingProduct && <button className="btn btn-outline-secondary rounded-pill px-4" type="button" onClick={onCancelEdit}>Hủy</button>}</div>
      </div>
    </form>}
  </section>
}

export default ProductForm
