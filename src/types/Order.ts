import type { CartItem } from './CartItem'

export type OrderStatus = 'Chờ xác nhận' | 'Đang chuẩn bị' | 'Đang giao' | 'Đã giao' | 'Đã hủy'
export type PaymentMethod = 'cod' | 'wallet' | 'card'

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  createdAt: string
  customerName: string
  phone: string
  address: string
  note?: string
  paymentMethod: PaymentMethod
}
