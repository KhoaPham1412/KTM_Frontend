// [CẬP NHẬT] Bổ sung CustomerUser từ authContextState
import { useMemo, useState, type ReactNode } from "react";
import {
  AuthContext,
  type CustomerUser,
  type UserRole,
  type AuthContextValue,
} from "./authContextState";

// [GIỮ NGUYÊN] Tài khoản demo Admin gốc (đổi tên biến cho rõ nghĩa)
const DEMO_ADMIN_USERNAME = "admin";
const DEMO_ADMIN_PASSWORD = "seoulbite123";
const ROLE_STORAGE_KEY = "seoul-bite-role";

// [THÊM MỚI] Key lưu phiên đăng nhập và danh sách tài khoản khách hàng trong localStorage
const CUSTOMER_STORAGE_KEY = "seoul-bite-customer";
const CUSTOMERS_DB_KEY = "seoul-bite-customers-db";

// [THÊM MỚI] Kiểu lưu trữ nội bộ có kèm mật khẩu để kiểm tra đăng nhập khách
interface StoredCustomerAccount extends CustomerUser {
  password: string;
}

// [THÊM MỚI] Lấy danh sách tài khoản khách hàng từ localStorage (kèm 1 tài khoản mẫu để test)
function getStoredCustomers(): StoredCustomerAccount[] {
  try {
    const raw = localStorage.getItem(CUSTOMERS_DB_KEY);
    if (raw) return JSON.parse(raw) as StoredCustomerAccount[];
  } catch {
    // Bỏ qua lỗi parse JSON
  }
  return [
    {
      id: "cust-demo-1",
      name: "Khách hàng Seoul Bite",
      username: "khachhang",
      password: "123",
      phone: "0901234567",
      address: "Quận 12, TP. Hồ Chí Minh",
    },
  ];
}

// [THÊM MỚI] Khôi phục phiên đăng nhập của khách hàng khi F5 trang
function getInitialCustomer(): CustomerUser | null {
  try {
    const raw = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CustomerUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // [THÊM MỚI] State lưu thông tin khách hàng đang đăng nhập
  const [customer, setCustomer] = useState<CustomerUser | null>(
    getInitialCustomer,
  );

  // [GIỮ NGUYÊN] State phân quyền Admin / Customer gốc
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = sessionStorage.getItem(ROLE_STORAGE_KEY);
    if (savedRole === "admin") return "admin";
    return "customer";
  });

  const value = useMemo<AuthContextValue>(() => {
    const isAdmin = role === "admin";
    // [THÊM MỚI] Xác định khách hàng đã đăng nhập hay chưa
    const isCustomerLoggedIn = !isAdmin && customer !== null;

    return {
      // [GIỮ NGUYÊN] Giá trị & hàm đăng nhập Admin gốc
      role,
      isAdmin,
      login: (username, password) => {
        if (
          username !== DEMO_ADMIN_USERNAME ||
          password !== DEMO_ADMIN_PASSWORD
        ) {
          return false;
        }
        sessionStorage.setItem(ROLE_STORAGE_KEY, "admin");
        setRole("admin");
        return true;
      },

      // [THÊM MỚI] Giá trị & hàm xử lý Đăng nhập / Đăng ký / Cập nhật hồ sơ Khách hàng
      isCustomerLoggedIn,
      customer,

      loginCustomer: (username, password) => {
        const cleanUser = username.trim().toLowerCase();
        if (!cleanUser || !password) {
          return {
            ok: false,
            message: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.",
          };
        }

        const list = getStoredCustomers();
        const found = list.find(
          (acc) =>
            acc.username.toLowerCase() === cleanUser &&
            acc.password === password,
        );

        if (!found) {
          return {
            ok: false,
            message:
              "Sai tài khoản hoặc mật khẩu. (Gợi ý test: khachhang / 123)",
          };
        }

        const safeCustomer: CustomerUser = {
          id: found.id,
          name: found.name,
          username: found.username,
          phone: found.phone,
          address: found.address,
        };

        localStorage.setItem(
          CUSTOMER_STORAGE_KEY,
          JSON.stringify(safeCustomer),
        );
        sessionStorage.setItem(ROLE_STORAGE_KEY, "customer");
        setCustomer(safeCustomer);
        setRole("customer");
        return { ok: true };
      },

      registerCustomer: ({ name, username, password, phone, address }) => {
        const cleanName = name.trim();
        const cleanUser = username.trim().toLowerCase();

        if (!cleanName || !cleanUser || !password) {
          return {
            ok: false,
            message: "Vui lòng nhập họ tên, tên đăng nhập và mật khẩu.",
          };
        }
        if (password.length < 3) {
          return { ok: false, message: "Mật khẩu phải có ít nhất 3 ký tự." };
        }

        const list = getStoredCustomers();
        const existed = list.some(
          (acc) => acc.username.toLowerCase() === cleanUser,
        );
        if (existed) {
          return { ok: false, message: "Tên đăng nhập này đã được sử dụng." };
        }

        const newAccount: StoredCustomerAccount = {
          id: `cust-${Date.now()}`,
          name: cleanName,
          username: cleanUser,
          password,
          phone: phone?.trim() || "",
          address: address?.trim() || "",
        };

        localStorage.setItem(
          CUSTOMERS_DB_KEY,
          JSON.stringify([newAccount, ...list]),
        );

        const safeCustomer: CustomerUser = {
          id: newAccount.id,
          name: newAccount.name,
          username: newAccount.username,
          phone: newAccount.phone,
          address: newAccount.address,
        };

        localStorage.setItem(
          CUSTOMER_STORAGE_KEY,
          JSON.stringify(safeCustomer),
        );
        sessionStorage.setItem(ROLE_STORAGE_KEY, "customer");
        setCustomer(safeCustomer);
        setRole("customer");
        return { ok: true };
      },

      updateCustomerProfile: (payload) => {
        setCustomer((prev) => {
          if (!prev) return prev;
          const updated: CustomerUser = {
            ...prev,
            name: payload.name.trim() || prev.name,
            phone: payload.phone?.trim() ?? "",
            address: payload.address?.trim() ?? "",
          };
          localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(updated));

          const list = getStoredCustomers().map((acc) =>
            acc.id === updated.id
              ? {
                  ...acc,
                  name: updated.name,
                  phone: updated.phone,
                  address: updated.address,
                }
              : acc,
          );
          localStorage.setItem(CUSTOMERS_DB_KEY, JSON.stringify(list));
          return updated;
        });
      },

      // [CẬP NHẬT] Đăng xuất xóa cả session Admin lẫn localStorage của Khách hàng
      logout: () => {
        sessionStorage.removeItem(ROLE_STORAGE_KEY);
        localStorage.removeItem(CUSTOMER_STORAGE_KEY);
        setCustomer(null);
        setRole("customer");
      },
    };
  }, [role, customer]);

  // [GIỮ NGUYÊN] Provider gốc
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
