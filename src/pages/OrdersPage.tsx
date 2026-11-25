import { useState } from 'react'
import EmptyState from '../components/common/EmptyState'
import type { Order } from '../types/Order'
import { formatPrice } from '../utils/formatPrice'

function OrdersPage() {
  const [orders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem('seoul-bite-orders') ?? '[]') as Order[] } catch { return [] }
  })

  return <><section className="page-hero"><div className="container-wide"><span className="eyebrow">Theo dõi vị ngon</span><h1 className="page-title">Đơn hàng của bạn</h1><p className="section-copy mb-0">Cảm ơn bạn đã chọn Seoul Bite cho bữa ăn hôm nay.</p></div></section><section className="section-pad"><div className="container-wide">{orders.length === 0 ? <EmptyState title="Bạn chưa có đơn hàng nào" message="Khám phá menu và chọn món Hàn bạn yêu thích." /> : <div className="d-grid gap-3">{orders.map((order) => <article className="order-card" key={order.id}><div className="d-flex align-items-start justify-content-between gap-3 flex-wrap"><div><span className="small text-secondary">Mã đơn</span><h2 className="h6 fw-bold mt-1">#{order.id}</h2></div><span className="order-status">{order.status}</span></div><div className="d-flex flex-wrap justify-content-between gap-2 small text-secondary"><span>{new Date(order.createdAt).toLocaleString('vi-VN')}</span><span>{order.items.reduce((count, item) => count + item.quantity, 0)} món</span><strong className="text-dark">{formatPrice(order.total)}</strong></div><div className="small text-secondary mt-3">Giao đến: {order.address}</div></article>)}</div>}</div></section></>
}

export default OrdersPage
