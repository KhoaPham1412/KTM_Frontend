import { Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import HomePage from '../pages/HomePage'
import MenuPage from '../pages/MenuPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import OrdersPage from '../pages/OrdersPage'
import AboutPage from '../pages/AboutPage'
import NotFoundPage from '../pages/NotFoundPage'
import AdminLoginPage from '../pages/AdminLoginPage'
import AdminProductsPage from '../pages/AdminProductsPage'
import AdminRoute from '../components/admin/AdminRoute'
import AdminLayout from '../components/admin/AdminLayout'

function AppRoutes() {
  return <Routes><Route element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path="menu" element={<MenuPage />} />
    <Route path="menu/:id" element={<ProductDetailPage />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="checkout" element={<CheckoutPage />} />
    <Route path="orders" element={<OrdersPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="admin/login" element={<AdminLoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route><Route element={<AdminRoute />}><Route path="admin" element={<AdminLayout />}><Route index element={<AdminProductsPage />} /></Route></Route></Routes>
}

export default AppRoutes
