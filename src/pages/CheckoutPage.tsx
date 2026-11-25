import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState'
import { useCart } from '../context/useCart'
import type { CheckoutForm } from '../types/CheckoutForm'
import type { Order } from '../types/Order'
import { formatPrice } from '../utils/formatPrice'

const initialForm: CheckoutForm = { fullName: '', phone: '', address: '', note: '', paymentMethod: 'cod' }

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const nameRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<CheckoutForm>(initialForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const deliveryFee = subtotal >= 199000 ? 0 : 15000

  useEffect(() => { nameRef.current?.focus() }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const phonePattern = /^(0|\+84)\d{9,10}$/
    if (!form.fullName.trim() || !phonePattern.test(form.phone.replaceAll(' ', '')) || !form.address.trim()) {
      setError('Vui lòng nhập họ tên, số điện thoại hợp lệ và địa chỉ giao hàng.')
      return
    }
    const order: Order = { id: `ORD${Date.now().toString().slice(-6)}`, items, subtotal, deliveryFee, total: subtotal + deliveryFee, status: 'Chờ xác nhận', createdAt: new Date().toISOString(), customerName: form.fullName.trim(), phone: form.phone, address: form.address.trim(), note: form.note.trim(), paymentMethod: form.paymentMethod }
    try {
      const savedOrders = JSON.parse(localStorage.getItem('seoul-bite-orders') ?? '[]') as Order[]
      localStorage.setItem('seoul-bite-orders', JSON.stringify([order, ...savedOrders]))
      clearCart()
      setError('')
      setSuccess(true)
      window.setTimeout(() => navigate('/orders'), 1300)
    } catch {
      setError('Chưa lưu được đơn hàng. Vui lòng thử lại.')
    }
  }

  if (items.length === 0 && !success) return <section className="section-pad"><div className="container-wide"><EmptyState title="Bạn chưa có món trong giỏ" message="Chọn món trước khi thanh toán nhé." /></div></section>

  return <><section className="page-hero"><div className="container-wide"><span className="eyebrow">Chỉ còn một bước</span><h1 className="page-title">Thông tin giao hàng</h1><p className="section-copy mb-0">Bếp sẽ bắt đầu chuẩn bị ngay sau khi bạn đặt món.</p></div></section><section className="section-pad"><div className="container-wide">{success && <div className="alert alert-success" role="status"><strong>Đặt hàng thành công!</strong> Seoul Bite đang xác nhận đơn của bạn.</div>}<div className="row g-4"><div className="col-lg-7"><form className="form-card" onSubmit={handleSubmit}>
    <h2 className="h5 fw-bold mb-4">Thông tin người nhận</h2><div className="mb-3"><label className="form-label" htmlFor="full-name">Họ và tên</label><input ref={nameRef} className="form-control" id="full-name" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required /></div><div className="mb-3"><label className="form-label" htmlFor="phone">Số điện thoại</label><input className="form-control" id="phone" type="tel" placeholder="09xxxxxxxx" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required /></div><div className="mb-3"><label className="form-label" htmlFor="address">Địa chỉ giao hàng</label><input className="form-control" id="address" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} required /></div><div className="mb-3"><label className="form-label" htmlFor="note">Ghi chú cho quán <span className="text-secondary fw-normal">(không bắt buộc)</span></label><textarea className="form-control" id="note" rows={2} value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} /></div><fieldset className="mb-4"><legend className="form-label">Phương thức thanh toán</legend><div className="d-grid gap-2">{[['cod','Thanh toán khi nhận hàng'],['wallet','Ví điện tử'],['card','Thẻ ngân hàng']].map(([value,label]) => <label className="form-check border rounded-3 p-3 ps-5" key={value}><input className="form-check-input" type="radio" name="payment" value={value} checked={form.paymentMethod === value} onChange={(event) => setForm({ ...form, paymentMethod: event.target.value as CheckoutForm['paymentMethod'] })} />{label}</label>)}</div></fieldset>{error && <p className="text-danger" role="alert">{error}</p>}<button className="btn btn-brand btn-lg w-100" type="submit">Xác nhận đặt hàng</button></form></div><div className="col-lg-5"><aside className="summary-card"><h2 className="h5 fw-bold mb-4">Đơn hàng của bạn</h2>{items.map((item) => <div className="summary-line" key={item.id}><span>{item.name} × {item.quantity}</span><span>{formatPrice(item.price * item.quantity)}</span></div>)}<div className="summary-line"><span>Tạm tính</span><span>{formatPrice(subtotal)}</span></div><div className="summary-line"><span>Phí giao hàng</span><span>{deliveryFee ? formatPrice(deliveryFee) : 'Miễn phí'}</span></div><div className="summary-line summary-total"><span>Tổng cộng</span><span>{formatPrice(subtotal + deliveryFee)}</span></div><Link className="small text-brand" to="/cart">Chỉnh sửa giỏ hàng</Link></aside></div></div></div></section></>
}

export default CheckoutPage
