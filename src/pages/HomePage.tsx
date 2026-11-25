import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import { categories } from '../data/categories'
import { useCart } from '../context/useCart'
import ProductGrid from '../components/product/ProductGrid'
import LoadingState from '../components/common/LoadingState'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'
import ProductImage from '../components/common/ProductImage'

function HomePage() {
  const { products, loading, error, retry } = useProducts()
  const { addItem } = useCart()
  const featured = products.filter((product) => product.featured).slice(0, 4)

  return <>
    <section className="hero-section"><div className="container-wide hero-grid">
      <div className="hero-copy"><span className="eyebrow">Hương vị phố Seoul, ngay trong tầm tay</span><h1 className="hero-title">Đậm vị Hàn Quốc,<br /><span>ngon chuẩn Seoul.</span></h1><p className="hero-description">Món ăn đường phố xứ kim chi được nấu nóng mỗi ngày, giao đến bạn thật nhanh và trọn vị.</p><div className="hero-cta"><Link className="btn btn-brand btn-lg px-4" to="/menu">Khám phá thực đơn <span aria-hidden="true">→</span></Link><Link className="btn btn-outline-brand btn-lg px-4" to="/about">Câu chuyện của chúng tôi</Link></div><span className="hero-note"><b className="stars">★★★★★</b> Được yêu thích bởi các tín đồ món Hàn</span></div>
      <div className="hero-visual"><div className="hero-image-wrap"><ProductImage className="hero-image" src="https://images.unsplash.com/photo-1635363638580-c2809d049eee?auto=format&fit=crop&w=1200&q=90" alt="Món ăn Hàn Quốc nóng hổi với bánh gạo sốt cay" eager /></div><span className="hero-sticker">NẤU TƯƠI<br />MỖI NGÀY</span><span className="hero-rating"><b className="stars">★</b> 4.9 <span className="text-secondary">/ 5.0</span></span></div>
    </div></section>

    <section className="section-pad"><div className="container-wide"><div className="section-heading-row"><div><span className="eyebrow">Ăn gì hôm nay?</span><h2 className="section-title mt-2 mb-0">Khám phá theo khẩu vị</h2></div><Link className="btn btn-outline-brand" to="/menu">Xem tất cả món <span aria-hidden="true">→</span></Link></div>
      <div className="row g-3">{categories.map((category, index) => <div className="col-6 col-md-4 col-lg" key={category.id}><Link className="category-card" to={`/menu?category=${category.id}`}><span className="category-emoji" aria-hidden="true">{['떡','김','치','면','밥','간','음'][index]}</span><span><span className="category-title d-block">{category.name}</span><span className="category-count">Đậm chất Hàn</span></span></Link></div>)}</div>
    </div></section>

    <section className="section-pad pt-0"><div className="container-wide"><div className="section-heading-row"><div><span className="eyebrow">Seoul Bite chọn cho bạn</span><h2 className="section-title mt-2 mb-0">Món được gọi nhiều nhất</h2></div><Link className="btn btn-outline-brand" to="/menu">Xem thực đơn <span aria-hidden="true">→</span></Link></div>
      {loading ? <LoadingState /> : error ? <ErrorMessage message={error} onRetry={() => void retry()} /> : featured.length ? <ProductGrid products={featured} onAddToCart={addItem} /> : <EmptyState title="Menu đang được chuẩn bị" message="Bạn ghé lại sau một chút nhé." />}
    </div></section>

    <section className="benefit-section section-pad"><div className="container-wide"><div className="text-center mb-5"><span className="eyebrow" style={{ color: '#f7b58f' }}>Seoul Bite khác biệt</span><h2 className="section-title mt-2 mb-0">Ngon từ căn bếp, vui đến cửa nhà</h2></div><div className="row g-4">
      {[['01','Nguyên liệu tươi ngon','Chọn nguyên liệu mỗi ngày, chuẩn bị kỹ trước từng ca bếp.'],['02','Chuẩn vị Hàn Quốc','Sốt và gia vị đậm đà, cân bằng cay ngọt đúng gu Hàn.'],['03','Giao nhanh nóng hổi','Đóng gói giữ nhiệt để món ăn đến tay bạn vẫn thơm ngon.'],['04','An tâm từng phần ăn','Bếp sạch, quy trình rõ ràng, khẩu phần đầy đặn.']].map(([number,title,copy]) => <div className="col-6 col-lg-3" key={number}><div className="benefit-item"><span className="benefit-icon" aria-hidden="true">{number}</span><div><h3 className="benefit-title">{title}</h3><p className="benefit-copy">{copy}</p></div></div></div>)}
    </div></div></section>

    <section className="section-pad"><div className="container-wide"><div className="promo-banner"><div className="promo-content"><span className="eyebrow">Món ngon mở đầu tuần mới</span><h2>Giảm 20% cho đơn hàng đầu tiên</h2><p>Nhập mã <strong>SEOUL20</strong> khi đặt món trực tiếp trên website.</p></div><div className="promo-action"><Link className="btn btn-light btn-lg rounded-pill px-4 fw-bold" to="/menu">Đặt món ngay <span aria-hidden="true">→</span></Link></div></div></div></section>
  </>
}

export default HomePage
