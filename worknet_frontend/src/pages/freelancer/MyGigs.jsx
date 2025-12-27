// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { FaEdit, FaTrash, FaEye, FaPlus, FaFilter, FaSearch } from 'react-icons/fa';

// // export default function MyGigs() {
// //   const [gigs, setGigs] = useState([
// //     {
// //       id: '1',
// //       title: 'Développement Web React/Node.js',
// //       description: 'Création de site web moderne avec React frontend et Node.js backend',
// //       price: 399,
// //       status: 'active',
// //       orders: 15,
// //       rating: 4.9,
// //       image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop',
// //       views: 245
// //     },
// //     {
// //       id: '2',
// //       title: 'Logo Design Professionnel',
// //       description: 'Création de logo unique pour votre entreprise. 3 concepts différents',
// //       price: 150,
// //       status: 'active',
// //       orders: 42,
// //       rating: 4.7,
// //       image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&auto=format',
// //       views: 512
// //     },
// //     {
// //       id: '3',
// //       title: 'Site WordPress E-commerce',
// //       description: 'Boutique en ligne WordPress avec WooCommerce et paiement sécurisé',
// //       price: 599,
// //       status: 'draft',
// //       orders: 0,
// //       rating: 0,
// //       image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format',
// //       views: 89
// //     },
// //     {
// //       id: '4',
// //       title: 'Application Mobile Flutter',
// //       description: 'Développement d\'application mobile cross-platform avec Flutter',
// //       price: 899,
// //       status: 'paused',
// //       orders: 8,
// //       rating: 4.8,
// //       image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&auto=format',
// //       views: 156
// //     }
// //   ]);

// //   const [filter, setFilter] = useState('all');
// //   const [search, setSearch] = useState('');

// //   const filteredGigs = gigs.filter(gig => {
// //     const matchesFilter = filter === 'all' || gig.status === filter;
// //     const matchesSearch = gig.title.toLowerCase().includes(search.toLowerCase()) ||
// //                          gig.description.toLowerCase().includes(search.toLowerCase());
// //     return matchesFilter && matchesSearch;
// //   });

// //   const deleteGig = (id) => {
// //     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service?')) {
// //       setGigs(gigs.filter(gig => gig.id !== id));
// //     }
// //   };

// //   const toggleStatus = (id) => {
// //     setGigs(gigs.map(gig => {
// //       if (gig.id === id) {
// //         return {
// //           ...gig,
// //           status: gig.status === 'active' ? 'paused' : 'active'
// //         };
// //       }
// //       return gig;
// //     }));
// //   };

// //   const getStatusColor = (status) => {
// //     switch(status) {
// //       case 'active': return 'bg-green-100 text-green-800';
// //       case 'paused': return 'bg-yellow-100 text-yellow-800';
// //       case 'draft': return 'bg-gray-100 text-gray-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const getStatusText = (status) => {
// //     switch(status) {
// //       case 'active': return 'Actif';
// //       case 'paused': return 'En pause';
// //       case 'draft': return 'Brouillon';
// //       default: return status;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       {/* Header */}
// //       <div className="mb-8">
// //         <div className="flex justify-between items-center">
// //           <div>
// //             <h1 className="text-3xl font-bold text-gray-900">Mes Services</h1>
// //             <p className="text-gray-600 mt-2">Gérez tous vos services freelance</p>
// //           </div>
// //           <Link
// //             to="/freelancer/gigs/create"
// //             className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
// //           >
// //             <FaPlus className="mr-2" />
// //             Créer un nouveau service
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Stats */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
// //         <div className="bg-white rounded-xl p-6 border border-gray-200">
// //           <div className="text-2xl font-bold text-gray-900">{gigs.length}</div>
// //           <div className="text-gray-600">Services au total</div>
// //         </div>
// //         <div className="bg-white rounded-xl p-6 border border-gray-200">
// //           <div className="text-2xl font-bold text-green-600">
// //             {gigs.filter(g => g.status === 'active').length}
// //           </div>
// //           <div className="text-gray-600">Services actifs</div>
// //         </div>
// //         <div className="bg-white rounded-xl p-6 border border-gray-200">
// //           <div className="text-2xl font-bold text-gray-900">
// //             {gigs.reduce((sum, gig) => sum + gig.orders, 0)}
// //           </div>
// //           <div className="text-gray-600">Commandes totales</div>
// //         </div>
// //         <div className="bg-white rounded-xl p-6 border border-gray-200">
// //           <div className="text-2xl font-bold text-gray-900">
// //             {gigs.reduce((sum, gig) => sum + gig.views, 0)}
// //           </div>
// //           <div className="text-gray-600">Vues totales</div>
// //         </div>
// //       </div>

// //       {/* Filters and Search */}
// //       <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
// //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
// //           {/* Search */}
// //           <div className="relative flex-1">
// //             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Rechercher un service..."
// //               className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //             />
// //           </div>

// //           {/* Filters */}
// //           <div className="flex items-center space-x-4">
// //             <FaFilter className="text-gray-500" />
// //             <div className="flex space-x-2">
// //               {[
// //                 { value: 'all', label: 'Tous' },
// //                 { value: 'active', label: 'Actifs' },
// //                 { value: 'paused', label: 'En pause' },
// //                 { value: 'draft', label: 'Brouillons' }
// //               ].map(filterOption => (
// //                 <button
// //                   key={filterOption.value}
// //                   onClick={() => setFilter(filterOption.value)}
// //                   className={`px-4 py-2 rounded-lg transition-colors ${
// //                     filter === filterOption.value
// //                       ? 'bg-green-600 text-white'
// //                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// //                   }`}
// //                 >
// //                   {filterOption.label}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Gig List */}
// //       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
// //         {filteredGigs.length === 0 ? (
// //           <div className="p-12 text-center">
// //             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
// //               <FaPlus className="text-3xl text-gray-400" />
// //             </div>
// //             <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun service trouvé</h3>
// //             <p className="text-gray-600 mb-6">Créez votre premier service pour commencer à recevoir des commandes</p>
// //             <Link
// //               to="/freelancer/gigs/create"
// //               className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
// //             >
// //               <FaPlus className="mr-2" />
// //               Créer un service
// //             </Link>
// //           </div>
// //         ) : (
// //           <div className="divide-y divide-gray-200">
// //             {filteredGigs.map(gig => (
// //               <div key={gig.id} className="p-6 hover:bg-gray-50">
// //                 <div className="flex flex-col md:flex-row md:items-center gap-6">
// //                   {/* Image */}
// //                   <div className="md:w-48 flex-shrink-0">
// //                     <div className="relative aspect-video rounded-lg overflow-hidden">
// //                       <img
// //                         src={gig.image}
// //                         alt={gig.title}
// //                         className="w-full h-full object-cover"
// //                       />
// //                       <div className="absolute top-3 left-3">
// //                         <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(gig.status)}`}>
// //                           {getStatusText(gig.status)}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Content */}
// //                   <div className="flex-1">
// //                     <div className="flex justify-between items-start">
// //                       <div>
// //                         <h3 className="text-xl font-bold text-gray-900">{gig.title}</h3>
// //                         <p className="text-gray-600 mt-2 line-clamp-2">{gig.description}</p>
// //                       </div>
// //                       <div className="text-right">
// //                         <div className="text-2xl font-bold text-gray-900">${gig.price}</div>
// //                         <div className="text-sm text-gray-600">À partir de</div>
// //                       </div>
// //                     </div>

// //                     {/* Stats */}
// //                     <div className="flex flex-wrap gap-6 mt-4 text-sm">
// //                       <div className="flex items-center">
// //                         <FaEye className="text-gray-400 mr-2" />
// //                         <span className="text-gray-700">{gig.views} vues</span>
// //                       </div>
// //                       <div className="flex items-center">
// //                         <span className="text-gray-700">{gig.orders} commandes</span>
// //                       </div>
// //                       <div className="flex items-center">
// //                         <FaSearch className="text-yellow-400 mr-1" />
// //                         <span className="text-gray-700">{gig.rating.toFixed(1)}</span>
// //                         <span className="text-gray-500 ml-1">({gig.orders} avis)</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Actions */}
// //                   <div className="flex space-x-3">
// //                     <button
// //                       onClick={() => toggleStatus(gig.id)}
// //                       className={`px-4 py-2 rounded-lg font-medium ${
// //                         gig.status === 'active'
// //                           ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
// //                           : 'bg-green-100 text-green-800 hover:bg-green-200'
// //                       }`}
// //                     >
// //                       {gig.status === 'active' ? 'Mettre en pause' : 'Activer'}
// //                     </button>
// //                     <Link
// //                       to={`/freelancer/gigs/edit/${gig.id}`}
// //                       className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 rounded-lg font-medium flex items-center"
// //                     >
// //                       <FaEdit className="mr-2" />
// //                       Modifier
// //                     </Link>
// //                     <button
// //                       onClick={() => deleteGig(gig.id)}
// //                       className="bg-red-100 text-red-800 hover:bg-red-200 px-4 py-2 rounded-lg font-medium flex items-center"
// //                     >
// //                       <FaTrash className="mr-2" />
// //                       Supprimer
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* Tips */}
// //       <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
// //         <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Conseils pour optimiser vos services</h3>
// //         <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <li className="flex items-start">
// //             <span className="text-green-600 font-bold mr-2">•</span>
// //             <span className="text-gray-700">Ajoutez des images de haute qualité</span>
// //           </li>
// //           <li className="flex items-start">
// //             <span className="text-green-600 font-bold mr-2">•</span>
// //             <span className="text-gray-700">Optimisez vos descriptions avec des mots-clés</span>
// //           </li>
// //           <li className="flex items-start">
// //             <span className="text-green-600 font-bold mr-2">•</span>
// //             <span className="text-gray-700">Répondez rapidement aux messages</span>
// //           </li>
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaPlus, 
//   FaEdit, 
//   FaTrash, 
//   FaEye, 
//   FaChartLine,
//   FaShoppingCart,
//   FaStar,
//   FaClock,
//   FaFilter,
//   FaSearch
// } from 'react-icons/fa';
// import gigService from '../../services/gigService';

// export default function MyGigs() {
//   const [gigs, setGigs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     loadMyGigs();
//   }, []);

//   const loadMyGigs = async () => {
//     try {
//       setLoading(true);
//       const response = await gigService.getMyGigs();
//       setGigs(response.data?.gigs || []);
//     } catch (error) {
//       console.error('Error loading gigs:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteGig = async (gigId) => {
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
//       try {
//         await gigService.deleteGig(gigId);
//         setGigs(gigs.filter(gig => gig._id !== gigId));
//       } catch (error) {
//         console.error('Error deleting gig:', error);
//       }
//     }
//   };

//   const filteredGigs = gigs.filter(gig => {
//     if (filter === 'all') return true;
//     if (filter === 'active') return gig.status === 'active';
//     if (filter === 'draft') return gig.status === 'draft';
//     if (filter === 'paused') return gig.status === 'paused';
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* En-tête */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Mes services</h1>
//           <p className="text-gray-600 mt-2">
//             Gérez et suivez la performance de vos services
//           </p>
//         </div>
//         <Link
//           to="/freelancer/create-gig"
//           className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium flex items-center"
//         >
//           <FaPlus className="mr-2" />
//           Nouveau service
//         </Link>
//       </div>

//       {/* Filtres et statistiques */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//           <div className="flex space-x-4 mb-4 md:mb-0">
//             <button
//               onClick={() => setFilter('all')}
//               className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//             >
//               Tous ({gigs.length})
//             </button>
//             <button
//               onClick={() => setFilter('active')}
//               className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//             >
//               Actifs ({gigs.filter(g => g.status === 'active').length})
//             </button>
//             <button
//               onClick={() => setFilter('draft')}
//               className={`px-4 py-2 rounded-lg ${filter === 'draft' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//             >
//               Brouillons ({gigs.filter(g => g.status === 'draft').length})
//             </button>
//             <button
//               onClick={() => setFilter('paused')}
//               className={`px-4 py-2 rounded-lg ${filter === 'paused' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//             >
//               En pause ({gigs.filter(g => g.status === 'paused').length})
//             </button>
//           </div>
          
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Rechercher un service..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>

//         {/* Statistiques globales */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 rounded-lg mr-3">
//                 <FaShoppingCart className="text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Commandes totales</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {gigs.reduce((sum, gig) => sum + (gig.total_orders || 0), 0)}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-green-50 p-4 rounded-lg">
//             <div className="flex items-center">
//               <div className="p-2 bg-green-100 rounded-lg mr-3">
//                 <FaChartLine className="text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Revenus totaux</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {gigs.reduce((sum, gig) => sum + (gig.total_earning || 0), 0)} DH
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-yellow-50 p-4 rounded-lg">
//             <div className="flex items-center">
//               <div className="p-2 bg-yellow-100 rounded-lg mr-3">
//                 <FaStar className="text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Note moyenne</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {(gigs.reduce((sum, gig) => sum + (gig.gig_rating || 0), 0) / (gigs.length || 1)).toFixed(1)}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-purple-50 p-4 rounded-lg">
//             <div className="flex items-center">
//               <div className="p-2 bg-purple-100 rounded-lg mr-3">
//                 <FaEye className="text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Vues totales</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {gigs.reduce((sum, gig) => sum + (gig.views || 0), 0).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Chargement de vos services...</p>
//         </div>
//       ) : filteredGigs.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredGigs.map(gig => (
//             <div key={gig._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               {/* En-tête du gig */}
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <span className={`px-2 py-1 text-xs rounded-full font-medium ${
//                       gig.status === 'active' ? 'bg-green-100 text-green-800' :
//                       gig.status === 'draft' ? 'bg-gray-100 text-gray-800' :
//                       'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {gig.status === 'active' ? 'Actif' : 
//                        gig.status === 'draft' ? 'Brouillon' : 'En pause'}
//                     </span>
//                     <h3 className="text-lg font-bold text-gray-900 mt-2">{gig.title}</h3>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold text-green-600">{gig.price || 0} DH</p>
//                     <p className="text-sm text-gray-600">À partir de</p>
//                   </div>
//                 </div>

//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                   {gig.description}
//                 </p>

//                 {/* Statistiques du gig */}
//                 <div className="grid grid-cols-3 gap-4 mb-6">
//                   <div className="text-center">
//                     <p className="text-2xl font-bold text-gray-900">{gig.total_orders || 0}</p>
//                     <p className="text-xs text-gray-600">Commandes</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-2xl font-bold text-gray-900">{gig.gig_rating || 0}/5</p>
//                     <p className="text-xs text-gray-600">Note</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-2xl font-bold text-gray-900">{gig.total_earning || 0} DH</p>
//                     <p className="text-xs text-gray-600">Revenus</p>
//                   </div>
//                 </div>

//                 {/* Détails */}
//                 <div className="space-y-2 text-sm text-gray-600 mb-6">
//                   <div className="flex items-center">
//                     <FaClock className="mr-2" />
//                     <span>Livraison: {gig.delivery_days || 3} jours</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {gig.search_tags?.slice(0, 3).map(tag => (
//                       <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex space-x-3">
//                   <Link
//                     to={`/freelancer/edit-gig/${gig._id}`}
//                     className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium text-center"
//                   >
//                     <FaEdit className="inline mr-2" />
//                     Modifier
//                   </Link>
//                   <button
//                     onClick={() => handleDeleteGig(gig._id)}
//                     className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>

//               {/* Footer avec actions supplémentaires */}
//               <div className="border-t border-gray-200 p-4 bg-gray-50">
//                 <div className="flex justify-between">
//                   <Link
//                     to={`/gig/${gig._id}`}
//                     className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
//                     target="_blank"
//                   >
//                     <FaEye className="mr-2" />
//                     Voir en public
//                   </Link>
//                   <Link
//                     to={`/freelancer/gig-analytics/${gig._id}`}
//                     className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
//                   >
//                     <FaChartLine className="mr-2" />
//                     Analytics
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-white rounded-xl">
//           <FaPlus className="text-4xl text-gray-300 mx-auto mb-4" />
//           <h3 className="text-xl font-bold text-gray-900 mb-2">
//             {filter === 'all' ? 'Aucun service créé' : `Aucun service ${filter}`}
//           </h3>
//           <p className="text-gray-600 mb-6">
//             {filter === 'all' 
//               ? 'Commencez par créer votre premier service pour attirer des clients'
//               : `Vous n'avez pas de services avec le statut "${filter}"`
//             }
//           </p>
//           {filter === 'all' && (
//             <Link
//               to="/freelancer/create-gig"
//               className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
//             >
//               <FaPlus className="inline mr-2" />
//               Créer mon premier service
//             </Link>
//           )}
//         </div>
//       )}

//       {/* Pagination */}
//       {filteredGigs.length > 0 && (
//         <div className="mt-8 flex justify-center">
//           <nav className="flex space-x-2">
//             <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               Précédent
//             </button>
//             <button className="px-4 py-2 bg-green-600 text-white rounded-lg">1</button>
//             <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               2
//             </button>
//             <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               3
//             </button>
//             <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               Suivant
//             </button>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash,
  FaChartLine,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaBox,
  FaCheckCircle,
  FaClock,
  FaBan
} from 'react-icons/fa';
import gigService from '../../services/gigService';
import GigCard from '../../components/features/GigCard';

const MyGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    category_id: '',
    search: '',
    sort_by: 'created_at',
    sort_order: 'desc'
  });

  const fetchMyGigs = async () => {
    setLoading(true);
    try {
      const result = await gigService.getMyGigs(filters);
      
      if (result.success) {
        setGigs(result.gigs || []);
      } else {
        toast.error(result.error || 'Erreur lors du chargement des services');
      }
    } catch (error) {
      toast.error('Erreur réseau');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, [filters]);

  const handleDeleteGig = async (id, title) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      return;
    }

    try {
      const result = await gigService.deleteGig(id);
      
      if (result.success) {
        toast.success(result.message);
        fetchMyGigs();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggleStatus = async (id, currentStatus, title) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const result = await gigService.toggleGigStatus(id, newStatus);
      
      if (result.success) {
        toast.success(`Service ${newStatus === 'active' ? 'activé' : 'désactivé'}`);
        fetchMyGigs();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Erreur lors du changement de statut');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle />, label: 'Actif' },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: <FaEyeSlash />, label: 'Inactif' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: <FaClock />, label: 'En attente' },
      draft: { color: 'bg-blue-100 text-blue-800', icon: <FaBox />, label: 'Brouillon' },
      rejected: { color: 'bg-red-100 text-red-800', icon: <FaBan />, label: 'Rejeté' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const getStats = () => {
    const total = gigs.length;
    const active = gigs.filter(g => g.status === 'active').length;
    const pending = gigs.filter(g => g.status === 'pending').length;
    const earnings = gigs.reduce((sum, gig) => sum + (gig.total_earning || 0), 0);
    
    return { total, active, pending, earnings };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes Services</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos services et suivez leurs performances
          </p>
        </div>
        
        <Link
          to="/freelancer/create-gig"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Créer un nouveau service
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <FaBox className="text-xl" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-500">Total des services</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <FaCheckCircle className="text-xl" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
              <div className="text-sm text-gray-500">Services actifs</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
              <FaClock className="text-xl" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-500">En attente</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <FaChartLine className="text-xl" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {stats.earnings.toLocaleString()} DH
              </div>
              <div className="text-sm text-gray-500">Revenus totaux</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un service..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="pending">En attente</option>
              <option value="draft">Brouillon</option>
            </select>
            
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-green-500 focus:border-green-500"
              value={filters.sort_by}
              onChange={(e) => setFilters({...filters, sort_by: e.target.value})}
            >
              <option value="created_at">Date de création</option>
              <option value="title">Titre</option>
              <option value="price">Prix</option>
              <option value="total_orders">Commandes</option>
            </select>
            
            <button
              onClick={() => setFilters({
                status: '',
                category_id: '',
                search: '',
                sort_by: 'created_at',
                sort_order: 'desc'
              })}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Gigs List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Chargement de vos services...</p>
          </div>
        ) : gigs.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-5xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun service trouvé</h3>
            <p className="text-gray-500 mb-6">
              {filters.search || filters.status 
                ? 'Aucun service ne correspond à vos critères de recherche.'
                : 'Vous n\'avez pas encore créé de service.'}
            </p>
            <Link
              to="/freelancer/create-gig"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
            >
              <FaPlus className="mr-2" />
              Créer votre premier service
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gigs.map((gig) => (
                  <tr key={gig._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                          {gig.images_url?.[0] ? (
                            <img
                              src={gig.images_url[0]}
                              alt={gig.title}
                              className="h-10 w-10 object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 bg-gray-300 flex items-center justify-center">
                              <FaBox className="text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {gig.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {gig.category_id?.name || 'Non catégorisé'}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {gig.price?.toLocaleString()} DH
                      </div>
                      <div className="text-sm text-gray-500">
                        {gig.delivery_days} jours
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(gig.status)}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="flex items-center">
                          <FaChartLine className="text-green-500 mr-2" />
                          <span className="font-medium">{gig.total_orders || 0}</span>
                          <span className="text-gray-500 ml-1">commandes</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {gig.gig_rating || 0}/5 ⭐
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/gigs/${gig.slug || gig._id}`}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-900 p-2"
                          title="Voir en public"
                        >
                          <FaEye />
                        </Link>
                        
                        <Link
                          to={`/freelancer/gigs/${gig._id}/edit`}
                          className="text-yellow-600 hover:text-yellow-900 p-2"
                          title="Modifier"
                        >
                          <FaEdit />
                        </Link>
                        
                        <button
                          onClick={() => handleToggleStatus(gig._id, gig.status, gig.title)}
                          className={`p-2 ${
                            gig.status === 'active' 
                              ? 'text-green-600 hover:text-green-900' 
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                          title={gig.status === 'active' ? 'Désactiver' : 'Activer'}
                        >
                          {gig.status === 'active' ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteGig(gig._id, gig.title)}
                          className="text-red-600 hover:text-red-900 p-2"
                          title="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600">💡</span>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-blue-900">
              Conseils pour optimiser vos services
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Utilisez des images de haute qualité pour attirer plus de clients</li>
                <li>Décrivez clairement ce que vous offrez dans votre service</li>
                <li>Répondez rapidement aux messages pour améliorer votre taux de réponse</li>
                <li>Mettez à jour régulièrement vos services pour rester compétitif</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGigs;