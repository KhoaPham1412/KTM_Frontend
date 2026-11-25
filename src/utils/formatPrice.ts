export const formatPrice = (price: number): string =>
  `${new Intl.NumberFormat('vi-VN').format(price)}đ`
