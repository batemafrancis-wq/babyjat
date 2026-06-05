import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import { SignIn, SignUp } from './pages/Auth';
import { Privacy, Terms } from './pages/Static';

// Customer Account
import AccountLayout from './pages/account/AccountLayout';
import AccountDashboard from './pages/account/AccountDashboard';
import { AppointmentsList, NewAppointment } from './pages/account/Appointments';
import { ProductShop, OrdersList } from './pages/account/Shop';
import Tokens from './pages/account/Tokens';
import Profile from './pages/account/Profile';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import {
  AdminBookings, AdminOrders, AdminProducts, AdminServices,
  AdminGallery, AdminTestimonials, AdminCustomers, AdminTokens, AdminSettings
} from './pages/admin/AdminPages';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC - with main layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />

          {/* AUTH */}
          <Route path="/signin" element={<Layout><SignIn /></Layout>} />
          <Route path="/signup" element={<Layout><SignUp /></Layout>} />

          {/* CUSTOMER ACCOUNT */}
          <Route path="/account" element={<Layout><AccountLayout><AccountDashboard /></AccountLayout></Layout>} />
          <Route path="/account/appointments" element={<Layout><AccountLayout><AppointmentsList /></AccountLayout></Layout>} />
          <Route path="/account/appointments/new" element={<Layout><AccountLayout><NewAppointment /></AccountLayout></Layout>} />
          <Route path="/account/orders" element={<Layout><AccountLayout><OrdersList /></AccountLayout></Layout>} />
          <Route path="/account/orders/new" element={<Layout><AccountLayout><ProductShop /></AccountLayout></Layout>} />
          <Route path="/account/tokens" element={<Layout><AccountLayout><Tokens /></AccountLayout></Layout>} />
          <Route path="/account/profile" element={<Layout><AccountLayout><Profile /></AccountLayout></Layout>} />

          {/* ADMIN - no main layout, uses admin layout */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
          <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
          <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
          <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
          <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
          <Route path="/admin/customers" element={<AdminLayout><AdminCustomers /></AdminLayout>} />
          <Route path="/admin/tokens" element={<AdminLayout><AdminTokens /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
