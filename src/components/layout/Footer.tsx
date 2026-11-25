import { Link } from 'react-router-dom'

function Footer() {
  return <footer className="site-footer"><div className="container-wide">
    <div className="footer-grid">
      <div><Link className="brand-mark" to="/"><span className="brand-symbol">S</span><span>SEOUL BITE</span></Link><p className="section-copy mt-3 mb-0" style={{ maxWidth: 280 }}>Một góc Seoul nhỏ trong thành phố của bạn. Món Hàn nóng hổi, nấu bằng cả sự chân thành.</p></div>
      <div><h2 className="footer-heading">Khám phá</h2><Link className="footer-link" to="/menu">Thực đơn</Link><Link className="footer-link" to="/about">Câu chuyện Seoul Bite</Link><Link className="footer-link" to="/orders">Đơn hàng của tôi</Link></div>
      <div><h2 className="footer-heading">Liên hệ</h2><a className="footer-link" href="tel:02873001234">028 7300 1234</a><a className="footer-link" href="mailto:hello@seoulbite.vn">hello@seoulbite.vn</a><span className="footer-link">12 Nguyễn Huệ, Quận 1, TP.HCM</span></div>
      <div><h2 className="footer-heading">Giờ mở cửa</h2><span className="footer-link">Mỗi ngày</span><span className="footer-link">10:00 – 22:00</span><span className="footer-link">Instagram · Facebook · TikTok</span></div>
    </div>
    <div className="footer-bottom"><span>© 2026 SEOUL BITE. Taste Korea, Feel Seoul.</span><span>Được nấu nóng mỗi ngày tại TP. Hồ Chí Minh.</span></div>
  </div></footer>
}

export default Footer
