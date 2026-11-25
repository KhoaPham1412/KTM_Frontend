import { Link } from 'react-router-dom'
import type { Product } from '../../types/Product'
import { categoryName } from '../../data/categories'
import { formatPrice } from '../../utils/formatPrice'
import ProductImage from '../common/ProductImage'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return <article className="card product-card">
    <Link className="product-image-link" to={`/menu/${product.id}`} aria-label={`Xem ${product.name}`}>
      <ProductImage className="product-image" src={product.image} alt={product.name} />
      {product.featured && <span className="product-badge">Bán chạy</span>}
    </Link>
    <div className="product-info">
      <div className="product-meta"><span>{categoryName(product.category)}</span><span><b className="stars">★</b> {product.rating.toFixed(1)}</span></div>
      <Link className="product-name" to={`/menu/${product.id}`}>{product.name}</Link>
      <p className="product-description">{product.description}</p>
      <div className="product-bottom"><span className="product-price">{formatPrice(product.price)}</span><button type="button" className="add-button" onClick={() => onAddToCart(product)} aria-label={`Thêm ${product.name} vào giỏ`}>+</button></div>
    </div>
  </article>
}

export default ProductCard
