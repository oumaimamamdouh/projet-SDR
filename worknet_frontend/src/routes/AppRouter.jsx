import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import FreelancerLayout from '../layouts/FreelancerLayout';
import ClientLayout from '../layouts/ClientLayout';
import MainLayout from '../layouts/MainLayout';

// Public Pages
import Home from '../pages/public/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Freelancer Pages
import FreelancerDashboard from '../pages/freelancer/Dashboard';
import MyGigs from '../pages/freelancer/MyGigs';
import CreateGig from '../pages/freelancer/CreateGig';
import EditGig from '../pages/freelancer/EditGig';
import Orders from '../pages/freelancer/Orders';
import OrderDetails from '../pages/freelancer/OrderDetails';
import Messages from '../pages/freelancer/Messages';
import Notifications from '../pages/freelancer/Notifications';
import Profile from '../pages/freelancer/Profile';
import Earnings from '../pages/freelancer/Earnings';

// Client Pages
import ClientDashboard from '../pages/client/Dashboard';
import BrowseGigs from '../pages/client/BrowseGigs';
import GigDetails from '../pages/client/GigDetails';
import MyOrders from '../pages/client/MyOrders';
import Checkout from '../pages/client/Checkout';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Freelancer Routes */}
      <Route
        path="/freelancer"
        element={
          <ProtectedRoute allowedRoles={['freelancer', 'Freelancer']}>
            <FreelancerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<FreelancerDashboard />} />
        <Route path="gigs" element={<MyGigs />} />
        <Route path="gigs/create" element={<CreateGig />} />
        <Route path="gigs/:id/edit" element={<EditGig />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="earnings" element={<Earnings />} />
      </Route>

      {/* Client Routes */}
      <Route
        path="/client"
        element={
          <ProtectedRoute allowedRoles={['client', 'Client']}>
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="gigs" element={<BrowseGigs />} />
        <Route path="gigs/:id" element={<GigDetails />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="checkout/:id" element={<Checkout />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;