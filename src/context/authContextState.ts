// [GIỮ NGUYÊN] Import gốc
import { createContext } from "react";

// [GIỮ NGUYÊN] Kiểu vai trò người dùng
export type UserRole = "admin" | "customer";

// [THÊM MỚI] Interface lưu thông tin tài khoản khách hàng
export interface CustomerUser {
  id: string;
  name: string;
  username: string;
  phone?: string;
  address?: string;
}

export interface AuthContextValue {
  // [GIỮ NGUYÊN] Các thuộc tính & hàm gốc cho Admin
  role: UserRole;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;

  // [THÊM MỚI] Các thuộc tính & hàm mở rộng cho Khách hàng (Đăng nhập, Đăng ký, Cập nhật hồ sơ)
  isCustomerLoggedIn: boolean;
  customer: CustomerUser | null;
  loginCustomer: (
    username: string,
    password: string,
  ) => { ok: boolean; message?: string };
  registerCustomer: (payload: {
    name: string;
    username: string;
    password: string;
    phone?: string;
    address?: string;
  }) => { ok: boolean; message?: string };
  updateCustomerProfile: (
    payload: Pick<CustomerUser, "name" | "phone" | "address">,
  ) => void;
}

// [GIỮ NGUYÊN] Khởi tạo AuthContext gốc
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
