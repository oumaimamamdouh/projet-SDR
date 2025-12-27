
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { FaChartLine, FaShoppingCart, FaMoneyBillWave, FaStar, FaBell } from 'react-icons/fa';

// // // export default function FreelancerDashboard() {
// // //   // Données mockées
// // //   const stats = [
// // //     { label: 'Revenus du mois', value: '$1,250', icon: <FaMoneyBillWave />, color: 'text-green-600 bg-green-100' },
// // //     { label: 'Commandes actives', value: '8', icon: <FaShoppingCart />, color: 'text-blue-600 bg-blue-100' },
// // //     { label: 'Note moyenne', value: '4.9', icon: <FaStar />, color: 'text-yellow-600 bg-yellow-100' },
// // //     { label: 'Vues du profil', value: '245', icon: <FaChartLine />, color: 'text-purple-600 bg-purple-100' },
// // //   ];

// // //   const recentOrders = [
// // //     { id: 'ORD-001', client: 'Sarah Martin', service: 'Site Web', amount: '$450', status: 'En cours', daysLeft: 3 },
// // //     { id: 'ORD-002', client: 'Tech Startup', service: 'App React', amount: '$1,200', status: 'En attente', daysLeft: 5 },
// // //     { id: 'ORD-003', client: 'Restaurant Local', service: 'Site Vitrine', amount: '$300', status: 'Terminé', daysLeft: 0 },
// // //   ];

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 p-6">
// // //       {/* Header */}
// // //       <div className="mb-8">
// // //         <h1 className="text-3xl font-bold text-gray-900">Bonjour, Sadik! 👋</h1>
// // //         <p className="text-gray-600 mt-2">Voici un aperçu de votre activité</p>
// // //       </div>

// // //       {/* Stats Cards */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //         {stats.map((stat, index) => (
// // //           <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// // //             <div className="flex items-center">
// // //               <div className={`p-3 rounded-lg ${stat.color}`}>
// // //                 {stat.icon}
// // //               </div>
// // //               <div className="ml-4">
// // //                 <p className="text-sm text-gray-600">{stat.label}</p>
// // //                 <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// // //         {/* Left Column */}
// // //         <div className="lg:col-span-2">
// // //           {/* Orders Table */}
// // //           <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
// // //             <div className="flex justify-between items-center mb-6">
// // //               <h2 className="text-xl font-bold text-gray-900">Commandes récentes</h2>
// // //               <Link to="/orders" className="text-green-600 hover:text-green-700">
// // //                 Voir toutes →
// // //               </Link>
// // //             </div>
            
// // //             <div className="overflow-x-auto">
// // //               <table className="w-full">
// // //                 <thead>
// // //                   <tr className="border-b border-gray-200">
// // //                     <th className="py-3 text-left text-gray-600">Commande</th>
// // //                     <th className="py-3 text-left text-gray-600">Client</th>
// // //                     <th className="py-3 text-left text-gray-600">Montant</th>
// // //                     <th className="py-3 text-left text-gray-600">Statut</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {recentOrders.map((order) => (
// // //                     <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
// // //                       <td className="py-4">
// // //                         <div>
// // //                           <p className="font-medium">{order.id}</p>
// // //                           <p className="text-sm text-gray-600">{order.service}</p>
// // //                         </div>
// // //                       </td>
// // //                       <td className="py-4">{order.client}</td>
// // //                       <td className="py-4 font-bold">{order.amount}</td>
// // //                       <td className="py-4">
// // //                         <span className={`px-3 py-1 rounded-full text-sm ${
// // //                           order.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
// // //                           order.status === 'Terminé' ? 'bg-green-100 text-green-800' :
// // //                           'bg-yellow-100 text-yellow-800'
// // //                         }`}>
// // //                           {order.status}
// // //                         </span>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </div>

// // //           {/* Quick Actions */}
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //             <Link 
// // //               to="/create-gig"
// // //               className="bg-white border border-gray-300 rounded-xl p-6 text-center hover:border-green-500 hover:shadow-md transition-all"
// // //             >
// // //               <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                 <span className="text-2xl">✨</span>
// // //               </div>
// // //               <h4 className="font-bold text-gray-900 mb-2">Créer un service</h4>
// // //               <p className="text-gray-600 text-sm">Ajoutez un service à votre portfolio</p>
// // //             </Link>

// // //             <Link 
// // //               to="/messages"
// // //               className="bg-white border border-gray-300 rounded-xl p-6 text-center hover:border-green-500 hover:shadow-md transition-all"
// // //             >
// // //               <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                 <FaBell className="text-2xl text-blue-600" />
// // //               </div>
// // //               <h4 className="font-bold text-gray-900 mb-2">Messages</h4>
// // //               <p className="text-gray-600 text-sm">Répondez à vos clients</p>
// // //             </Link>

// // //             <Link 
// // //               to="/profile"
// // //               className="bg-white border border-gray-300 rounded-xl p-6 text-center hover:border-green-500 hover:shadow-md transition-all"
// // //             >
// // //               <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
// // //                 <FaChartLine className="text-2xl text-purple-600" />
// // //               </div>
// // //               <h4 className="font-bold text-gray-900 mb-2">Optimiser</h4>
// // //               <p className="text-gray-600 text-sm">Améliorez votre visibilité</p>
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {/* Right Column */}
// // //         <div className="space-y-6">
// // //           {/* Notifications */}
// // //           <div className="bg-white rounded-xl shadow-sm p-6">
// // //             <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
// // //               <FaBell className="mr-2 text-green-600" />
// // //               Notifications
// // //             </h3>
// // //             <div className="space-y-4">
// // //               <div className="p-3 bg-blue-50 rounded-lg">
// // //                 <p className="font-medium">Nouvelle commande!</p>
// // //                 <p className="text-sm text-gray-600">Mohamed a commandé votre service</p>
// // //               </div>
// // //               <div className="p-3 bg-yellow-50 rounded-lg">
// // //                 <p className="font-medium">Nouvel avis</p>
// // //                 <p className="text-sm text-gray-600">Fatima a donné 5 étoiles</p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Stats */}
// // //           <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
// // //             <h3 className="text-xl font-bold mb-4">Statistiques</h3>
// // //             <div className="space-y-3">
// // //               <div className="flex justify-between">
// // //                 <span>Taux de réponse</span>
// // //                 <span className="font-bold">95%</span>
// // //               </div>
// // //               <div className="flex justify-between">
// // //                 <span>Délai moyen</span>
// // //                 <span className="font-bold">2 jours</span>
// // //               </div>
// // //               <div className="flex justify-between">
// // //                 <span>Satisfaction</span>
// // //                 <span className="font-bold">96%</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Footer Navigation */}
// // //       <div className="mt-8 flex justify-center space-x-4">
// // //         <Link to="/" className="text-gray-600 hover:text-green-600">
// // //           Accueil
// // //         </Link>
// // //         <Link to="/login" className="text-gray-600 hover:text-green-600">
// // //           Déconnexion
// // //         </Link>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from 'react';
// // import { 
// //   FaChartLine, 
// //   FaMoneyBillWave, 
// //   FaShoppingCart, 
// //   FaStar,
// //   FaClock,
// //   FaCheckCircle,
// //   FaExclamationCircle,
// //   FaUserCheck,
// //   FaCalendarAlt,
// //   FaArrowUp,
// //   FaArrowDown,
// //   FaEye,
// //   FaComments,
// //   FaBell,
// //   FaCog,
// //   FaQuestionCircle,
// //   FaThumbsUp,
// //   FaRocket,
// //   FaBullhorn,
// //   FaUsers,
// //   FaGlobe,
// //   FaTrophy,
// //   FaMedal,
// //   FaCrown,
// //   FaHeart,
// //   FaShareAlt,
// //   FaDownload,
// //   FaFilter,
// //   FaSearch,
// //   FaPlus,
// //   FaTimes,
// //   FaEdit,
// //   FaTrash
// // } from 'react-icons/fa';
// // import { Link } from 'react-router-dom';

// // export default function FreelancerDashboard() {
// //   const [timeRange, setTimeRange] = useState('month');
// //   const [activeTab, setActiveTab] = useState('overview');
// //   const [loading, setLoading] = useState(false);

// //   // Données du profil
// //   const profileData = {
// //     name: "Sadik Ho",
// //     title: "Développeur Full-Stack",
// //     level: "Pro Seller",
// //     levelProgress: 85,
// //     rating: 4.9,
// //     totalReviews: 128,
// //     responseRate: "98%",
// //     responseTime: "1h",
// //     completionRate: "100%",
// //     memberSince: "Jan 2024",
// //     earningsThisMonth: 2850,
// //     earningsLastMonth: 2150,
// //     activeOrders: 8,
// //     completedOrders: 42,
// //     gigViews: 1245,
// //     profileViews: 567,
// //     impressions: 8900,
// //     clicks: 245
// //   };

// //   // Statistiques détaillées
// //   const statsData = {
// //     overview: [
// //       { label: 'Revenus ce mois', value: `$${profileData.earningsThisMonth}`, change: '+32%', icon: <FaMoneyBillWave />, color: 'text-green-600 bg-green-100' },
// //       { label: 'Commandes actives', value: profileData.activeOrders, change: '+15%', icon: <FaShoppingCart />, color: 'text-blue-600 bg-blue-100' },
// //       { label: 'Taux de réponse', value: profileData.responseRate, change: '+2%', icon: <FaUserCheck />, color: 'text-purple-600 bg-purple-100' },
// //       { label: 'Vues du profil', value: profileData.profileViews, change: '+45%', icon: <FaEye />, color: 'text-orange-600 bg-orange-100' },
// //     ],
// //     earnings: [
// //       { label: 'Revenus totaux', value: '$12,450', trend: 'up' },
// //       { label: 'Revenus disponibles', value: '$2,850', trend: 'up' },
// //       { label: 'Revenus en attente', value: '$1,200', trend: 'stable' },
// //       { label: 'Frais de service', value: '$450', trend: 'down' },
// //     ],
// //     performance: [
// //       { label: 'Satisfaction client', value: '4.9/5', trend: 'up' },
// //       { label: 'Délai de livraison', value: '2 jours', trend: 'down' },
// //       { label: 'Taux de révision', value: '12%', trend: 'down' },
// //       { label: 'Commandes annulées', value: '1%', trend: 'stable' },
// //     ]
// //   };

// //   // Commandes récentes
// //   const recentOrders = [
// //     {
// //       id: 'ORD-2025-1234',
// //       client: 'Sarah Martin',
// //       service: 'Site Web E-commerce',
// //       amount: 850,
// //       status: 'in_progress',
// //       deadline: '2025-12-28',
// //       progress: 75,
// //       daysLeft: 3,
// //       priority: 'high'
// //     },
// //     {
// //       id: 'ORD-2025-1235',
// //       client: 'Tech Startup Inc',
// //       service: 'Application React Native',
// //       amount: 2200,
// //       status: 'pending',
// //       deadline: '2025-12-30',
// //       progress: 0,
// //       daysLeft: 5,
// //       priority: 'medium'
// //     },
// //     {
// //       id: 'ORD-2025-1236',
// //       client: 'Local Restaurant',
// //       service: 'Site Vitrine WordPress',
// //       amount: 450,
// //       status: 'delivered',
// //       deadline: '2025-12-25',
// //       progress: 100,
// //       daysLeft: 0,
// //       priority: 'low'
// //     },
// //     {
// //       id: 'ORD-2025-1237',
// //       client: 'Fashion Brand',
// //       service: 'Logo Design + Branding',
// //       amount: 299,
// //       status: 'in_progress',
// //       deadline: '2025-12-29',
// //       progress: 40,
// //       daysLeft: 4,
// //       priority: 'high'
// //     },
// //     {
// //       id: 'ORD-2025-1238',
// //       client: 'Education Platform',
// //       service: 'Tutoriel Vidéo',
// //       amount: 650,
// //       status: 'completed',
// //       deadline: '2025-12-24',
// //       progress: 100,
// //       daysLeft: -1,
// //       priority: 'low'
// //     }
// //   ];

// //   // Notifications
// //   const notifications = [
// //     {
// //       id: 1,
// //       type: 'order',
// //       title: 'Nouvelle commande! 🎉',
// //       message: 'Mohamed Ali a commandé votre service "Logo Design Premium"',
// //       time: 'Il y a 2 heures',
// //       unread: true,
// //       priority: 'high'
// //     },
// //     {
// //       id: 2,
// //       type: 'review',
// //       title: 'Nouvel avis 5 étoiles ⭐',
// //       message: 'Fatima Zahra a donné 5 étoiles à votre service "Site Web WordPress"',
// //       time: 'Il y a 1 jour',
// //       unread: true,
// //       priority: 'medium'
// //     },
// //     {
// //       id: 3,
// //       type: 'message',
// //       title: 'Message urgent 📩',
// //       message: 'John Doe vous a envoyé un message concernant la commande ORD-2025-1234',
// //       time: 'Il y a 2 jours',
// //       unread: false,
// //       priority: 'high'
// //     },
// //     {
// //       id: 4,
// //       type: 'tip',
// //       title: 'Conseil de performance 💡',
// //       message: 'Votre taux de réponse est excellent! Continuez ainsi.',
// //       time: 'Il y a 3 jours',
// //       unread: false,
// //       priority: 'low'
// //     }
// //   ];

// //   // Services populaires
// //   const popularGigs = [
// //     {
// //       id: 1,
// //       title: 'Développement Web React/Node.js',
// //       price: 399,
// //       orders: 15,
// //       rating: 4.9,
// //       views: 245,
// //       status: 'active'
// //     },
// //     {
// //       id: 2,
// //       title: 'Logo Design Professionnel',
// //       price: 149,
// //       orders: 42,
// //       rating: 4.7,
// //       views: 512,
// //       status: 'active'
// //     },
// //     {
// //       id: 3,
// //       title: 'Site WordPress E-commerce',
// //       price: 599,
// //       orders: 8,
// //       rating: 4.8,
// //       views: 156,
// //       status: 'active'
// //     }
// //   ];

// //   // Conseils pour améliorer
// //   const improvementTips = [
// //     'Ajoutez plus d\'images à vos services',
// //     'Répondez aux messages dans l\'heure',
// //     'Proposez des révisions illimitées',
// //     'Activez le mode "Disponible maintenant"',
// //     'Ajoutez des vidéos de démonstration',
// //     'Optimisez vos descriptions avec des mots-clés',
// //     'Proposez des packages (Basic/Standard/Premium)',
// //     'Partagez vos services sur les réseaux sociaux'
// //   ];

// //   const getStatusColor = (status) => {
// //     switch(status) {
// //       case 'completed': return 'bg-green-100 text-green-800';
// //       case 'in_progress': return 'bg-blue-100 text-blue-800';
// //       case 'pending': return 'bg-yellow-100 text-yellow-800';
// //       case 'delivered': return 'bg-purple-100 text-purple-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const getStatusText = (status) => {
// //     switch(status) {
// //       case 'completed': return 'Terminé';
// //       case 'in_progress': return 'En cours';
// //       case 'pending': return 'En attente';
// //       case 'delivered': return 'Livré';
// //       default: return status;
// //     }
// //   };

// //   const getPriorityColor = (priority) => {
// //     switch(priority) {
// //       case 'high': return 'text-red-600 bg-red-50 border-red-200';
// //       case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
// //       case 'low': return 'text-green-600 bg-green-50 border-green-200';
// //       default: return 'text-gray-600 bg-gray-50 border-gray-200';
// //     }
// //   };

// //   const calculatePercentageChange = (current, previous) => {
// //     if (previous === 0) return 100;
// //     return ((current - previous) / previous) * 100;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
// //           <p className="mt-6 text-xl font-medium text-gray-700">Chargement de votre dashboard...</p>
// //           <p className="text-gray-500">Préparation de vos statistiques personnalisées</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header avec Quick Stats */}
// //       <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
// //         <div className="container mx-auto px-6 py-8">
// //           <div className="flex flex-col lg:flex-row lg:items-center justify-between">
// //             <div>
// //               <div className="flex items-center mb-4">
// //                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
// //                   <span className="text-2xl font-bold text-green-600">SH</span>
// //                 </div>
// //                 <div>
// //                   <h1 className="text-3xl font-bold">Bonjour, {profileData.name}! 👋</h1>
// //                   <p className="text-green-100">Voici votre tableau de bord personnel</p>
// //                 </div>
// //               </div>
              
// //               {/* Level Badge */}
// //               <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
// //                 <FaCrown className="mr-2 text-yellow-300" />
// //                 <span className="font-bold">{profileData.level}</span>
// //                 <div className="ml-4 w-32 h-2 bg-white/30 rounded-full overflow-hidden">
// //                   <div 
// //                     className="h-full bg-yellow-400 rounded-full" 
// //                     style={{ width: `${profileData.levelProgress}%` }}
// //                   ></div>
// //                 </div>
// //                 <span className="ml-2 text-sm">{profileData.levelProgress}%</span>
// //               </div>
// //             </div>

// //             {/* Quick Stats */}
// //             <div className="mt-6 lg:mt-0 grid grid-cols-2 lg:grid-cols-4 gap-4">
// //               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
// //                 <div className="text-2xl font-bold">${profileData.earningsThisMonth}</div>
// //                 <div className="text-sm text-green-100">Ce mois</div>
// //               </div>
// //               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
// //                 <div className="text-2xl font-bold">{profileData.activeOrders}</div>
// //                 <div className="text-sm text-green-100">Commandes</div>
// //               </div>
// //               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
// //                 <div className="text-2xl font-bold">{profileData.rating}★</div>
// //                 <div className="text-sm text-green-100">Note</div>
// //               </div>
// //               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
// //                 <div className="text-2xl font-bold">{profileData.responseRate}</div>
// //                 <div className="text-sm text-green-100">Réponse</div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Time Range Selector */}
// //       <div className="bg-white border-b">
// //         <div className="container mx-auto px-6">
// //           <div className="flex items-center justify-between py-4">
// //             <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
// //               {['day', 'week', 'month', 'year'].map((range) => (
// //                 <button
// //                   key={range}
// //                   onClick={() => setTimeRange(range)}
// //                   className={`px-4 py-2 rounded-md capitalize ${
// //                     timeRange === range
// //                       ? 'bg-white shadow-sm text-green-600 font-medium'
// //                       : 'text-gray-600 hover:text-gray-900'
// //                   }`}
// //                 >
// //                   {range === 'day' ? 'Aujourd\'hui' : 
// //                    range === 'week' ? 'Cette semaine' : 
// //                    range === 'month' ? 'Ce mois' : 'Cette année'}
// //                 </button>
// //               ))}
// //             </div>
            
// //             <div className="flex items-center space-x-4">
// //               <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
// //                 <FaDownload className="mr-2" />
// //                 Exporter les données
// //               </button>
// //               <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
// //                 <FaShareAlt className="mr-2" />
// //                 Partager
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="container mx-auto px-6 py-8">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Colonne Gauche - Statistiques */}
// //           <div className="lg:col-span-2">
// //             {/* Tab Navigation */}
// //             <div className="flex border-b border-gray-200 mb-8">
// //               {['overview', 'earnings', 'performance', 'analytics'].map((tab) => (
// //                 <button
// //                   key={tab}
// //                   onClick={() => setActiveTab(tab)}
// //                   className={`px-6 py-3 font-medium capitalize ${
// //                     activeTab === tab
// //                       ? 'border-b-2 border-green-500 text-green-600'
// //                       : 'text-gray-600 hover:text-gray-900'
// //                   }`}
// //                 >
// //                   {tab === 'overview' ? 'Vue d\'ensemble' :
// //                    tab === 'earnings' ? 'Revenus' :
// //                    tab === 'performance' ? 'Performance' : 'Analytiques'}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Stats Cards Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //               {statsData[activeTab]?.map((stat, index) => (
// //                 <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <div className={`p-3 rounded-lg ${stat.color}`}>
// //                       {stat.icon}
// //                     </div>
// //                     <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
// //                       stat.change?.startsWith('+') ? 'bg-green-100 text-green-800' :
// //                       stat.change?.startsWith('-') ? 'bg-red-100 text-red-800' :
// //                       'bg-gray-100 text-gray-800'
// //                     }`}>
// //                       {stat.change?.startsWith('+') ? <FaArrowUp className="mr-1" /> :
// //                        stat.change?.startsWith('-') ? <FaArrowDown className="mr-1" /> : null}
// //                       {stat.change}
// //                     </div>
// //                   </div>
// //                   <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
// //                   <div className="text-gray-600">{stat.label}</div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Commandes Récentes */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
// //               <div className="p-6 border-b border-gray-200">
// //                 <div className="flex justify-between items-center">
// //                   <h2 className="text-xl font-bold text-gray-900 flex items-center">
// //                     <FaShoppingCart className="mr-3 text-green-600" />
// //                     Commandes récentes
// //                   </h2>
// //                   <div className="flex items-center space-x-4">
// //                     <button className="text-green-600 hover:text-green-700 font-medium">
// //                       Voir toutes →
// //                     </button>
// //                     <div className="relative">
// //                       <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                       <select className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
// //                         <option>Toutes</option>
// //                         <option>En cours</option>
// //                         <option>En attente</option>
// //                         <option>Terminées</option>
// //                       </select>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="overflow-x-auto">
// //                 <table className="w-full">
// //                   <thead className="bg-gray-50">
// //                     <tr>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                         Commande
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                         Client
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                         Progression
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                         Échéance
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                         Actions
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-gray-200">
// //                     {recentOrders.map((order) => (
// //                       <tr key={order.id} className="hover:bg-gray-50">
// //                         <td className="px-6 py-4">
// //                           <div>
// //                             <div className="flex items-center">
// //                               <div className={`w-3 h-3 rounded-full mr-3 ${
// //                                 order.priority === 'high' ? 'bg-red-500' :
// //                                 order.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
// //                               }`}></div>
// //                               <div>
// //                                 <p className="font-bold text-gray-900">{order.id}</p>
// //                                 <p className="text-sm text-gray-600 truncate max-w-xs">{order.service}</p>
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center mt-2">
// //                               <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
// //                                 {getStatusText(order.status)}
// //                               </span>
// //                               <span className="ml-3 font-bold text-gray-900">${order.amount}</span>
// //                             </div>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className="flex items-center">
// //                             <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
// //                               {order.client.charAt(0)}
// //                             </div>
// //                             <span className="font-medium text-gray-900">{order.client}</span>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className="w-full">
// //                             <div className="flex justify-between text-sm mb-1">
// //                               <span className="text-gray-700">{order.progress}%</span>
// //                               <span className="text-gray-500">{order.daysLeft} jours</span>
// //                             </div>
// //                             <div className="w-full bg-gray-200 rounded-full h-2">
// //                               <div 
// //                                 className={`h-full rounded-full ${
// //                                   order.status === 'completed' ? 'bg-green-500' :
// //                                   order.status === 'in_progress' ? 'bg-blue-500' :
// //                                   'bg-yellow-500'
// //                                 }`}
// //                                 style={{ width: `${order.progress}%` }}
// //                               ></div>
// //                             </div>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className={`flex items-center px-4 py-2 rounded-lg border ${
// //                             order.daysLeft <= 2 ? 'bg-red-50 text-red-700 border-red-200' :
// //                             order.daysLeft <= 5 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
// //                             'bg-green-50 text-green-700 border-green-200'
// //                           }`}>
// //                             <FaCalendarAlt className="mr-2" />
// //                             <span className="font-medium">{order.daysLeft} jour{order.daysLeft !== 1 ? 's' : ''}</span>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className="flex space-x-2">
// //                             <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium">
// //                               Travailler
// //                             </button>
// //                             <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
// //                               <FaComments />
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               {recentOrders.length === 0 && (
// //                 <div className="p-12 text-center">
// //                   <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
// //                     <FaShoppingCart className="text-3xl text-gray-400" />
// //                   </div>
// //                   <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune commande récente</h3>
// //                   <p className="text-gray-600 mb-6">Les commandes que vous recevez apparaîtront ici.</p>
// //                   <Link 
// //                     to="/freelancer/gigs"
// //                     className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
// //                   >
// //                     <FaBullhorn className="mr-2" />
// //                     Promouvoir mes services
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Services Populaires */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //               <div className="flex justify-between items-center mb-6">
// //                 <h2 className="text-xl font-bold text-gray-900">Services populaires</h2>
// //                 <Link to="/freelancer/gigs" className="text-green-600 hover:text-green-700 font-medium">
// //                   Gérer tous les services →
// //                 </Link>
// //               </div>
              
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                 {popularGigs.map((gig) => (
// //                   <div key={gig.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-sm transition-all">
// //                     <div className="flex justify-between items-start mb-3">
// //                       <h3 className="font-bold text-gray-900 line-clamp-2">{gig.title}</h3>
// //                       <span className="text-2xl font-bold text-green-600">${gig.price}</span>
// //                     </div>
                    
// //                     <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
// //                       <div className="flex items-center">
// //                         <FaShoppingCart className="mr-2" />
// //                         {gig.orders} commandes
// //                       </div>
// //                       <div className="flex items-center">
// //                         <FaStar className="text-yellow-400 mr-1" />
// //                         {gig.rating}
// //                       </div>
// //                     </div>
                    
// //                     <div className="flex space-x-2">
// //                       <Link 
// //                         to={`/freelancer/gigs/edit/${gig.id}`}
// //                         className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-center hover:bg-gray-200"
// //                       >
// //                         <FaEdit className="inline mr-2" />
// //                         Modifier
// //                       </Link>
// //                       <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
// //                         <FaRocket />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               <div className="mt-6 pt-6 border-t border-gray-200">
// //                 <Link 
// //                   to="/freelancer/gigs/create"
// //                   className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 flex items-center justify-center"
// //                 >
// //                   <FaPlus className="mr-2" />
// //                   Créer un nouveau service
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Colonne Droite - Sidebar */}
// //           <div className="space-y-8">
// //             {/* Notifications */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //               <div className="p-6 border-b border-gray-200">
// //                 <div className="flex justify-between items-center">
// //                   <h2 className="text-xl font-bold text-gray-900 flex items-center">
// //                     <FaBell className="mr-3 text-green-600" />
// //                     Notifications
// //                     {notifications.filter(n => n.unread).length > 0 && (
// //                       <span className="ml-3 bg-red-500 text-white text-xs rounded-full px-2 py-1">
// //                         {notifications.filter(n => n.unread).length} nouveau
// //                       </span>
// //                     )}
// //                   </h2>
// //                   <button className="text-green-600 hover:text-green-700 font-medium text-sm">
// //                     Tout marquer comme lu
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
// //                 {notifications.map((notification) => (
// //                   <div 
// //                     key={notification.id} 
// //                     className={`p-4 hover:bg-gray-50 transition-colors ${
// //                       notification.unread ? 'bg-blue-50' : ''
// //                     }`}
// //                   >
// //                     <div className="flex">
// //                       <div className="flex-shrink-0">
// //                         <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
// //                           notification.type === 'order' ? 'bg-green-100' :
// //                           notification.type === 'review' ? 'bg-yellow-100' :
// //                           notification.type === 'message' ? 'bg-blue-100' : 'bg-purple-100'
// //                         }`}>
// //                           {notification.type === 'order' && '🎉'}
// //                           {notification.type === 'review' && '⭐'}
// //                           {notification.type === 'message' && '📩'}
// //                           {notification.type === 'tip' && '💡'}
// //                         </div>
// //                       </div>
// //                       <div className="ml-4 flex-1">
// //                         <div className="flex justify-between items-start">
// //                           <h4 className="font-bold text-gray-900">{notification.title}</h4>
// //                           <div className="flex items-center space-x-2">
// //                             {notification.unread && (
// //                               <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
// //                             )}
// //                             <span className={`text-xs px-2 py-1 rounded-full ${
// //                               notification.priority === 'high' ? 'bg-red-100 text-red-800' :
// //                               notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
// //                               'bg-green-100 text-green-800'
// //                             }`}>
// //                               {notification.priority === 'high' ? 'Urgent' : 
// //                                notification.priority === 'medium' ? 'Moyen' : 'Bas'}
// //                             </span>
// //                           </div>
// //                         </div>
// //                         <p className="text-gray-600 mt-1">{notification.message}</p>
// //                         <div className="flex justify-between items-center mt-3">
// //                           <span className="text-xs text-gray-500">{notification.time}</span>
// //                           <div className="flex space-x-2">
// //                             <button className="text-green-600 hover:text-green-700 text-sm font-medium">
// //                               Voir
// //                             </button>
// //                             <button className="text-gray-400 hover:text-gray-600">
// //                               <FaTimes />
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {notifications.length === 0 && (
// //                 <div className="p-8 text-center">
// //                   <FaBell className="text-4xl text-gray-300 mx-auto mb-4" />
// //                   <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune notification</h3>
// //                   <p className="text-gray-600">Vous serez notifié de nouvelles activités.</p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Quick Actions */}
// //             <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
// //               <h3 className="text-xl font-bold mb-6 flex items-center">
// //                 <FaRocket className="mr-3" />
// //                 Actions rapides
// //               </h3>
// //               <div className="space-y-4">
// //                 <Link 
// //                   to="/freelancer/gigs/create"
// //                   className="flex items-center justify-between bg-white/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 transition-all"
// //                 >
// //                   <div className="flex items-center">
// //                     <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4">
// //                       <FaPlus className="text-blue-600" />
// //                     </div>
// //                     <div>
// //                       <div className="font-medium">Créer un service</div>
// //                       <div className="text-sm opacity-90">Ajoutez un nouveau service</div>
// //                     </div>
// //                   </div>
// //                   <FaArrowUp className="transform rotate-45" />
// //                 </Link>

// //                 <Link 
// //                   to="/freelancer/messages"
// //                   className="flex items-center justify-between bg-white/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 transition-all"
// //                 >
// //                   <div className="flex items-center">
// //                     <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4">
// //                       <FaComments className="text-blue-600" />
// //                     </div>
// //                     <div>
// //                       <div className="font-medium">Répondre aux messages</div>
// //                       <div className="text-sm opacity-90">3 messages en attente</div>
// //                     </div>
// //                   </div>
// //                   <FaArrowUp className="transform rotate-45" />
// //                 </Link>

// //                 <Link 
// //                   to="/freelancer/profile"
// //                   className="flex items-center justify-between bg-white/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 transition-all"
// //                 >
// //                   <div className="flex items-center">
// //                     <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4">
// //                       <FaUserCheck className="text-blue-600" />
// //                     </div>
// //                     <div>
// //                       <div className="font-medium">Optimiser le profil</div>
// //                       <div className="text-sm opacity-90">Complétez votre profil</div>
// //                     </div>
// //                   </div>
// //                   <FaArrowUp className="transform rotate-45" />
// //                 </Link>
// //               </div>
// //             </div>

// //             {/* Performance Stats */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
// //                 <FaChartLine className="mr-3 text-green-600" />
// //                 Performance
// //               </h3>
              
// //               <div className="space-y-6">
// //                 {/* Response Rate */}
// //                 <div>
// //                   <div className="flex justify-between mb-2">
// //                     <span className="text-gray-700">Taux de réponse</span>
// //                     <span className="font-bold text-green-600">{profileData.responseRate}</span>
// //                   </div>
// //                   <div className="w-full bg-gray-200 rounded-full h-2">
// //                     <div className="w-11/12 h-full bg-green-500 rounded-full"></div>
// //                   </div>
// //                 </div>

// //                 {/* Delivery Time */}
// //                 <div>
// //                   <div className="flex justify-between mb-2">
// //                     <span className="text-gray-700">Temps de réponse moyen</span>
// //                     <span className="font-bold text-green-600">{profileData.responseTime}</span>
// //                   </div>
// //                   <div className="w-full bg-gray-200 rounded-full h-2">
// //                     <div className="w-9/12 h-full bg-blue-500 rounded-full"></div>
// //                   </div>
// //                 </div>

// //                 {/* Order Completion */}
// //                 <div>
// //                   <div className="flex justify-between mb-2">
// //                     <span className="text-gray-700">Commandes terminées</span>
// //                     <span className="font-bold text-green-600">{profileData.completionRate}</span>
// //                   </div>
// //                   <div className="w-full bg-gray-200 rounded-full h-2">
// //                     <div className="w-full h-full bg-purple-500 rounded-full"></div>
// //                   </div>
// //                 </div>

// //                 {/* Client Satisfaction */}
// //                 <div>
// //                   <div className="flex justify-between mb-2">
// //                     <span className="text-gray-700">Satisfaction client</span>
// //                     <div className="flex items-center">
// //                       <FaStar className="text-yellow-400 mr-1" />
// //                       <span className="font-bold text-gray-900">{profileData.rating}</span>
// //                       <span className="text-gray-500 ml-1">({profileData.totalReviews})</span>
// //                     </div>
// //                   </div>
// //                   <div className="w-full bg-gray-200 rounded-full h-2">
// //                     <div className="w-12/12 h-full bg-yellow-500 rounded-full"></div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="mt-6 pt-6 border-t border-gray-200">
// //                 <div className="text-center">
// //                   <div className="text-sm text-gray-600 mb-2">Niveau actuel</div>
// //                   <div className="flex items-center justify-center">
// //                     <FaMedal className="text-yellow-500 text-2xl mr-2" />
// //                     <span className="text-lg font-bold text-gray-900">{profileData.level}</span>
// //                   </div>
// //                   <div className="text-xs text-gray-500 mt-2">Prochain niveau: Top Rated</div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Improvement Tips */}
// //             <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
// //               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
// //                 <FaThumbsUp className="mr-3 text-amber-600" />
// //                 Conseils pour améliorer
// //               </h3>
              
// //               <ul className="space-y-3">
// //                 {improvementTips.slice(0, 4).map((tip, index) => (
// //                   <li key={index} className="flex items-start">
// //                     <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
// //                     <span className="text-gray-700 text-sm">{tip}</span>
// //                   </li>
// //                 ))}
// //               </ul>
              
// //               <button className="mt-6 w-full bg-amber-100 text-amber-800 hover:bg-amber-200 font-medium py-3 rounded-lg transition-colors">
// //                 Voir tous les conseils
// //               </button>
// //             </div>

// //             {/* Support & Resources */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
// //               <h3 className="text-lg font-bold text-gray-900 mb-4">Support & Ressources</h3>
              
// //               <div className="space-y-4">
// //                 <a href="#" className="flex items-center text-gray-700 hover:text-green-600 p-2 hover:bg-gray-50 rounded-lg">
// //                   <FaQuestionCircle className="mr-3 text-gray-400" />
// //                   <span>Centre d'aide</span>
// //                 </a>
// //                 <a href="#" className="flex items-center text-gray-700 hover:text-green-600 p-2 hover:bg-gray-50 rounded-lg">
// //                   <FaUsers className="mr-3 text-gray-400" />
// //                   <span>Communauté</span>
// //                 </a>
// //                 <a href="#" className="flex items-center text-gray-700 hover:text-green-600 p-2 hover:bg-gray-50 rounded-lg">
// //                   <FaGlobe className="mr-3 text-gray-400" />
// //                   <span>Blog</span>
// //                 </a>
// //                 <a href="#" className="flex items-center text-gray-700 hover:text-green-600 p-2 hover:bg-gray-50 rounded-lg">
// //                   <FaCog className="mr-3 text-gray-400" />
// //                   <span>Paramètres</span>
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bottom Banner */}
// //         <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
// //           <div className="flex flex-col md:flex-row md:items-center justify-between">
// //             <div>
// //               <h3 className="text-2xl font-bold mb-3">Passez au niveau supérieur! 🚀</h3>
// //               <p className="opacity-90">Débloquez des fonctionnalités premium et augmentez vos revenus</p>
// //             </div>
// //             <button className="mt-4 md:mt-0 bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
// //               Voir les plans Premium
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaChartLine, 
//   FaMoneyBill, 
//   FaShoppingCart, 
//   FaStar, 
//   FaEye,
//   FaCalendarAlt,
//   FaArrowUp,
//   FaArrowDown,
//   FaPlus
// } from 'react-icons/fa';
// import { useAuth } from '../../hooks/useAuth';
// import styles from './Dashboard.module.css';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     earnings: { current: 2450, previous: 1800, change: '+36%' },
//     orders: { current: 12, previous: 8, change: '+50%' },
//     rating: { current: 4.8, previous: 4.5, change: '+0.3' },
//     views: { current: 1245, previous: 890, change: '+40%' }
//   });

//   const [recentOrders, setRecentOrders] = useState([
//     { id: 1, client: 'John Doe', gig: 'Site Web WordPress', amount: 500, status: 'active', date: '2024-12-20' },
//     { id: 2, client: 'Jane Smith', gig: 'Logo Design', amount: 200, status: 'completed', date: '2024-12-18' },
//     { id: 3, client: 'Bob Wilson', gig: 'SEO Optimization', amount: 300, status: 'pending', date: '2024-12-15' },
//   ]);

//   const [gigPerformance, setGigPerformance] = useState([
//     { name: 'Site Web WordPress', views: 245, orders: 12, conversion: 4.9 },
//     { name: 'Logo Design', views: 189, orders: 8, conversion: 4.2 },
//     { name: 'SEO Optimization', views: 156, orders: 5, conversion: 3.2 },
//     { name: 'Social Media Management', views: 98, orders: 3, conversion: 3.1 },
//   ]);

//   // Simuler le chargement des données
//   useEffect(() => {
//     // Ici tu ferais tes appels API
//     // fetchStats(), fetchRecentOrders(), etc.
//   }, []);

//   return (
//     <div className={styles.dashboard}>
//       {/* Welcome Section */}
//       <div className={styles.welcomeSection}>
//         <div>
//           <h1 className={styles.welcomeTitle}>
//             Bonjour, {user?.full_name?.split(' ')[0] || user?.username} 👋
//           </h1>
//           <p className={styles.welcomeSubtitle}>
//             Voici un aperçu de votre activité cette semaine
//           </p>
//         </div>
//         <Link to="/freelancer/gigs/create" className={styles.createButton}>
//           <FaPlus /> Créer un nouveau service
//         </Link>
//       </div>

//       {/* Stats Cards */}
//       <div className={styles.statsGrid}>
//         {Object.entries(stats).map(([key, data]) => (
//           <div key={key} className={styles.statCard}>
//             <div className={styles.statHeader}>
//               <div className={styles.statIcon}>
//                 {key === 'earnings' && <FaMoneyBill />}
//                 {key === 'orders' && <FaShoppingCart />}
//                 {key === 'rating' && <FaStar />}
//                 {key === 'views' && <FaEye />}
//               </div>
//               <div className={styles.statChange}>
//                 {data.change.startsWith('+') ? (
//                   <FaArrowUp className={styles.changeUp} />
//                 ) : (
//                   <FaArrowDown className={styles.changeDown} />
//                 )}
//                 <span className={data.change.startsWith('+') ? styles.changeUp : styles.changeDown}>
//                   {data.change}
//                 </span>
//               </div>
//             </div>
//             <div className={styles.statValue}>
//               {key === 'earnings' && '$'}
//               {data.current.toLocaleString()}
//               {key === 'rating' && '/5'}
//             </div>
//             <div className={styles.statLabel}>
//               {key === 'earnings' && 'Revenus totaux'}
//               {key === 'orders' && 'Commandes actives'}
//               {key === 'rating' && 'Note moyenne'}
//               {key === 'views' && 'Vues de profil'}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts and Performance */}
//       <div className={styles.contentGrid}>
//         {/* Recent Orders */}
//         <div className={styles.card}>
//           <div className={styles.cardHeader}>
//             <h3 className={styles.cardTitle}>
//               <FaShoppingCart /> Commandes récentes
//             </h3>
//             <Link to="/freelancer/orders" className={styles.viewAll}>
//               Voir tout →
//             </Link>
//           </div>
//           <div className={styles.tableContainer}>
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   <th>Client</th>
//                   <th>Service</th>
//                   <th>Montant</th>
//                   <th>Statut</th>
//                   <th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentOrders.map((order) => (
//                   <tr key={order.id}>
//                     <td className={styles.clientCell}>
//                       <div className={styles.clientAvatar}>
//                         {order.client.charAt(0)}
//                       </div>
//                       {order.client}
//                     </td>
//                     <td>{order.gig}</td>
//                     <td className={styles.amountCell}>${order.amount}</td>
//                     <td>
//                       <span className={`${styles.statusBadge} ${styles[order.status]}`}>
//                         {order.status === 'active' && 'Actif'}
//                         {order.status === 'completed' && 'Terminé'}
//                         {order.status === 'pending' && 'En attente'}
//                       </span>
//                     </td>
//                     <td className={styles.dateCell}>
//                       <FaCalendarAlt /> {order.date}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Gig Performance */}
//         <div className={styles.card}>
//           <div className={styles.cardHeader}>
//             <h3 className={styles.cardTitle}>
//               <FaChartLine /> Performance des services
//             </h3>
//           </div>
//           <div className={styles.performanceList}>
//             {gigPerformance.map((gig, index) => (
//               <div key={index} className={styles.performanceItem}>
//                 <div className={styles.gigInfo}>
//                   <div className={styles.gigName}>{gig.name}</div>
//                   <div className={styles.gigStats}>
//                     <span className={styles.stat}>
//                       <FaEye /> {gig.views} vues
//                     </span>
//                     <span className={styles.stat}>
//                       <FaShoppingCart /> {gig.orders} commandes
//                     </span>
//                   </div>
//                 </div>
//                 <div className={styles.conversionRate}>
//                   <div className={styles.rateValue}>
//                     {gig.conversion}%
//                   </div>
//                   <div className={styles.rateLabel}>Taux de conversion</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className={styles.quickActions}>
//         <h3 className={styles.sectionTitle}>Actions rapides</h3>
//         <div className={styles.actionsGrid}>
//           <Link to="/freelancer/gigs/create" className={styles.actionCard}>
//             <div className={styles.actionIcon}>➕</div>
//             <div className={styles.actionTitle}>Créer un service</div>
//             <div className={styles.actionDescription}>
//               Ajoutez un nouveau service à votre portfolio
//             </div>
//           </Link>
          
//           <Link to="/freelancer/messages" className={styles.actionCard}>
//             <div className={styles.actionIcon}>💬</div>
//             <div className={styles.actionTitle}>Vérifier les messages</div>
//             <div className={styles.actionDescription}>
//               Répondez aux questions des clients
//             </div>
//           </Link>
          
//           <Link to="/freelancer/profile/edit" className={styles.actionCard}>
//             <div className={styles.actionIcon}>👤</div>
//             <div className={styles.actionTitle}>Mettre à jour le profil</div>
//             <div className={styles.actionDescription}>
//               Améliorez votre visibilité
//             </div>
//           </Link>
          
//           <Link to="/freelancer/analytics" className={styles.actionCard}>
//             <div className={styles.actionIcon}>📊</div>
//             <div className={styles.actionTitle}>Voir les statistiques</div>
//             <div className={styles.actionDescription}>
//               Analysez votre performance
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChartLine, 
  FaMoneyBill, 
  FaShoppingCart, 
  FaStar, 
  FaArrowUp,
  FaCalendarAlt,
  FaEye,
  FaPlus
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import StatsCard from '../../components/features/StatsCard';
import GigCard from '../../components/features/GigCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    earnings: { value: '2,450 DH', change: '+36%', icon: <FaMoneyBill />, label: 'Revenus' },
    orders: { value: '12', change: '+50%', icon: <FaShoppingCart />, label: 'Commandes' },
    rating: { value: '4.8/5', change: '+0.3', icon: <FaStar />, label: 'Note' },
    views: { value: '1,245', change: '+40%', icon: <FaEye />, label: 'Vues' }
  });

  const [recentGigs] = useState([
    { id: 1, title: 'Site Web WordPress', price: '1,500 DH', orders: 12, rating: 4.8, status: 'active' },
    { id: 2, title: 'Logo Design Pro', price: '500 DH', orders: 8, rating: 4.9, status: 'active' },
    { id: 3, title: 'SEO Optimization', price: '800 DH', orders: 5, rating: 4.7, status: 'pending' },
  ]);

  const [recentOrders] = useState([
    { id: 1, client: 'John Doe', service: 'Site Web', amount: '1,500 DH', status: 'en cours', date: '20 Déc' },
    { id: 2, client: 'Jane Smith', service: 'Logo Design', amount: '500 DH', status: 'terminé', date: '18 Déc' },
    { id: 3, client: 'Bob Wilson', service: 'SEO', amount: '800 DH', status: 'en attente', date: '15 Déc' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {user?.full_name?.split(' ')[0] || user?.username} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Voici un aperçu de votre activité cette semaine
          </p>
        </div>
        
        <Link
          to="/freelancer/create-gig"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Créer un service
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, stat]) => (
          <StatsCard key={key} stat={stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Gigs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Mes Services</h2>
              <Link to="/freelancer/my-gigs" className="text-green-600 hover:text-green-700 text-sm font-medium">
                Voir tout →
              </Link>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {recentGigs.map((gig) => (
              <div key={gig.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{gig.title}</h3>
                  <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                    <span>{gig.price}</span>
                    <span>•</span>
                    <span>{gig.orders} commandes</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      {gig.rating}
                    </span>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  gig.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {gig.status === 'active' ? 'Actif' : 'En attente'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Commandes récentes</h2>
              <Link to="/freelancer/orders" className="text-green-600 hover:text-green-700 text-sm font-medium">
                Voir tout →
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.client}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {order.service}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'terminé' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'en cours'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aperçu rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-500">Services actifs</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">92%</div>
            <div className="text-sm text-gray-500">Taux de réponse</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">24h</div>
            <div className="text-sm text-gray-500">Délai moyen</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-500">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;