// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaSearch, FaStar, FaFilter, FaHeart, FaShoppingCart } from 'react-icons/fa';

// export default function BrowseGigs() {
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('relevance');
//   const [favorites, setFavorites] = useState(['1', '3']);

//   const gigs = [
//     {
//       id: '1',
//       title: 'Développement de Site Web WordPress',
//       description: 'Création de site WordPress personnalisé avec design responsive et SEO optimisé.',
//       price: 299,
//       delivery: '3 jours',
//       rating: 4.9,
//       reviews: 128,
//       seller: {
//         name: 'Sarah Dev',
//         level: 'Pro Seller',
//         avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&auto=format'
//       },
//       image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format',
//       category: 'web'
//     },
//     {
//       id: '2',
//       title: 'Logo Design Professionnel',
//       description: 'Création de logo unique pour votre marque avec 3 concepts différents.',
//       price: 149,
//       delivery: '2 jours',
//       rating: 4.8,
//       reviews: 256,
//       seller: {
//         name: 'Alex Designer',
//         level: 'Top Rated',
//         avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format'
//       },
//       image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&auto=format',
//       category: 'design'
//     },
//     {
//       id: '3',
//       title: 'Marketing Digital Facebook Ads',
//       description: 'Campagnes Facebook Ads optimisées pour augmenter vos ventes.',
//       price: 199,
//       delivery: '5 jours',
//       rating: 4.7,
//       reviews: 89,
//       seller: {
//         name: 'Marketing Pro',
//         level: 'Level 2',
//         avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format'
//       },
//       image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format',
//       category: 'marketing'
//     },
//     {
//       id: '4',
//       title: 'Traduction Français-Anglais',
//       description: 'Traduction professionnelle de documents, sites web et présentations.',
//       price: 79,
//       delivery: '1 jour',
//       rating: 4.9,
//       reviews: 342,
//       seller: {
//         name: 'Traduction Express',
//         level: 'Top Rated',
//         avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format'
//       },
//       image: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=400&auto=format',
//       category: 'writing'
//     },
//     {
//       id: '5',
//       title: 'Montage Vidéo Professionnel',
//       description: 'Montage vidéo avec effets, musique et sous-titres pour vos projets.',
//       price: 249,
//       delivery: '4 jours',
//       rating: 4.8,
//       reviews: 167,
//       seller: {
//         name: 'Video Master',
//         level: 'Pro Seller',
//         avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format'
//       },
//       image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format',
//       category: 'video'
//     },
//     {
//       id: '6',
//       title: 'Site E-commerce Shopify',
//       description: 'Boutique en ligne Shopify complète avec paiement sécurisé.',
//       price: 599,
//       delivery: '7 jours',
//       rating: 4.9,
//       reviews: 93,
//       seller: {
//         name: 'E-commerce Expert',
//         level: 'Level 2',
//         avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&auto=format'
//       },
//       image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&auto=format',
//       category: 'web'
//     }
//   ];

//   const categories = [
//     { id: 'all', name: 'Toutes les catégories', icon: '📁' },
//     { id: 'web', name: 'Développement Web', icon: '💻' },
//     { id: 'design', name: 'Design Graphique', icon: '🎨' },
//     { id: 'marketing', name: 'Marketing Digital', icon: '📈' },
//     { id: 'writing', name: 'Rédaction & Traduction', icon: '✍️' },
//     { id: 'video', name: 'Vidéo & Animation', icon: '🎬' },
//     { id: 'business', name: 'Business', icon: '💼' }
//   ];

//   const toggleFavorite = (id) => {
//     setFavorites(prev => 
//       prev.includes(id) 
//         ? prev.filter(fav => fav !== id)
//         : [...prev, id]
//     );
//   };

//   const filteredGigs = gigs.filter(gig => {
//     const matchesCategory = selectedCategory === 'all' || gig.category === selectedCategory;
//     const matchesSearch = gig.title.toLowerCase().includes(search.toLowerCase()) ||
//                          gig.description.toLowerCase().includes(search.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const sortedGigs = [...filteredGigs].sort((a, b) => {
//     switch(sortBy) {
//       case 'price-low': return a.price - b.price;
//       case 'price-high': return b.price - a.price;
//       case 'rating': return b.rating - a.rating;
//       case 'reviews': return b.reviews - a.reviews;
//       default: return 0;
//     }
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Search */}
//       <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-12">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
//             Trouvez le service parfait
//           </h1>
//           <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
//             Explorez des milliers de services freelance pour réaliser vos projets
//           </p>

//           {/* Search Bar */}
//           <div className="max-w-3xl mx-auto">
//             <div className="relative">
//               <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
//               <input
//                 type="text"
//                 placeholder="Rechercher un service (ex: logo design, site web, marketing...)"
//                 className="w-full pl-16 pr-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-8 py-2 rounded-full font-medium hover:bg-green-700">
//                 Rechercher
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Filters */}
//           <div className="lg:w-64 flex-shrink-0">
//             {/* Categories */}
//             <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border">
//               <h3 className="font-bold text-gray-900 mb-4 flex items-center">
//                 <FaFilter className="mr-2" />
//                 Catégories
//               </h3>
//               <div className="space-y-2">
//                 {categories.map(cat => (
//                   <button
//                     key={cat.id}
//                     onClick={() => setSelectedCategory(cat.id)}
//                     className={`flex items-center w-full text-left p-3 rounded-lg transition-colors ${
//                       selectedCategory === cat.id
//                         ? 'bg-green-50 text-green-600 font-medium'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <span className="text-xl mr-3">{cat.icon}</span>
//                     <span>{cat.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Sort Options */}
//             <div className="bg-white rounded-xl p-6 shadow-sm border">
//               <h3 className="font-bold text-gray-900 mb-4">Trier par</h3>
//               <div className="space-y-2">
//                 {[
//                   { value: 'relevance', label: 'Pertinence' },
//                   { value: 'rating', label: 'Meilleures notes' },
//                   { value: 'reviews', label: 'Plus de commandes' },
//                   { value: 'price-low', label: 'Prix: croissant' },
//                   { value: 'price-high', label: 'Prix: décroissant' }
//                 ].map(option => (
//                   <button
//                     key={option.value}
//                     onClick={() => setSortBy(option.value)}
//                     className={`flex items-center w-full text-left p-3 rounded-lg transition-colors ${
//                       sortBy === option.value
//                         ? 'bg-green-50 text-green-600 font-medium'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <span>{option.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white mt-6">
//               <h3 className="font-bold mb-4">Statistiques</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span>Services actifs</span>
//                   <span className="font-bold">1,500+</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Freelancers vérifiés</span>
//                   <span className="font-bold">95%</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Satisfaction client</span>
//                   <span className="font-bold">4.9★</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Results Header */}
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {sortedGigs.length} services trouvés
//                 </h2>
//                 <p className="text-gray-600">
//                   {selectedCategory !== 'all' && `Catégorie: ${categories.find(c => c.id === selectedCategory)?.name}`}
//                 </p>
//               </div>
//               <div className="text-gray-600">
//                 Trier par: <span className="font-medium">{sortBy}</span>
//               </div>
//             </div>

//             {/* Gig Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//               {sortedGigs.map(gig => (
//                 <div key={gig.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
//                   {/* Image */}
//                   <div className="relative h-48 overflow-hidden">
//                     <img
//                       src={gig.image}
//                       alt={gig.title}
//                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                     />
//                     <button
//                       onClick={() => toggleFavorite(gig.id)}
//                       className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//                     >
//                       <FaHeart className={`${favorites.includes(gig.id) ? 'text-red-500' : 'text-gray-400'}`} />
//                     </button>
//                     <div className="absolute bottom-3 left-3">
//                       <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//                         À partir de ${gig.price}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-5">
//                     {/* Seller Info */}
//                     <div className="flex items-center mb-4">
//                       <img
//                         src={gig.seller.avatar}
//                         alt={gig.seller.name}
//                         className="w-10 h-10 rounded-full mr-3"
//                       />
//                       <div>
//                         <div className="font-medium text-gray-900">{gig.seller.name}</div>
//                         <div className="text-sm text-gray-600">{gig.seller.level}</div>
//                       </div>
//                     </div>

//                     {/* Title & Description */}
//                     <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
//                       {gig.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {gig.description}
//                     </p>

//                     {/* Rating */}
//                     <div className="flex items-center mb-4">
//                       <div className="flex items-center">
//                         <FaStar className="text-yellow-400 mr-1" />
//                         <span className="font-bold text-gray-900">{gig.rating}</span>
//                         <span className="text-gray-500 mx-1">({gig.reviews})</span>
//                       </div>
//                       <span className="mx-2">•</span>
//                       <span className="text-gray-600">{gig.delivery}</span>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex space-x-3">
//                       <Link
//                         to={`/client/gig/${gig.id}`}
//                         className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 text-center"
//                       >
//                         Voir les détails
//                       </Link>
//                       <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
//                         <FaShoppingCart />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* No Results */}
//             {sortedGigs.length === 0 && (
//               <div className="text-center py-16">
//                 <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <FaSearch className="text-3xl text-gray-400" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   Aucun service trouvé
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   Essayez de modifier vos critères de recherche
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSearch('');
//                     setSelectedCategory('all');
//                   }}
//                   className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
//                 >
//                   Réinitialiser les filtres
//                 </button>
//               </div>
//             )}

//             {/* Popular Searches */}
//             <div className="mt-12">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">Recherches populaires</h3>
//               <div className="flex flex-wrap gap-3">
//                 {['Logo Design', 'Site Web', 'Marketing', 'Traduction', 'Montage Vidéo', 'SEO', 'Social Media'].map(
//                   (tag) => (
//                     <button
//                       key={tag}
//                       onClick={() => setSearch(tag)}
//                       className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
//                     >
//                       {tag}
//                     </button>
//                   )
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaStar, FaShoppingCart, FaClock } from 'react-icons/fa';
import gigService from '../../services/gigService';
import categoryService from '../../services/categoryService';

export default function BrowseGigs() {
  const [gigs, setGigs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'popular'
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Charger les catégories
      const categoriesRes = await categoryService.getAllCategories();
      setCategories(categoriesRes.data?.categories || []);
      
      // Charger les gigs avec filtres
      const gigsRes = await gigService.getAllGigs(filters);
      setGigs(gigsRes.data?.gigs || []);
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadData();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Explorer les services
        </h1>
        <p className="text-gray-600">
          Découvrez des milliers de services freelance de qualité
        </p>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Que cherchez-vous ? (ex: logo design, site web, marketing...)"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Rechercher
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaFilter className="inline mr-2" />
              Catégorie
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Prix min */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix minimum
            </label>
            <input
              type="number"
              placeholder="Min DH"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>

          {/* Prix max */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix maximum
            </label>
            <input
              type="number"
              placeholder="Max DH"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>

          {/* Trier par */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trier par
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="popular">Les plus populaires</option>
              <option value="newest">Plus récents</option>
              <option value="price_low">Prix croissant</option>
              <option value="price_high">Prix décroissant</option>
              <option value="rating">Meilleures notes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {loading ? 'Chargement...' : `${gigs.length} services trouvés`}
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des services...</p>
        </div>
      ) : gigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map(gig => (
            <div key={gig._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="h-48 bg-gray-200">
                {gig.images_url?.[0] ? (
                  <img
                    src={gig.images_url[0]}
                    alt={gig.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50">
                    <FaShoppingCart className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{gig.title}</h3>
                  <span className="text-green-600 font-bold">{gig.price || 0} DH</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {gig.description}
                </p>

                {/* Freelancer */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {gig.freelancer?.username || 'Freelancer'}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{gig.gig_rating || 5.0}</span>
                      <span className="mx-2">•</span>
                      <FaClock className="mr-1" />
                      <span>{gig.delivery_days || 3} jours</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {gig.search_tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Boutons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium">
                    <FaShoppingCart className="inline mr-2" />
                    Commander
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun service trouvé</h3>
          <p className="text-gray-600 mb-6">Essayez de modifier vos filtres de recherche</p>
          <button
            onClick={() => setFilters({
              category: '',
              minPrice: '',
              maxPrice: '',
              sortBy: 'popular'
            })}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Pagination */}
      {gigs.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Suivant
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}