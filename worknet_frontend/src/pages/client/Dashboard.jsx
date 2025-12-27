// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { 
//   FaShoppingCart, 
//   FaClock, 
//   FaCheckCircle, 
//   FaStar,
//   FaBell,
//   FaSearch,
//   FaChartLine,
//   FaUserCircle
// } from 'react-icons/fa'
// import { orderService } from '../../services/orderService'

// export default function ClientDashboard() {
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     activeOrders: 0,
//     completedOrders: 0,
//     totalSpent: 0
//   })
//   const [recentOrders, setRecentOrders] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     try {
//       const orders = await orderService.getMyOrders()
//       setRecentOrders(orders.slice(0, 5))
      
//       setStats({
//         totalOrders: orders.length,
//         activeOrders: orders.filter(o => o.status === 'in_progress').length,
//         completedOrders: orders.filter(o => o.status === 'completed').length,
//         totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
//       })
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <span className="text-2xl font-bold text-green-500">Work</span>
//               <span className="text-2xl font-bold text-gray-900">Net</span>
//             </div>
            
//             <div className="flex items-center space-x-6">
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search services..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
              
//               <button className="relative text-gray-600 hover:text-green-500">
//                 <FaBell className="text-xl" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   3
//                 </span>
//               </button>
              
//               <div className="flex items-center space-x-2">
//                 <FaUserCircle className="text-2xl text-gray-600" />
//                 <span className="font-medium">John Doe</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
//             <p className="text-gray-600">Welcome back! Here's your activity overview.</p>
//           </div>
//           <Link
//             to="/gigs"
//             className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold"
//           >
//             Browse Services
//           </Link>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600">Total Orders</p>
//                 <h3 className="text-3xl font-bold text-gray-900">{stats.totalOrders}</h3>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <FaShoppingCart className="text-blue-600 text-2xl" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600">Active Orders</p>
//                 <h3 className="text-3xl font-bold text-gray-900">{stats.activeOrders}</h3>
//               </div>
//               <div className="bg-yellow-100 p-3 rounded-full">
//                 <FaClock className="text-yellow-600 text-2xl" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600">Completed</p>
//                 <h3 className="text-3xl font-bold text-gray-900">{stats.completedOrders}</h3>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <FaCheckCircle className="text-green-600 text-2xl" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600">Total Spent</p>
//                 <h3 className="text-3xl font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</h3>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-full">
//                 <FaChartLine className="text-purple-600 text-2xl" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Recent Orders */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
//               <div className="p-6 border-b border-gray-200">
//                 <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
//               </div>
              
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Service
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Freelancer
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {loading ? (
//                       <tr>
//                         <td colSpan="4" className="px-6 py-8 text-center">
//                           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
//                         </td>
//                       </tr>
//                     ) : recentOrders.length === 0 ? (
//                       <tr>
//                         <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
//                           No orders yet. Start by browsing services!
//                         </td>
//                       </tr>
//                     ) : (
//                       recentOrders.map((order) => (
//                         <tr key={order._id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <img
//                                 src={order.gig?.images?.[0] || 'https://via.placeholder.com/40'}
//                                 alt={order.gig?.title}
//                                 className="w-10 h-10 rounded mr-3"
//                               />
//                               <div>
//                                 <div className="font-medium text-gray-900">{order.gig?.title}</div>
//                                 <div className="text-sm text-gray-500">{order.package}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <div className="flex items-center">
//                               <img
//                                 src={order.freelancer?.avatar || 'https://via.placeholder.com/30'}
//                                 alt={order.freelancer?.name}
//                                 className="w-8 h-8 rounded-full mr-2"
//                               />
//                               <span>{order.freelancer?.name}</span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4">
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                               order.status === 'completed' 
//                                 ? 'bg-green-100 text-green-800'
//                                 : order.status === 'in_progress'
//                                 ? 'bg-yellow-100 text-yellow-800'
//                                 : 'bg-blue-100 text-blue-800'
//                             }`}>
//                               {order.status.replace('_', ' ')}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 font-semibold">
//                             ${order.total.toFixed(2)}
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="p-6 border-t border-gray-200">
//                 <Link
//                   to="/orders"
//                   className="text-green-600 hover:text-green-700 font-medium"
//                 >
//                   View all orders →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions & Recommendations */}
//           <div className="space-y-6">
//             {/* Quick Actions */}
//             <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <Link
//                   to="/gigs"
//                   className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
//                 >
//                   <FaSearch className="text-gray-500 mr-3" />
//                   <span>Find New Services</span>
//                 </Link>
//                 <Link
//                   to="/orders"
//                   className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
//                 >
//                   <FaClock className="text-gray-500 mr-3" />
//                   <span>Track Orders</span>
//                 </Link>
//                 <Link
//                   to="/messages"
//                   className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
//                 >
//                   <FaBell className="text-gray-500 mr-3" />
//                   <span>View Messages</span>
//                 </Link>
//               </div>
//             </div>

//             {/* Recommended Freelancers */}
//             <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Freelancers</h3>
//               <div className="space-y-4">
//                 {[
//                   { name: 'Sarah Chen', rating: 4.9, skills: ['Logo Design', 'Branding'] },
//                   { name: 'Michael Rodriguez', rating: 4.8, skills: ['Web Development', 'React'] },
//                   { name: 'Emma Wilson', rating: 5.0, skills: ['Content Writing', 'SEO'] }
//                 ].map((freelancer, idx) => (
//                   <div key={idx} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
//                     <img
//                       src={`https://via.placeholder.com/40`}
//                       alt={freelancer.name}
//                       className="w-10 h-10 rounded-full mr-3"
//                     />
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-900">{freelancer.name}</h4>
//                       <div className="flex items-center">
//                         <FaStar className="text-yellow-400 text-sm mr-1" />
//                         <span className="text-sm text-gray-600">{freelancer.rating}</span>
//                       </div>
//                       <div className="text-xs text-gray-500 mt-1">
//                         {freelancer.skills.join(', ')}
//                       </div>
//                     </div>
//                     <button className="text-green-600 hover:text-green-700 text-sm font-medium">
//                       Hire
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaCheckCircle, 
  FaClock, 
  FaDollarSign,
  FaSearch,
  FaStar,
  FaCalendarAlt,
  FaUserCircle
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import orderService from '../../services/orderService';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeOrders: 0,
    completedOrders: 0,
    totalSpent: 0,
    favoriteFreelancers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recommendedGigs, setRecommendedGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Charger les statistiques
      const ordersResponse = await orderService.getMyOrders();
      const orders = ordersResponse.data?.orders || [];
      
      const activeOrders = orders.filter(o => ['pending', 'in_progress'].includes(o.status)).length;
      const completedOrders = orders.filter(o => o.status === 'completed').length;
      const totalSpent = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, order) => sum + (order.amount || 0), 0);
      
      setStats({
        activeOrders,
        completedOrders,
        totalSpent,
        favoriteFreelancers: 3 // Temporaire
      });

      // Commandes récentes
      setRecentOrders(orders.slice(0, 5));

      // Services recommandés
      setRecommendedGigs([
        {
          id: 1,
          title: 'Logo Design for Startup',
          category: 'Design',
          price: 500,
          rating: 4.8,
          deliveryTime: '3 days',
          freelancer: { name: 'John Designer' }
        },
        {
          id: 2,
          title: 'Website Development',
          category: 'Development',
          price: 1500,
          rating: 4.9,
          deliveryTime: '7 days',
          freelancer: { name: 'Sarah Developer' }
        },
        {
          id: 3,
          title: 'Social Media Marketing',
          category: 'Marketing',
          price: 800,
          rating: 4.7,
          deliveryTime: '5 days',
          freelancer: { name: 'Mike Marketer' }
        }
      ]);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bonjour, {user?.full_name || user?.username} 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Voici un aperçu de votre activité sur WorkNet
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <FaClock className="text-2xl text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Commandes actives</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Commandes terminées</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <FaDollarSign className="text-2xl text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Dépenses totales</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSpent} DH</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <FaUserCircle className="text-2xl text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Freelancers favoris</p>
              <p className="text-2xl font-bold text-gray-900">{stats.favoriteFreelancers}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Commandes récentes */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Commandes récentes</h2>
              <Link to="/client/orders" className="text-green-600 hover:text-green-700 font-medium">
                Voir tout →
              </Link>
            </div>
            
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order._id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${order.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}`}>
                        <FaShoppingCart className={order.status === 'completed' ? 'text-green-600' : 'text-blue-600'} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{order.title || 'Commande'}</h3>
                        <p className="text-sm text-gray-600">Status: {order.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{order.amount || 0} DH</p>
                      <p className="text-sm text-gray-600">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaShoppingCart className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Aucune commande pour le moment</p>
                <Link to="/client/browse" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                  Explorer les services
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Services recommandés */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Services recommandés</h2>
            
            <div className="space-y-4">
              {recommendedGigs.map(gig => (
                <Link 
                  key={gig.id}
                  to={`/client/gig/${gig.id}`}
                  className="block p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{gig.title}</h3>
                    <span className="text-green-600 font-bold">{gig.price} DH</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="bg-gray-100 px-2 py-1 rounded mr-2">{gig.category}</span>
                    <div className="flex items-center mr-3">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{gig.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>{gig.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaUserCircle className="mr-2" />
                    <span>{gig.freelancer.name}</span>
                  </div>
                </Link>
              ))}
            </div>

            <Link 
              to="/client/browse" 
              className="mt-6 block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium"
            >
              <FaSearch className="inline mr-2" />
              Explorer plus de services
            </Link>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/client/browse" 
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FaSearch className="text-2xl text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Trouver un service</h3>
            <p className="text-gray-600 text-sm">Explorez des milliers de services freelance</p>
          </div>
        </Link>

        <Link 
          to="/client/orders" 
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FaShoppingCart className="text-2xl text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Mes commandes</h3>
            <p className="text-gray-600 text-sm">Suivez vos commandes en cours</p>
          </div>
        </Link>

        <Link 
          to="/client/messages" 
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <FaUserCircle className="text-2xl text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Messagerie</h3>
            <p className="text-gray-600 text-sm">Communiquez avec les freelancers</p>
          </div>
        </Link>
      </div>
    </div>
  );
}