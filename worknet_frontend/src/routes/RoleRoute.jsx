import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RoleRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    // Rediriger vers la page d'accueil ou dashboard selon le rôle
    if (user) {
      if (user.role === 'client') {
        return <Navigate to="/client/dashboard" replace />;
      } else if (user.role === 'freelancer') {
        return <Navigate to="/freelancer/dashboard" replace />;
      }
    }
    return <Navigate to="/" replace />;
  }

  return children;
};