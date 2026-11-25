import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import LoadingState from '../components/common/LoadingState'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'
import useProducts from '../hooks/useProducts'
import { categories, categoryName } from '../data/categories'
import { useCart } from '../context/useCart'

function MenuPage() {
  const { products, loading, error, retry } = useProducts()
  const { addItem } = useCart()
  const [params] = useSearchParams()
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState(params.get('category') ?? 'all')
  const [sort, setSort] = useState('popular')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => { searchRef.current?.focus() }, [])

  const filteredProducts = useMemo(() => products
    .filter((product) => `${product.name} ${categoryName(product.category)}`.toLocaleLowerCase('vi').includes(keyword.trim().toLocaleLowerCase('vi')))
    .filter((product) => category === 'all' || product.category === category)
    .sort((first, second) => sort === 'low' ? first.price - second.price : sort === 'high' ? second.price - first.price : sort === 'name' ? first.name.localeCompare(second.name, 'vi') : Number(Boolean(second.featured)) - Number(Boolean(first.featured))), [products, keyword, category, sort])

  return <>
    <section className="page-hero"><div className="container-wide"><span className="eyebrow">Menu SEOUL BITE</span><h1 className="page-title">Món ngon gọi là mê</h1><p className="section-copy mb-0">Chọn món bạn thích, bếp Seoul Bite sẽ chuẩn bị nóng hổi.</p></div></section>
    <section className="section-pad pt-4"><div className="container-wide">
      <div className="menu-toolbar"><input ref={searchRef} className="form-control search-field" type="search" aria-label="Tìm món ăn" placeholder="Tìm tteokbokki, gà, kimbap..." value={keyword} onChange={(event) => setKeyword(event.target.value)} /><select className="form-select" aria-label="Lọc theo danh mục" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">Tất cả danh mục</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><select className="form-select" aria-label="Sắp xếp món ăn" value={sort} onChange={(event) => setSort(event.target.value)}><option value="popular">Phổ biến nhất</option><option value="low">Giá thấp → cao</option><option value="high">Giá cao → thấp</option><option value="name">Tên A → Z</option></select></div>
      {loading ? <LoadingState /> : error ? <ErrorMessage message={error} onRetry={() => void retry()} /> : filteredProducts.length ? <><p className="small text-secondary mb-3 text-sm">Tìm thấy <strong>{filteredProducts.length}</strong> món phù hợp</p><ProductGrid products={filteredProducts} onAddToCart={addItem} /></> : <EmptyState title="Chưa tìm thấy món phù hợp" message="Thử đổi từ khóa hoặc danh mục nhé." />}
    </div></section>
  </>
}

export default MenuPage
