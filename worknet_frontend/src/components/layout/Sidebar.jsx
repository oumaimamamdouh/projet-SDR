import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBox, 
  FaShoppingCart, 
  FaComments, 
  FaMoneyBill,
  FaUser,
  FaCog,
  FaChartLine,
  FaHeart,
  FaPlus
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { path: '/freelancer/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', badge: null },
    { path: '/freelancer/my-gigs', icon: <FaBox />, label: 'Mes Services', badge: '8' },
    { path: '/freelancer/create-gig', icon: <FaPlus />, label: 'Créer Service', badge: null },
    { path: '/freelancer/orders', icon: <FaShoppingCart />, label: 'Commandes', badge: '5' },
    { path: '/freelancer/messages', icon: <FaComments />, label: 'Messages', badge: '12' },
    { path: '/freelancer/earnings', icon: <FaMoneyBill />, label: 'Revenus', badge: null },
    { path: '/freelancer/analytics', icon: <FaChartLine />, label: 'Analytiques', badge: null },
    { path: '/freelancer/saved', icon: <FaHeart />, label: 'Favoris', badge: '3' },
    { path: '/freelancer/profile', icon: <FaUser />, label: 'Profil', badge: null },
    { path: '/freelancer/settings', icon: <FaCog />, label: 'Paramètres', badge: null },
  ];

  const stats = {
    gigs: 8,
    orders: 5,
    rating: 4.8,
    earnings: '2,450 DH'
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden lg:block">
      <div className="h-full flex flex-col">
        {/* User Profile */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <FaUser className="h-8 w-8 text-green-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user?.full_name}</h3>
              <p className="text-sm text-gray-500">Freelancer</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Stats */}
        <div className="p-4 border-t">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Statistiques</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{stats.gigs}</div>
                <div className="text-xs text-gray-500">Services</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{stats.orders}</div>
                <div className="text-xs text-gray-500">Commandes</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{stats.rating}</div>
                <div className="text-xs text-gray-500">Note</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{stats.earnings}</div>
                <div className="text-xs text-gray-500">Revenus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;