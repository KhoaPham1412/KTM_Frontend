import { Link } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState'
import ProductImage from '../components/common/ProductImage'
import QuantityControl from '../components/common/QuantityControl'
import { useCart } from '../context/useCart'
import { formatPrice } from '../utils/formatPrice'

function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart()
  const deliveryFee = subtotal >= 199000 || subtotal === 0 ? 0 : 15000

  return <><section className="page-hero"><div className="container-wide"><span className="eyebrow">Giỏ hàng SEOUL BITE</span><h1 className="page-title">Món ngon đã chọn</h1><p className="section-copy mb-0">{items.length} loại món đang chờ bạn.</p></div></section>
    <section className="section-pad"><div className="container-wide">{items.length === 0 ? <EmptyState title="Giỏ hàng đang trống" message="Tìm một món Hàn yêu thích để bắt đầu nhé." /> : <div className="row g-4"><div className="col-lg-8">{items.map((item) => <article className="cart-row" key={item.id}><Link to={`/menu/${item.id}`}><ProductImage className="cart-row-image" src={item.image} alt={item.name} /></Link><div><Link className="fw-bold" to={`/menu/${item.id}`}>{item.name}</Link><p className="small text-secondary mb-0 mt-1">{formatPrice(item.price)} / phần</p></div><span className="cart-unit-price text-secondary">{formatPrice(item.price)}</span><QuantityControl value={item.quantity} onChange={(quantity) => setQuantity(item.id, quantity)} label={`Số lượng ${item.name}`} /><div className="cart-subtotal text-end fw-bold">{formatPrice(item.price * item.quantity)}</div><button className="remove-item btn btn-sm btn-link text-secondary text-decoration-none" type="button" onClick={() => removeItem(item.id)} aria-label={`Xóa ${item.name}`}>Xóa</button></article>)}<Link className="btn btn-outline-brand mt-4" to="/menu">← Tiếp tục chọn món</Link></div>
      <div className="col-lg-4"><aside className="summary-card"><h2 className="h5 fw-bold mb-4">Tóm tắt đơn hàng</h2><div className="summary-line"><span>Tạm tính</span><span>{formatPrice(subtotal)}</span></div><div className="summary-line"><span>Phí giao hàng</span><span>{deliveryFee === 0 ? 'Miễn phí' : formatPrice(deliveryFee)}</span></div>{subtotal > 0 && subtotal < 199000 && <p className="small text-secondary">Thêm {formatPrice(199000 - subtotal)} để được miễn phí giao hàng.</p>}<div className="summary-line summary-total"><span>Tổng cộng</span><span>{formatPrice(subtotal + deliveryFee)}</span></div><Link className="btn btn-brand w-100 py-3 mt-3" to="/checkout">Tiến hành thanh toán</Link></aside></div></div>}</div></section>
  </>
}

export default CartPage
