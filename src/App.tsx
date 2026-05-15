/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { ProductDetails } from '@/pages/ProductDetails';
import { Cart } from '@/pages/Cart';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminProducts } from '@/pages/admin/AdminProducts';
import { AdminOrders } from '@/pages/admin/AdminOrders';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { Loader } from '@/components/ui/Loader';

export default function App() {
  return (
    <>
      <Loader />
      <CursorGlow />
      <BrowserRouter>
        <ScrollToTop />
      <Routes>
        {/* Public Site */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="collections" element={<Products />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Login (Hidden route) */}
        <Route path="/opaline-admin-hidden" element={<AdminLogin />} />

        {/* Secure Admin Area */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
