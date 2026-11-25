import type { PaymentMethod } from './Order'

export interface CheckoutForm {
  fullName: string
  phone: string
  address: string
  note: string
  paymentMethod: PaymentMethod
}
