// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { 
//   FaStar, 
//   FaShoppingCart, 
//   FaHeart, 
//   FaShareAlt,
//   FaCheck,
//   FaClock,
//   FaSync,
//   FaShieldAlt,
//   FaEnvelope
// } from 'react-icons/fa'
// import gigService from '../../services/gigService';
// import { orderService } from '../../services/orderService'

// export default function GigDetails() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [gig, setGig] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [selectedPackage, setSelectedPackage] = useState('basic')
//   const [quantity, setQuantity] = useState(1)

//   useEffect(() => {
//     fetchGigDetails()
//   }, [id])

//   const fetchGigDetails = async () => {
//     setLoading(true)
//     try {
//       const data = await gigService.getGigById(id)
//       setGig(data)
//     } catch (error) {
//       console.error('Failed to fetch gig details:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleOrder = async () => {
//     try {
//       const orderData = {
//         gigId: id,
//         package: selectedPackage,
//         quantity,
//         total: gig.packages[selectedPackage].price * quantity
//       }
//       await orderService.createOrder(orderData)
//       navigate('/checkout')
//     } catch (error) {
//       console.error('Failed to create order:', error)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading gig details...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!gig) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-5xl mb-4">😕</div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">Gig not found</h3>
//           <p className="text-gray-600">The service you're looking for doesn't exist</p>
//           <button
//             onClick={() => navigate('/gigs')}
//             className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
//           >
//             Browse Services
//           </button>
//         </div>
//       </div>
//     )
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
//             <div className="flex items-center space-x-4">
//               <button className="text-gray-600 hover:text-green-500">Help</button>
//               <button className="text-gray-600 hover:text-green-500">Orders</button>
//               <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//                 Dashboard
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Gig Info */}
//           <div className="lg:col-span-2">
//             {/* Breadcrumb */}
//             <div className="text-sm text-gray-600 mb-6">
//               <span className="hover:text-green-500 cursor-pointer">Services</span>
//               <span className="mx-2">›</span>
//               <span className="hover:text-green-500 cursor-pointer">{gig.category}</span>
//               <span className="mx-2">›</span>
//               <span className="text-gray-900">{gig.title}</span>
//             </div>

//             <h1 className="text-3xl font-bold text-gray-900 mb-4">{gig.title}</h1>
            
//             {/* Seller Info */}
//             <div className="flex items-center mb-8 p-4 bg-white rounded-lg border border-gray-200">
//               <img
//                 src={gig.seller.avatar}
//                 alt={gig.seller.name}
//                 className="w-16 h-16 rounded-full mr-4"
//               />
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900">{gig.seller.name}</h3>
//                 <div className="flex items-center mt-1">
//                   <div className="flex text-yellow-400 mr-2">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar key={i} className={i < gig.seller.rating ? 'fill-current' : 'text-gray-300'} />
//                     ))}
//                   </div>
//                   <span className="text-gray-600">({gig.seller.reviews} reviews)</span>
//                 </div>
//               </div>
//               <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
//                 <FaEnvelope className="mr-2" />
//                 Contact
//               </button>
//             </div>

//             {/* Gig Images */}
//             <div className="mb-8">
//               <img
//                 src={gig.images[0]}
//                 alt={gig.title}
//                 className="w-full h-96 object-cover rounded-lg mb-4"
//               />
//               <div className="grid grid-cols-4 gap-2">
//                 {gig.images.slice(1).map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={`${gig.title} ${idx + 2}`}
//                     className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-90"
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
//               <div className="prose max-w-none">
//                 <p className="text-gray-700 whitespace-pre-line">{gig.description}</p>
//               </div>
//             </div>

//             {/* FAQ */}
//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
//               {gig.faq.map((item, idx) => (
//                 <div key={idx} className="mb-4 last:mb-0">
//                   <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
//                   <p className="text-gray-600">{item.answer}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Column - Order Section */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-8">
//               <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <span className="text-3xl font-bold text-gray-900">${gig.price}</span>
//                     <span className="text-gray-600 ml-2">starting at</span>
//                   </div>
//                   <div className="flex space-x-2">
//                     <button className="p-2 text-gray-400 hover:text-red-500">
//                       <FaHeart />
//                     </button>
//                     <button className="p-2 text-gray-400 hover:text-green-500">
//                       <FaShareAlt />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Package Selection */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-900 mb-3">Select Package</h3>
//                   <div className="space-y-3">
//                     {Object.entries(gig.packages).map(([key, pkg]) => (
//                       <div
//                         key={key}
//                         className={`p-4 border rounded-lg cursor-pointer ${
//                           selectedPackage === key
//                             ? 'border-green-500 bg-green-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                         onClick={() => setSelectedPackage(key)}
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
//                           <span className="text-xl font-bold text-gray-900">${pkg.price}</span>
//                         </div>
//                         <p className="text-gray-600 text-sm mb-2">{pkg.description}</p>
//                         <div className="text-sm text-gray-500">
//                           <div className="flex items-center">
//                             <FaClock className="mr-2" /> Delivery: {pkg.deliveryTime} days
//                           </div>
//                           <div className="flex items-center mt-1">
//                             <FaSync className="mr-2" /> Revisions: {pkg.revisions}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quantity */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
//                   <div className="flex items-center">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-50"
//                     >
//                       -
//                     </button>
//                     <div className="px-4 py-2 border-t border-b border-gray-300">
//                       {quantity}
//                     </div>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-50"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {/* Total */}
//                 <div className="mb-6">
//                   <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                     <span className="font-semibold text-gray-900">Total</span>
//                     <span className="text-2xl font-bold text-gray-900">
//                       ${(gig.packages[selectedPackage].price * quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Order Button */}
//                 <button
//                   onClick={handleOrder}
//                   className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center mb-4"
//                 >
//                   <FaShoppingCart className="mr-2" />
//                   Continue (${(gig.packages[selectedPackage].price * quantity).toFixed(2)})
//                 </button>

//                 {/* Guarantee */}
//                 <div className="text-center text-sm text-gray-500">
//                   <div className="flex items-center justify-center mb-2">
//                     <FaShieldAlt className="mr-2 text-green-500" />
//                     <span>100% Satisfaction Guarantee</span>
//                   </div>
//                   <div className="flex items-center justify-center">
//                     <FaCheck className="mr-2 text-green-500" />
//                     <span>Secure Payment</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Seller Stats */}
//               <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
//                 <h3 className="font-semibold text-gray-900 mb-4">About The Seller</h3>
//                 <div className="grid grid-cols-2 gap-4 text-center">
//                   <div>
//                     <div className="text-2xl font-bold text-gray-900">{gig.seller.completedOrders}+</div>
//                     <div className="text-sm text-gray-600">Orders Completed</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-gray-900">{gig.seller.rating}/5</div>
//                     <div className="text-sm text-gray-600">Seller Rating</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-gray-900">{gig.seller.responseTime}h</div>
//                     <div className="text-sm text-gray-600">Avg. Response Time</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-gray-100">{gig.seller.onTimeDelivery}%</div>
//                     <div className="text-sm text-gray-600">On-Time Delivery</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaStar, 
  FaClock, 
  FaCheckCircle, 
  FaShoppingCart, 
  FaHeart,
  FaShare,
  FaUserCircle,
  FaArrowLeft,
  FaImages
} from 'react-icons/fa';
import gigService from '../../services/gigService';

export default function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadGigDetails();
  }, [id]);

  const loadGigDetails = async () => {
    try {
      setLoading(true);
      const response = await gigService.getGigById(id);
      setGig(response.data?.gig || response.data);
    } catch (error) {
      console.error('Error loading gig details:', error);
    } finally {
      setLoading(false);
    }
  };

  const packages = [
    {
      id: 'basic',
      name: 'Basic',
      price: gig?.price || 0,
      description: 'Le package essentiel',
      deliveryDays: gig?.delivery_days || 3,
      revisions: gig?.revisions_included || 1,
      features: ['Design basique', '1 révision', 'Support standard']
    },
    {
      id: 'standard',
      name: 'Standard',
      price: (gig?.price || 0) * 1.5,
      description: 'Le plus populaire',
      deliveryDays: gig?.delivery_days || 2,
      revisions: gig?.revisions_included || 2,
      features: ['Design amélioré', '2 révisions', 'Support prioritaire', 'Fichiers sources']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: (gig?.price || 0) * 2,
      description: 'Le meilleur package',
      deliveryDays: gig?.delivery_days || 1,
      revisions: gig?.revisions_included || 3,
      features: ['Design premium', 'Révisions illimitées', 'Support 24/7', 'Livraison express', 'Fichiers sources']
    }
  ];

  const handleOrder = () => {
    const selected = packages.find(p => p.id === selectedPackage);
    const orderData = {
      gigId: id,
      package: selected.name,
      quantity,
      totalPrice: selected.price * quantity,
      gigTitle: gig?.title
    };
    
    navigate('/client/checkout', { state: orderData });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service non trouvé</h2>
          <button
            onClick={() => navigate('/client/browse')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            <FaArrowLeft className="inline mr-2" />
            Retour aux services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bouton retour */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/client/browse')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Retour aux services
        </button>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche */}
          <div className="lg:col-span-2">
            {/* Galerie */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              {gig.images_url && gig.images_url.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <img
                      src={gig.images_url[0]}
                      alt={gig.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                  {gig.images_url.slice(1, 3).map((img, index) => (
                    <div key={index}>
                      <img
                        src={img}
                        alt={`${gig.title} ${index + 2}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-96 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                  <FaImages className="text-6xl text-gray-300" />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description du service</h2>
              <div className="prose max-w-none text-gray-700">
                <p>{gig.description}</p>
                
                {gig.requirements_description && (
                  <>
                    <h3 className="text-xl font-semibold mt-6 mb-3">Ce dont j'ai besoin</h3>
                    <p>{gig.requirements_description}</p>
                  </>
                )}
              </div>
            </div>

            {/* À propos du freelancer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">À propos du vendeur</h2>
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{gig.freelancer?.username || 'Freelancer'}</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{gig.freelancer?.rating || 5.0}</span>
                      <span className="text-gray-600 ml-1">({gig.freelancer?.total_reviews || 0} avis)</span>
                    </div>
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-1" />
                      <span>{gig.freelancer?.completed_orders || 0} commandes</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {gig.freelancer?.bio || 'Freelancer professionnel avec plusieurs années d\'expérience.'}
                  </p>
                  <div className="flex space-x-4">
                    <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Contacter
                    </button>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Voir le profil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Commander */}
          <div>
            <div className="sticky top-6">
              {/* Package selection */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sélectionnez un package</h2>
                <div className="space-y-4">
                  {packages.map(pkg => (
                    <div
                      key={pkg.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPackage === pkg.id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                          <p className="text-sm text-gray-600">{pkg.description}</p>
                        </div>
                        <span className="text-2xl font-bold text-green-600">{pkg.price} DH</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-4">
                          <span><FaClock className="inline mr-1" /> {pkg.deliveryDays} jours</span>
                          <span><FaCheckCircle className="inline mr-1" /> {pkg.revisions} révisions</span>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-700">
                            ✓ {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Order */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-4 py-2 border border-gray-300 rounded-l-lg"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center border-y border-gray-300 py-2">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-4 py-2 border border-gray-300 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Résumé */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Prix unitaire</span>
                    <span className="font-medium">
                      {packages.find(p => p.id === selectedPackage)?.price || 0} DH
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Quantité</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Frais de service</span>
                    <span className="font-medium">
                      {((packages.find(p => p.id === selectedPackage)?.price || 0) * quantity * 0.1).toFixed(2)} DH
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">
                        {((packages.find(p => p.id === selectedPackage)?.price || 0) * quantity * 1.1).toFixed(2)} DH
                      </span>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  <button
                    onClick={handleOrder}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-bold text-lg"
                  >
                    <FaShoppingCart className="inline mr-2" />
                    Commander maintenant
                  </button>
                  <button className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50 font-medium">
                    <FaHeart className="inline mr-2" />
                    Ajouter aux favoris
                  </button>
                  <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
                    <FaShare className="inline mr-2" />
                    Partager
                  </button>
                </div>

                {/* Garanties */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>Garantie de remboursement</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="text-green-500 mr-2" />
                    <span>Livraison à temps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}