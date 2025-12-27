import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Rediriger vers login avec l'URL de retour
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérifier si l'utilisateur a accès à cette route selon son rôle
  const currentPath = location.pathname;
  
  if (currentPath.startsWith('/client') && user.role !== 'client' && user.role !== 'Client') {
    return <Navigate to="/" replace />;
  }
  
  if (currentPath.startsWith('/freelancer') && user.role !== 'freelancer' && user.role !== 'Freelancer') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;