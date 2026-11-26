// [THÊM MỚI TOÀN BỘ FILE] Trang Đăng nhập (Khách hàng / Admin) & Đăng ký thành viên
import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type TabMode = "customer-login" | "customer-register" | "admin-login";

export default function LoginPage() {
  // Lấy các hàm xác thực từ AuthContext (bao gồm cả login Admin gốc và hàm mới cho Khách)
  const {
    isAdmin,
    isCustomerLoggedIn,
    login,
    loginCustomer,
    registerCustomer,
  } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<TabMode>("customer-login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // State form đăng nhập (dùng chung cho Khách & Admin)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State form đăng ký khách hàng
  const [fullName, setFullName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // [GIỮ NGUYÊN LOGIC GỐC] Nếu đã là Admin thì chuyển thẳng sang /admin
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // [THÊM MỚI] Nếu khách đã đăng nhập thì chuyển thẳng sang trang tài khoản /account
  if (isCustomerLoggedIn && tab !== "admin-login") {
    return <Navigate to="/account" replace />;
  }

  const switchTab = (nextTab: TabMode) => {
    setTab(nextTab);
    setError("");
    setShowPassword(false);
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Luồng đăng nhập Admin (giữ nguyên logic gốc của nhóm)
    if (tab === "admin-login") {
      const ok = login(username.trim(), password);
      if (ok) {
        navigate("/admin", { replace: true });
      } else {
        setError("Tên đăng nhập hoặc mật khẩu Admin chưa đúng.");
      }
      return;
    }

    // Luồng đăng nhập Khách hàng
    const res = loginCustomer(username, password);
    if (res.ok) {
      navigate("/account", { replace: true });
    } else {
      setError(res.message || "Đăng nhập thất bại.");
    }
  };

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = registerCustomer({
      name: fullName,
      username: regUsername,
      password: regPassword,
      phone,
      address,
    });

    if (res.ok) {
      navigate("/account", { replace: true });
    } else {
      setError(res.message || "Đăng ký không thành công.");
    }
  };

  return (
    <section className="section-pad">
      <div className="container-wide">
        <div
          className="mx-auto bg-white rounded-4 shadow-sm border p-4 p-md-5"
          style={{ maxWidth: 480, borderColor: "#f1dfd8" }}
        >
          <p
            className="text-uppercase fw-bold small mb-1"
            style={{ color: "var(--sh-red, #b91c1c)", letterSpacing: "0.08em" }}
          >
            SEOUL BITE ACCOUNT
          </p>
          <h1 className="h3 fw-bold mb-2">
            {tab === "customer-register"
              ? "Đăng ký thành viên"
              : tab === "admin-login"
                ? "Đăng nhập Quản trị"
                : "Đăng nhập Khách hàng"}
          </h1>
          <p className="text-secondary small mb-4">
            {tab === "admin-login"
              ? "Dành cho quản lý thực đơn và hệ thống SEOUL BITE."
              : "Quản lý thông tin giao hàng và theo dõi các món ăn Hàn Quốc bạn đã đặt."}
          </p>

          {/* Thanh chuyển đổi 3 chế độ */}
          <div className="d-flex gap-2 mb-4 flex-wrap">
            <button
              type="button"
              onClick={() => switchTab("customer-login")}
              className={`btn btn-sm rounded-pill px-3 ${
                tab === "customer-login" ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              Đăng nhập khách
            </button>
            <button
              type="button"
              onClick={() => switchTab("customer-register")}
              className={`btn btn-sm rounded-pill px-3 ${
                tab === "customer-register"
                  ? "btn-dark"
                  : "btn-outline-secondary"
              }`}
            >
              Đăng ký
            </button>
            <button
              type="button"
              onClick={() => switchTab("admin-login")}
              className={`btn btn-sm rounded-pill px-3 ${
                tab === "admin-login" ? "btn-dark" : "btn-outline-secondary"
              }`}
            >
              Admin
            </button>
          </div>

          {error && (
            <div
              className="alert alert-danger py-2 px-3 small mb-3"
              role="alert"
            >
              {error}
            </div>
          )}

          {tab === "customer-register" ? (
            <form onSubmit={handleRegisterSubmit} className="d-grid gap-3">
              <div>
                <label className="form-label fw-semibold small">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: Nguyễn Minh Anh"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label fw-semibold small">
                  Tên đăng nhập *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: minhanh123"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label fw-semibold small">
                  Mật khẩu *
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Ít nhất 3 ký tự"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>

              <div>
                <label className="form-label fw-semibold small">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="09xx xxx xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label fw-semibold small">
                  Địa chỉ giao hàng
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Số nhà, đường, quận/huyện..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn w-100 py-2 fw-semibold text-white rounded-3 mt-1"
                style={{ backgroundColor: "var(--sh-red, #b91c1c)" }}
              >
                Tạo tài khoản
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} className="d-grid gap-3">
              <div>
                <label className="form-label fw-semibold small">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={tab === "admin-login" ? "admin" : "khachhang"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label fw-semibold small">Mật khẩu</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn w-100 py-2 fw-semibold text-white rounded-3 mt-1"
                style={{ backgroundColor: "var(--sh-red, #b91c1c)" }}
              >
                Đăng nhập
              </button>
            </form>
          )}

          {/* Ghi chú tài khoản demo để dễ test */}
          <div className="mt-4 pt-3 border-top small text-secondary">
            {tab === "admin-login" ? (
              <div>
                Tài khoản demo Admin: <code>admin</code> /{" "}
                <code>seoulbite123</code>
              </div>
            ) : (
              <div>
                Tài khoản demo Khách: <code>khachhang</code> / <code>123</code>
              </div>
            )}
          </div>

          <div className="mt-3">
            <Link
              to="/"
              className="small text-decoration-none"
              style={{ color: "var(--sh-red, #b91c1c)" }}
            >
              ← Quay lại cửa hàng
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
