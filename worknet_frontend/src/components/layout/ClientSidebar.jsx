import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaSearch, 
  FaShoppingCart, 
  FaCommentDots, 
  FaBell, 
  FaUserCircle,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function ClientSidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { to: '/client/dashboard', icon: <FaHome />, label: 'Tableau de bord' },
    { to: '/client/browse', icon: <FaSearch />, label: 'Explorer' },
    { to: '/client/orders', icon: <FaShoppingCart />, label: 'Mes commandes' },
    { to: '/client/messages', icon: <FaCommentDots />, label: 'Messages' },
    { to: '/client/notifications', icon: <FaBell />, label: 'Notifications' },
  ];

  const secondaryItems = [
    { to: '/client/profile', icon: <FaUserCircle />, label: 'Mon profil' },
    { to: '/client/settings', icon: <FaCog />, label: 'Paramètres' },
    { to: '/client/help', icon: <FaQuestionCircle />, label: 'Aide' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-600">Work</span>
          <span className="text-2xl font-bold text-gray-900">Net</span>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Client</span>
        </div>
      </div>

      {/* Profile */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
            {user?.username?.charAt(0).toUpperCase() || 'C'}
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.full_name || user?.username}</p>
            <p className="text-sm text-gray-600">Client</p>
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <nav className="flex-1 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Navigation
        </p>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700 border-l-4 border-green-600'
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
                      ? 'bg-green-50 text-green-700'
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