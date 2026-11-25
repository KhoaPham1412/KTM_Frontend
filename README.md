# SEOUL BITE

Website bán đồ ăn Hàn Quốc được xây dựng cho đồ án cuối kỳ môn Lập trình Front-end. Giao diện giới thiệu thực đơn, tìm kiếm món, xem chi tiết, tạo món mới qua API demo, quản lý giỏ hàng và đặt hàng.

## Công nghệ

- React, TypeScript, Vite
- React Router DOM cho điều hướng
- Axios cho Web API
- `json-server` làm API demo đọc/ghi dữ liệu trong `db.json`
- Bootstrap cho grid, form, navbar và button theo tiêu chí môn học
- Tailwind CSS kết hợp CSS riêng để tinh chỉnh giao diện và responsive

## Cài đặt và chạy

Yêu cầu Node.js 20.19 trở lên.

```bash
npm install
```

Mở hai terminal trong thư mục `seoul-bite`:

```bash
npm run api
```

API chạy tại `http://localhost:3001`.

```bash
npm run dev
```

Website chạy tại địa chỉ Vite hiển thị trong terminal.

## API demo

- Base URL: `http://localhost:3001`
- `GET /products`: lấy danh sách món ăn
- `GET /products/:id`: lấy chi tiết món ăn
- `POST /products`: thêm món mới từ form trên trang thực đơn
- `PUT /products/:id`: cập nhật món trong trang quản trị
- `DELETE /products/:id`: xóa món trong trang quản trị

Service Axios nằm trong `src/services/productService.ts`; dữ liệu ban đầu nằm trong `db.json`. `json-server` có thể ghi món mới trở lại file dữ liệu khi API nhận POST.

## Cấu trúc thư mục

```text
src/
├── components/    # Header, Footer, thẻ món, form và trạng thái dùng chung
├── context/       # State giỏ hàng và đồng bộ localStorage
├── data/          # Nhãn danh mục
├── hooks/         # Hook tải danh sách sản phẩm
├── pages/         # Các trang theo route
├── routes/        # Ánh xạ route tới page
├── services/      # Các lời gọi Axios
├── types/         # Interface và union type
└── utils/         # Định dạng giá và class quản lý giỏ hàng
```

## Chức năng

- Trang chủ, giới thiệu, danh sách món và chi tiết món
- Tìm theo tên/danh mục, lọc danh mục, sắp xếp theo giá hoặc tên
- Thêm món mới bằng form controlled và Axios POST
- Trang admin demo có đăng nhập và CRUD món ăn
- Giỏ hàng tăng/giảm/xóa món; dữ liệu được lưu bằng `localStorage`
- Checkout có kiểm tra thông tin, lưu đơn và trang xem đơn hàng
- Loading, lỗi API, trạng thái rỗng và route 404
- Bố cục thích ứng cho desktop, tablet và điện thoại

Tài khoản admin demo: `admin` / `seoulbite123`. Đây là đăng nhập mô phỏng phía front-end để trình bày phân quyền trong đồ án; `json-server` không xác minh danh tính, nên không dùng cơ chế này cho website thật.

## Kiến thức Front-end áp dụng

- TypeScript: `Product`, `CartItem`, `Order`, `CheckoutForm`, union types và class `CartManager`
- React: function components, props có kiểu, `useState`, `useEffect`, `useMemo`, `useRef`
- Sự kiện: `onClick`, `onChange`, `onSubmit`; form controlled và callback từ component con
- Danh sách: `map()` với `key`, tìm kiếm/lọc/sắp xếp bằng `filter()` và `sort()`
- Router: `BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useNavigate`, `useParams`
- Web API: Axios GET danh sách, GET chi tiết, POST món mới; xử lý async/loading/error
- Bootstrap và Tailwind CSS cho bố cục, giao diện và responsive

## Ghi chú khi demo

Khởi chạy cả API (`npm run api`) và ứng dụng (`npm run dev`) trong hai terminal riêng. Nếu API tắt, website sẽ hiển thị thông báo lỗi và nút thử tải lại.
