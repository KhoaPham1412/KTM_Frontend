interface QuantityControlProps {
  value: number
  onChange: (quantity: number) => void
  label: string
}

function QuantityControl({ value, onChange, label }: QuantityControlProps) {
  return <div className="quantity-control" aria-label={label}><button type="button" aria-label="Giảm số lượng" onClick={() => onChange(value - 1)}>−</button><span>{value}</span><button type="button" aria-label="Tăng số lượng" onClick={() => onChange(value + 1)}>+</button></div>
}

export default QuantityControl
