// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch, FaBell, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
// import { useMockAuth } from '../../context/MockAuthContext';

// export default function ClientHeader() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const { user, logout } = useMockAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-green-600">Work</span>
//             <span className="text-2xl font-bold text-gray-900">Net</span>
//           </Link>

//           {/* Search Bar */}
//           <div className="flex-1 max-w-2xl mx-8">
//             <div className="relative">
//               <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Rechercher des services..."
//                 className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link to="/client/browse" className="text-gray-700 hover:text-green-600 font-medium">
//               Explorer
//             </Link>
//             <Link to="/client/orders" className="text-gray-700 hover:text-green-600 font-medium">
//               Mes Commandes
//             </Link>
//             <Link to="/client/messages" className="text-gray-700 hover:text-green-600 font-medium">
//               Messages
//             </Link>
//           </nav>

//           {/* Icons & Profile */}
//           <div className="flex items-center space-x-4">
//             <Link to="/client/notifications" className="relative">
//               <FaBell className="text-xl text-gray-600 hover:text-green-600 transition-colors" />
//               <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
//             </Link>

//             <Link to="/client/orders" className="relative">
//               <FaShoppingCart className="text-xl text-gray-600 hover:text-green-600 transition-colors" />
//             </Link>

//             {/* Profile Dropdown */}
//             <div className="relative group">
//               <button className="flex items-center space-x-2 focus:outline-none">
//                 <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
//                   <img 
//                     src="/uploads/avatar-client.jpg" 
//                     alt="Profile" 
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                       e.target.parentElement.innerHTML = '<FaUserCircle className="w-full h-full text-gray-400" />';
//                     }}
//                   />
//                 </div>
//                 <span className="hidden md:inline text-gray-700">{user?.full_name || 'Client'}</span>
//               </button>

//               {/* Dropdown Menu */}
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 <div className="py-2">
//                   <Link 
//                     to="/client/dashboard" 
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     Dashboard
//                   </Link>
//                   <Link 
//                     to="/client/profile" 
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     Mon Profil
//                   </Link>
//                   <Link 
//                     to="/client/saved" 
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     Services sauvegardés
//                   </Link>
//                   <div className="border-t border-gray-200 mt-2 pt-2">
//                     <button 
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                     >
//                       Déconnexion
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
import { useState } from 'react';
import { FaBell, FaSearch, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function ClientHeader() {
  const { user } = useAuth();
  const [notifications] = useState(3);
  const [messages] = useState(2);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Barre de recherche */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des services, freelancers..."
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6 ml-8">
            {/* Messages */}
            <button className="relative">
              <FaEnvelope className="text-xl text-gray-600 hover:text-green-600" />
              {messages > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {messages}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button className="relative">
              <FaBell className="text-xl text-gray-600 hover:text-green-600" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-600">Solde: 0 DH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}