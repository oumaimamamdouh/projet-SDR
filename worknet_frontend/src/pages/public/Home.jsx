
// // // src/pages/public/Home.jsx - VERSION SIMPLIFIÉE
// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { 
//   FaSearch, 
//   FaStar, 
//   FaCheckCircle, 
//   FaPalette,
//   FaCode,
//   FaPencilAlt,
//   FaBullhorn,
//   FaVideo,
//   FaLanguage,
//   FaMusic,
//   FaChartLine,
//   FaCamera,
//   FaShoppingCart,
//   FaArrowRight,
//   FaSpinner
// } from 'react-icons/fa'
// import { GiBrain } from 'react-icons/gi'
// import gigService from '../../services/gigService';
// import categoryService from '../../services/categoryService';

// export default function Home() {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [featuredGigs, setFeaturedGigs] = useState([])
//   const [categories, setCategories] = useState([])
//   const [loadingGigs, setLoadingGigs] = useState(true)
//   const [loadingCategories, setLoadingCategories] = useState(true)

//   // Catégories comme Fiverr
//   const categoryIcons = [
//     { icon: <FaPalette />, name: 'Design Graphique', color: 'text-purple-600 bg-purple-50' },
//     { icon: <FaCode />, name: 'Développement Web', color: 'text-blue-600 bg-blue-50' },
//     { icon: <FaPencilAlt />, name: 'Rédaction & Traduction', color: 'text-green-600 bg-green-50' },
//     { icon: <FaBullhorn />, name: 'Marketing Digital', color: 'text-yellow-600 bg-yellow-50' },
//     { icon: <FaVideo />, name: 'Vidéo & Animation', color: 'text-red-600 bg-red-50' },
//     { icon: <FaLanguage />, name: 'Audio & Musique', color: 'text-pink-600 bg-pink-50' },
//     { icon: <FaMusic />, name: 'Programmation & Tech', color: 'text-indigo-600 bg-indigo-50' },
//     { icon: <GiBrain />, name: 'Business', color: 'text-teal-600 bg-teal-50' },
//     { icon: <FaChartLine />, name: 'Lifestyle', color: 'text-orange-600 bg-orange-50' },
//     { icon: <FaCamera />, name: 'Photographie', color: 'text-cyan-600 bg-cyan-50' },
//   ]

//   // Charger les gigs en vedette
//   useEffect(() => {
//     loadFeaturedGigs()
//   }, [])

//   // Charger les catégories
//   useEffect(() => {
//     loadCategories()
//   }, [])

//   const loadFeaturedGigs = async () => {
//     try {
//       setLoadingGigs(true)
//       // Pour l'instant, utiliser des données de test
//       setFeaturedGigs([
//         { _id: '1', title: 'Logo Design', price: 200, ordersCount: 1234 },
//         { _id: '2', title: 'Site Web WordPress', price: 1500, ordersCount: 856 },
//         { _id: '3', title: 'Traduction Arabe-Français', price: 150, ordersCount: 2567 },
//         { _id: '4', title: 'Montage Vidéo', price: 300, ordersCount: 987 },
//         { _id: '5', title: 'Marketing Instagram', price: 500, ordersCount: 1543 },
//         { _id: '6', title: 'Rédaction SEO', price: 250, ordersCount: 2109 },
//       ])
//     } catch (error) {
//       console.error('Error loading featured gigs:', error)
//       // Fallback data
//       setFeaturedGigs([
//         { _id: '1', title: 'Logo Design', price: 200, ordersCount: 1234 },
//         { _id: '2', title: 'Site Web WordPress', price: 1500, ordersCount: 856 },
//         { _id: '3', title: 'Traduction Arabe-Français', price: 150, ordersCount: 2567 },
//       ])
//     } finally {
//       setLoadingGigs(false)
//     }
//   }

//   const loadCategories = async () => {
//     try {
//       setLoadingCategories(true)
//       // Utiliser les catégories statiques pour l'instant
//       setCategories(categoryIcons)
//     } catch (error) {
//       console.error('Error loading categories:', error)
//       setCategories(categoryIcons)
//     } finally {
//       setLoadingCategories(false)
//     }
//   }

//   // Pourquoi choisir WorkNet
//   const features = [
//     { 
//       title: 'Qualité à prix abordable', 
//       description: 'Trouvez le service parfait à chaque budget. Pas de tarifs horaires, juste un prix fixe par projet.' 
//     },
//     { 
//       title: 'Livraison rapide', 
//       description: 'Recevez votre travail en quelques jours. Sélectionnez des freelancers selon leurs délais de livraison.' 
//     },
//     { 
//       title: 'Protection 24h/24', 
//       description: 'Votre paiement est sécurisé. Travaillez en toute tranquillité avec notre assistance.' 
//     },
//   ]

//   const handleSearch = (e) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       window.location.href = `/browse?q=${encodeURIComponent(searchQuery)}`
//     }
//   }

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-green-50 to-white py-16">
//         <div className="container mx-auto px-4">
//           <div className="max-w-4xl mx-auto text-center">
//             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//               Trouvez le freelance
//               <span className="text-green-500"> parfait</span>
//               <br />
//               pour votre projet
//             </h1>
//             <p className="text-xl text-gray-600 mb-10">
//               Plateforme de services freelance. Commandez, collaborez, obtenez des résultats.
//             </p>
            
//             {/* Search Bar */}
//             <div className="relative max-w-2xl mx-auto mb-12">
//               <form onSubmit={handleSearch} className="flex shadow-lg rounded-full overflow-hidden">
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     placeholder="Rechercher un service (ex: logo design, site web...)"
//                     className="w-full px-6 py-4 text-lg focus:outline-none"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//                 <button 
//                   type="submit"
//                   className="bg-green-500 text-white px-8 hover:bg-green-600 transition-colors"
//                 >
//                   <FaSearch className="inline mr-2" />
//                   Rechercher
//                 </button>
//               </form>
//             </div>

//             {/* Popular Tags */}
//             <div className="flex flex-wrap justify-center gap-2 mb-8">
//               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
//                 Logo Design
//               </span>
//               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
//                 Site Web
//               </span>
//               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
//                 Traduction
//               </span>
//               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
//                 Marketing Digital
//               </span>
//               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
//                 Montage Vidéo
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trusted By */}
//       <section className="py-8 bg-gray-100">
//         <div className="container mx-auto px-4">
//           <p className="text-center text-gray-600 text-sm mb-4">
//             Confiance de milliers d'entreprises et de freelancers
//           </p>
//           <div className="flex justify-center items-center space-x-12 opacity-50">
//             <span className="text-xl font-bold text-gray-400">GOOGLE</span>
//             <span className="text-xl font-bold text-gray-400">META</span>
//             <span className="text-xl font-bold text-gray-400">NETFLIX</span>
//             <span className="text-xl font-bold text-gray-400">PAYPAL</span>
//           </div>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
//             Explorer par catégorie
//           </h2>
//           {loadingCategories ? (
//             <div className="text-center py-12">
//               <FaSpinner className="animate-spin text-4xl text-green-500 mx-auto mb-4" />
//               <p>Chargement des catégories...</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//               {categories.map((cat, idx) => (
//                 <Link 
//                   key={idx}
//                   to={`/browse?category=${cat.name}`}
//                   className={`${cat.color || 'text-gray-600 bg-gray-50'} p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group`}
//                 >
//                   <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
//                     {cat.icon}
//                   </div>
//                   <h3 className="font-semibold text-lg">{cat.name}</h3>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Popular Services */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900">
//               Services les plus populaires
//             </h2>
//             <Link to="/browse" className="text-green-500 hover:text-green-600 flex items-center">
//               Voir plus <FaArrowRight className="ml-2" />
//             </Link>
//           </div>
          
//           {loadingGigs ? (
//             <div className="text-center py-12">
//               <FaSpinner className="animate-spin text-4xl text-green-500 mx-auto mb-4" />
//               <p>Chargement des services...</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {featuredGigs.slice(0, 6).map((gig) => (
//                 <Link 
//                   key={gig._id}
//                   to={`/client/gig/${gig._id}`}
//                   className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow block"
//                 >
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="text-xl font-semibold text-gray-900">{gig.title}</h3>
//                     <FaShoppingCart className="text-gray-400" />
//                   </div>
//                   <div className="flex items-center mb-2">
//                     <FaStar className="text-yellow-400 mr-1" />
//                     <FaStar className="text-yellow-400 mr-1" />
//                     <FaStar className="text-yellow-400 mr-1" />
//                     <FaStar className="text-yellow-400 mr-1" />
//                     <FaStar className="text-yellow-400 mr-1" />
//                     <span className="text-gray-600 ml-2">5.0</span>
//                   </div>
//                   <p className="text-gray-600 text-sm mb-4">
//                     {gig.ordersCount || 0} commandes
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-2xl font-bold text-gray-900">
//                       À partir de {gig.price || 0} DH
//                     </span>
//                     <span className="text-green-500 hover:text-green-600 font-semibold">
//                       Voir détails
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
//             Pourquoi choisir WorkNet?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {features.map((feature, idx) => (
//               <div key={idx} className="text-center">
//                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl mx-auto mb-6">
//                   <FaCheckCircle />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-green-500 to-green-600">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Prêt à réaliser vos projets?
//           </h2>
//           <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
//             Rejoignez la plus grande communauté de freelancers au Maroc
//           </p>
//           <div className="space-x-4">
//             <Link 
//               to="/register?role=freelancer"
//               className="bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 inline-block"
//             >
//               Devenir Freelancer
//             </Link>
//             <Link 
//               to="/register?role=client"
//               className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block"
//             >
//               Trouver un Service
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { 
// //   FaSearch, 
// //   FaStar, 
// //   FaCheckCircle, 
// //   FaPalette,
// //   FaCode,
// //   FaPencilAlt,
// //   FaBullhorn,
// //   FaVideo,
// //   FaMusic,
// //   FaChartLine,
// //   FaCamera,
// //   FaShoppingCart,
// //   FaArrowRight
// // } from 'react-icons/fa';
// // import { GiBrain } from 'react-icons/gi';

// // export default function Home() {
// //   const [searchQuery, setSearchQuery] = useState('');

// //   const categories = [
// //     { icon: <FaPalette />, name: 'Design Graphique', color: 'text-purple-600 bg-purple-50' },
// //     { icon: <FaCode />, name: 'Développement Web', color: 'text-blue-600 bg-blue-50' },
// //     { icon: <FaPencilAlt />, name: 'Rédaction & Traduction', color: 'text-green-600 bg-green-50' },
// //     { icon: <FaBullhorn />, name: 'Marketing Digital', color: 'text-yellow-600 bg-yellow-50' },
// //     { icon: <FaVideo />, name: 'Vidéo & Animation', color: 'text-red-600 bg-red-50' },
// //     { icon: <GiBrain />, name: 'Audio & Musique', color: 'text-pink-600 bg-pink-50' },
// //     { icon: <FaMusic />, name: 'Programmation & Tech', color: 'text-indigo-600 bg-indigo-50' },
// //     { icon: <FaChartLine />, name: 'Business', color: 'text-teal-600 bg-teal-50' },
// //     { icon: <FaCamera />, name: 'Lifestyle', color: 'text-orange-600 bg-orange-50' },
// //   ];

// //   const popularServices = [
// //     { title: 'Logo Design', price: 'À partir de 200 DH', orders: '1,234 commandes', rating: 5.0 },
// //     { title: 'Site Web WordPress', price: 'À partir de 1,500 DH', orders: '856 commandes', rating: 4.8 },
// //     { title: 'Traduction Arabe-Français', price: 'À partir de 150 DH', orders: '2,567 commandes', rating: 4.9 },
// //     { title: 'Montage Vidéo', price: 'À partir de 300 DH', orders: '987 commandes', rating: 4.7 },
// //     { title: 'Marketing Instagram', price: 'À partir de 500 DH', orders: '1,543 commandes', rating: 4.6 },
// //     { title: 'Rédaction SEO', price: 'À partir de 250 DH', orders: '2,109 commandes', rating: 4.9 },
// //   ];

// //   const features = [
// //     { 
// //       title: 'Qualité à prix abordable', 
// //       description: 'Trouvez le service parfait à chaque budget. Pas de tarifs horaires, juste un prix fixe par projet.' 
// //     },
// //     { 
// //       title: 'Livraison rapide', 
// //       description: 'Recevez votre travail en quelques jours. Sélectionnez des freelancers selon leurs délais de livraison.' 
// //     },
// //     { 
// //       title: 'Protection 24h/24', 
// //       description: 'Votre paiement est sécurisé. Travaillez en toute tranquillité avec notre assistance.' 
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
      

// //       {/* Hero Section */}
// //       <section className="bg-gradient-to-r from-green-50 to-white py-16">
// //         <div className="container mx-auto px-4">
// //           <div className="max-w-4xl mx-auto text-center">
// //             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
// //               Trouvez le freelance
// //               <span className="text-green-500"> parfait</span>
// //               <br />
// //               pour votre projet
// //             </h1>
// //             <p className="text-xl text-gray-600 mb-10">
// //               Plateforme de services freelance. Commandez, collaborez, obtenez des résultats.
// //             </p>
            
// //             {/* Search Bar */}
// //             <div className="relative max-w-2xl mx-auto mb-12">
// //               <div className="flex shadow-lg rounded-full overflow-hidden">
// //                 <div className="flex-1">
// //                   <input
// //                     type="text"
// //                     placeholder="Rechercher un service (ex: logo design, site web...)"
// //                     className="w-full px-6 py-4 text-lg focus:outline-none"
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                   />
// //                 </div>
// //                 <button className="bg-green-500 text-white px-8 hover:bg-green-600 transition-colors flex items-center">
// //                   <FaSearch className="inline mr-2" />
// //                   Rechercher
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Popular Tags */}
// //             <div className="flex flex-wrap justify-center gap-2 mb-8">
// //               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
// //                 Logo Design
// //               </span>
// //               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
// //                 Site Web
// //               </span>
// //               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
// //                 Traduction
// //               </span>
// //               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
// //                 Marketing Digital
// //               </span>
// //               <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
// //                 Montage Vidéo
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Trusted By */}
// //       <section className="py-8 bg-gray-100" id="trusted">
// //         <div className="container mx-auto px-4">
// //           <p className="text-center text-gray-600 text-sm mb-4">
// //             Confiance de milliers d'entreprises et de freelancers
// //           </p>
// //           <div className="flex justify-center items-center space-x-12 opacity-50">
// //             <span className="text-xl font-bold text-gray-400">GOOGLE</span>
// //             <span className="text-xl font-bold text-gray-400">META</span>
// //             <span className="text-xl font-bold text-gray-400">NETFLIX</span>
// //             <span className="text-xl font-bold text-gray-400">PAYPAL</span>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Categories */}
// //       <section className="py-16" id="categories">
// //         <div className="container mx-auto px-4">
// //           <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
// //             Explorer par catégorie
// //           </h2>
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
// //             {categories.map((cat, idx) => (
// //               <div 
// //                 key={idx} 
// //                 className={`${cat.color} p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group`}
// //               >
// //                 <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
// //                   {cat.icon}
// //                 </div>
// //                 <h3 className="font-semibold text-lg">{cat.name}</h3>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Popular Services */}
// //       <section className="py-16 bg-white" id="popular">
// //         <div className="container mx-auto px-4">
// //           <div className="flex justify-between items-center mb-12">
// //             <h2 className="text-3xl font-bold text-gray-900">
// //               Services les plus populaires
// //             </h2>
// //             <a href="#popular" className="text-green-500 hover:text-green-600 flex items-center">
// //               Voir plus <FaArrowRight className="ml-2" />
// //             </a>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {popularServices.map((service, idx) => (
// //               <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
// //                 <div className="flex justify-between items-start mb-4">
// //                   <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
// //                   <FaShoppingCart className="text-gray-400" />
// //                 </div>
// //                 <div className="flex items-center mb-2">
// //                   {[...Array(5)].map((_, i) => (
// //                     <FaStar key={i} className={`${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'} mr-1`} />
// //                   ))}
// //                   <span className="text-gray-600 ml-2">{service.rating}</span>
// //                 </div>
// //                 <p className="text-gray-600 text-sm mb-4">{service.orders}</p>
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-2xl font-bold text-gray-900">{service.price}</span>
// //                   <button className="text-green-500 hover:text-green-600 font-semibold">
// //                     Voir détails
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Why Choose Us */}
// //       <section className="py-16 bg-gray-50" id="why-us">
// //         <div className="container mx-auto px-4">
// //           <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
// //             Pourquoi choisir WorkNet?
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {features.map((feature, idx) => (
// //               <div key={idx} className="text-center">
// //                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl mx-auto mb-6">
// //                   <FaCheckCircle />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-4">
// //                   {feature.title}
// //                 </h3>
// //                 <p className="text-gray-600">
// //                   {feature.description}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 bg-gradient-to-r from-green-500 to-green-600">
// //         <div className="container mx-auto px-4 text-center">
// //           <h2 className="text-4xl font-bold text-white mb-6">
// //             Prêt à réaliser vos projets?
// //           </h2>
// //           <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
// //             Rejoignez la plus grande communauté de freelancers au Maroc
// //           </p>
// //           <div className="space-x-4">
// //             <Link 
// //               to="/register?role=freelancer"
// //               className="bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 inline-block"
// //             >
// //               Devenir Freelancer
// //             </Link>
// //             <Link 
// //               to="/register?role=client"
// //               className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block"
// //             >
// //               Trouver un Service
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

      
// //     </div>
// //   );
// // }




import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaStar, 
  FaCheckCircle, 
  FaPalette,
  FaCode,
  FaPencilAlt,
  FaBullhorn,
  FaVideo,
  FaMusic,
  FaChartLine,
  FaCamera,
  FaShoppingCart,
  FaArrowRight
} from 'react-icons/fa';
import { GiBrain } from 'react-icons/gi';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: <FaPalette />, name: 'Design Graphique', color: 'text-purple-600 bg-purple-50' },
    { icon: <FaCode />, name: 'Développement Web', color: 'text-blue-600 bg-blue-50' },
    { icon: <FaPencilAlt />, name: 'Rédaction & Traduction', color: 'text-green-600 bg-green-50' },
    { icon: <FaBullhorn />, name: 'Marketing Digital', color: 'text-yellow-600 bg-yellow-50' },
    { icon: <FaVideo />, name: 'Vidéo & Animation', color: 'text-red-600 bg-red-50' },
    { icon: <GiBrain />, name: 'Audio & Musique', color: 'text-pink-600 bg-pink-50' },
    { icon: <FaMusic />, name: 'Programmation & Tech', color: 'text-indigo-600 bg-indigo-50' },
    { icon: <FaChartLine />, name: 'Business', color: 'text-teal-600 bg-teal-50' },
    { icon: <FaCamera />, name: 'Lifestyle', color: 'text-orange-600 bg-orange-50' },
  ];

  const popularServices = [
    { title: 'Logo Design', price: 'À partir de 200 DH', orders: '1,234 commandes', rating: 5.0 },
    { title: 'Site Web WordPress', price: 'À partir de 1,500 DH', orders: '856 commandes', rating: 4.8 },
    { title: 'Traduction Arabe-Français', price: 'À partir de 150 DH', orders: '2,567 commandes', rating: 4.9 },
    { title: 'Montage Vidéo', price: 'À partir de 300 DH', orders: '987 commandes', rating: 4.7 },
    { title: 'Marketing Instagram', price: 'À partir de 500 DH', orders: '1,543 commandes', rating: 4.6 },
    { title: 'Rédaction SEO', price: 'À partir de 250 DH', orders: '2,109 commandes', rating: 4.9 },
  ];

  const features = [
    { 
      title: 'Qualité à prix abordable', 
      description: 'Trouvez le service parfait à chaque budget. Pas de tarifs horaires, juste un prix fixe par projet.' 
    },
    { 
      title: 'Livraison rapide', 
      description: 'Recevez votre travail en quelques jours. Sélectionnez des freelancers selon leurs délais de livraison.' 
    },
    { 
      title: 'Protection 24h/24', 
      description: 'Votre paiement est sécurisé. Travaillez en toute tranquillité avec notre assistance.' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-500">Work</span>
              <span className="text-2xl font-bold text-gray-900">Net</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#categories" className="text-gray-600 hover:text-green-500">Explorer</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-500">Comment ça marche</a>
              <a href="#freelancers" className="text-gray-600 hover:text-green-500">Devenir Freelance</a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-green-500">
                Se connecter
              </Link>
              <Link 
                to="/register" 
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Trouvez le freelance
              <span className="text-green-500"> parfait</span>
              <br />
              pour votre projet
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Plateforme de services freelance. Commandez, collaborez, obtenez des résultats.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="flex shadow-lg rounded-full overflow-hidden">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Rechercher un service (ex: logo design, site web...)"
                    className="w-full px-6 py-4 text-lg focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="bg-green-500 text-white px-8 hover:bg-green-600 transition-colors flex items-center">
                  <FaSearch className="inline mr-2" />
                  Rechercher
                </button>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                Logo Design
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                Site Web
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                Traduction
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                Marketing Digital
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                Montage Vidéo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-8 bg-gray-100" id="trusted">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 text-sm mb-4">
            Confiance de milliers d'entreprises et de freelancers
          </p>
          <div className="flex justify-center items-center space-x-12 opacity-50">
            <span className="text-xl font-bold text-gray-400">GOOGLE</span>
            <span className="text-xl font-bold text-gray-400">META</span>
            <span className="text-xl font-bold text-gray-400">NETFLIX</span>
            <span className="text-xl font-bold text-gray-400">PAYPAL</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16" id="categories">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Explorer par catégorie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className={`${cat.color} p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group`}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-semibold text-lg">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-white" id="popular">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Services les plus populaires
            </h2>
            <a href="#popular" className="text-green-500 hover:text-green-600 flex items-center">
              Voir plus <FaArrowRight className="ml-2" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularServices.map((service, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                  <FaShoppingCart className="text-gray-400" />
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'} mr-1`} />
                  ))}
                  <span className="text-gray-600 ml-2">{service.rating}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{service.orders}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                  <button className="text-green-500 hover:text-green-600 font-semibold">
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50" id="why-us">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Pourquoi choisir WorkNet?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl mx-auto mb-6">
                  <FaCheckCircle />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à réaliser vos projets?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez la plus grande communauté de freelancers au Maroc
          </p>
          <div className="space-x-4">
            <Link 
              to="/register?role=freelancer"
              className="bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 inline-block"
            >
              Devenir Freelancer
            </Link>
            <Link 
              to="/register?role=client"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-green-600 transition-colors inline-block"
            >
              Trouver un Service
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-green-400">Work</span>
                <span className="text-2xl font-bold text-white">Net</span>
              </div>
              <p className="text-gray-400">
                La plateforme freelance n°1 au Maroc pour trouver et offrir des services.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Catégories</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#categories" className="hover:text-white">Design Graphique</a></li>
                <li><a href="#categories" className="hover:text-white">Développement Web</a></li>
                <li><a href="#categories" className="hover:text-white">Marketing Digital</a></li>
                <li><a href="#categories" className="hover:text-white">Rédaction</a></li>
              </ul>
            </div>

            {/* A propos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">À propos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#how-it-works" className="hover:text-white">Comment ça marche</a></li>
                <li><a href="#why-us" className="hover:text-white">Pourquoi WorkNet</a></li>
                <li><a href="#trusted" className="hover:text-white">Confiance & Sécurité</a></li>
                <li><a href="#popular" className="hover:text-white">Services Populaires</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white">Connexion</Link></li>
                <li><Link to="/register" className="hover:text-white">Inscription</Link></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
                <li><a href="#help" className="hover:text-white">Aide & FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 WorkNet. Tous droits réservés.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#terms" className="hover:text-white">Conditions d'utilisation</a>
              <a href="#privacy" className="hover:text-white">Politique de confidentialité</a>
              <a href="#cookies" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}