import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

function ProductImage({ src, alt, className = '', eager = false }: ProductImageProps) {
  const [hasError, setHasError] = useState(false)
  if (hasError) return <div className={`product-image-fallback ${className}`} role="img" aria-label={alt}>SEOUL BITE</div>
  return <img className={className} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setHasError(true)} />
}

export default ProductImage
