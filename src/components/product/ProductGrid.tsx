import type { Product } from '../../types/Product'
import ProductCard from './ProductCard'

function ProductGrid({ products, onAddToCart }: { products: Product[]; onAddToCart: (product: Product) => void }) {
  return <div className="row g-3 g-lg-4">{products.map((product) => <div className="col-6 col-lg-3" key={product.id}><ProductCard product={product} onAddToCart={onAddToCart} /></div>)}</div>
}

export default ProductGrid
