// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch, FaUser, FaBell, FaShoppingCart } from 'react-icons/fa';
// import { useMockAuth } from '../../context/MockAuthContext';

// export default function Navbar() {
//   const { user, logout, isAuthenticated } = useMockAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="bg-white shadow-sm border-b border-gray-200">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-green-600">Work</span>
//             <span className="text-2xl font-bold text-gray-900">Net</span>
//           </Link>

//           {/* Search Bar (visible seulement sur grand écran) */}
//           <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
//             <div className="relative w-full">
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Rechercher des services..."
//                 className="w-full pl-12 pr-4 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center space-x-6">
//             <Link to="/browse" className="text-gray-700 hover:text-green-600 font-medium">
//               Explorer
//             </Link>
//             <Link to="/how-it-works" className="text-gray-700 hover:text-green-600 font-medium">
//               Comment ça marche
//             </Link>
//             {isAuthenticated && (
//               <>
//                 {user?.role === 'freelancer' ? (
//                   <Link to="/freelancer/dashboard" className="text-gray-700 hover:text-green-600 font-medium">
//                     Dashboard
//                   </Link>
//                 ) : (
//                   <Link to="/client/dashboard" className="text-gray-700 hover:text-green-600 font-medium">
//                     Dashboard
//                   </Link>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Auth Buttons */}
//           <div className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <Link to="/notifications" className="relative">
//                   <FaBell className="text-xl text-gray-600 hover:text-green-600 transition-colors" />
//                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
//                 </Link>
                
//                 <Link to={user?.role === 'freelancer' ? '/freelancer/orders' : '/client/orders'} className="relative">
//                   <FaShoppingCart className="text-xl text-gray-600 hover:text-green-600 transition-colors" />
//                 </Link>

//                 <div className="relative group">
//                   <button className="flex items-center space-x-2 focus:outline-none">
//                     <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
//                       {user?.avatar_url ? (
//                         <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
//                       ) : (
//                         <FaUser className="w-full h-full p-2 text-gray-500" />
//                       )}
//                     </div>
//                   </button>
                  
//                   {/* Dropdown */}
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                     <div className="py-2">
//                       <div className="px-4 py-2 border-b border-gray-200">
//                         <p className="font-medium text-gray-900">{user?.full_name}</p>
//                         <p className="text-sm text-gray-600">{user?.role === 'freelancer' ? 'Freelancer' : 'Client'}</p>
//                       </div>
//                       <Link 
//                         to={user?.role === 'freelancer' ? '/freelancer/profile' : '/client/profile'} 
//                         className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                       >
//                         Mon Profil
//                       </Link>
//                       <button 
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                       >
//                         Déconnexion
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium">
//                   Connexion
//                 </Link>
//                 <Link 
//                   to="/register" 
//                   className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
//                 >
//                   S'inscrire
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Mobile Search (visible seulement sur petit écran) */}
//         <div className="lg:hidden py-3">
//           <div className="relative">
//             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Rechercher des services..."
//               className="w-full pl-12 pr-4 py-2 bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//             />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  FaSearch, 
  FaBell, 
  FaEnvelope, 
  FaUserCircle,
  FaBars,
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaComments,
  FaMoneyBill,
  FaCog
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const freelancerLinks = [
    { path: '/freelancer/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/freelancer/my-gigs', label: 'Mes Services', icon: <FaBox /> },
    { path: '/freelancer/orders', label: 'Commandes', icon: <FaShoppingCart /> },
    { path: '/freelancer/messages', label: 'Messages', icon: <FaComments /> },
    { path: '/freelancer/earnings', label: 'Revenus', icon: <FaMoneyBill /> },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo et Navigation Desktop */}
            <div className="flex items-center">
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <FaBars size={20} />
              </button>
              
              <Link to="/" className="flex items-center ml-2 md:ml-0">
                <span className="text-2xl font-bold text-green-600">Work</span>
                <span className="text-2xl font-bold text-gray-900">Net</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                {freelancerLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-green-600"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 hidden md:flex">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher des services..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FaBell size={20} />
                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              
              <button className="ml-4 p-2 text-gray-600 hover:text-gray-900">
                <FaEnvelope size={20} />
                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>

              {/* User Profile Dropdown */}
              <div className="ml-4 relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.full_name}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="h-8 w-8 text-green-600" />
                    )}
                  </div>
                  <span className="ml-2 hidden md:block text-gray-700">
                    {user?.full_name?.split(' ')[0] || user?.username}
                  </span>
                </button>

                {showDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/freelancer/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Mon Profil
                    </Link>
                    
                    <Link
                      to="/freelancer/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FaCog className="inline mr-2" />
                      Paramètres
                    </Link>
                    
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {freelancerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;