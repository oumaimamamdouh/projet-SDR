import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaShoppingBag, 
  FaClipboardList, 
  FaStar,
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar() {
  const { logout } = useAuth();

  const navItems = [
    { to: '/admin/dashboard', icon: <FaHome />, label: 'Tableau de bord' },
    { to: '/admin/users', icon: <FaUsers />, label: 'Utilisateurs' },
    { to: '/admin/gigs', icon: <FaShoppingBag />, label: 'Services' },
    { to: '/admin/orders', icon: <FaClipboardList />, label: 'Commandes' },
    { to: '/admin/reviews', icon: <FaStar />, label: 'Avis' },
    { to: '/admin/analytics', icon: <FaChartBar />, label: 'Analytics' },
    { to: '/admin/settings', icon: <FaCog />, label: 'Paramètres' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-green-400">Work</span>
          <span className="text-2xl font-bold text-white">Net</span>
          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
          Administration
        </p>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white border-l-4 border-green-500'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:bg-red-900 hover:text-white rounded-lg transition-colors"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}