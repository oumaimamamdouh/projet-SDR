import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaPlusCircle, 
  FaChartLine, 
  FaShoppingCart, 
  FaCommentDots, 
  FaBell,
  FaUserCircle,
  FaWallet,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function FreelancerSidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/freelancer/dashboard', icon: <FaHome />, label: 'Tableau de bord' },
    { to: '/freelancer/my-gigs', icon: <FaChartLine />, label: 'Mes services' },
    { to: '/freelancer/create-gig', icon: <FaPlusCircle />, label: 'Créer un service' },
    { to: '/freelancer/orders', icon: <FaShoppingCart />, label: 'Commandes' },
    { to: '/freelancer/messages', icon: <FaCommentDots />, label: 'Messages' },
    { to: '/freelancer/earnings', icon: <FaWallet />, label: 'Revenus' },
    { to: '/freelancer/notifications', icon: <FaBell />, label: 'Notifications' },
  ];

  const secondaryItems = [
    { to: '/freelancer/profile', icon: <FaUserCircle />, label: 'Mon profil' },
    { to: '/freelancer/settings', icon: <FaCog />, label: 'Paramètres' },
    { to: '/freelancer/help', icon: <FaQuestionCircle />, label: 'Aide' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-600">Work</span>
          <span className="text-2xl font-bold text-gray-900">Net</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Freelancer</span>
        </div>
      </div>

      {/* Profile */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
            {user?.username?.charAt(0).toUpperCase() || 'F'}
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.full_name || user?.username}</p>
            <p className="text-sm text-gray-600">Freelancer</p>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium ml-1">{user?.rating || 5.0}</span>
              <span className="text-xs text-gray-500 ml-1">({user?.total_reviews || 0} avis)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Travail
        </p>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-8 mb-4 px-2">
          Compte
        </p>
        <ul className="space-y-2">
          {secondaryItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Stats rapides */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs font-medium text-gray-600 mb-2">Statistiques rapides</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <p className="font-bold text-gray-900">{user?.completed_orders || 0}</p>
              <p className="text-xs text-gray-600">Commandes</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-green-600">{user?.total_earnings || 0} DH</p>
              <p className="text-xs text-gray-600">Revenus</p>
            </div>
          </div>
        </div>
      </div>

      {/* Déconnexion */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}