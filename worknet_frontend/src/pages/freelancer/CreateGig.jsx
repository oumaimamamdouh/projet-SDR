// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { FaUpload, FaTag, FaDollarSign, FaCalendarAlt, FaImage } from 'react-icons/fa';

// // export default function CreateGig() {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     category: 'web',
// //     description: '',
// //     basePrice: '',
// //     deliveryDays: '3',
// //     revisions: '2',
// //     tags: '',
// //     requirements: '',
// //     images: []
// //   });
// //   const [loading, setLoading] = useState(false);

// //   const categories = [
// //     { value: 'web', label: 'Développement Web' },
// //     { value: 'design', label: 'Design Graphique' },
// //     { value: 'marketing', label: 'Marketing Digital' },
// //     { value: 'writing', label: 'Rédaction & Traduction' },
// //     { value: 'video', label: 'Vidéo & Animation' },
// //     { value: 'music', label: 'Musique & Audio' },
// //     { value: 'business', label: 'Business' }
// //   ];

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleImageUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     const newImages = files.map(file => ({
// //       id: Date.now() + Math.random(),
// //       name: file.name,
// //       preview: URL.createObjectURL(file)
// //     }));
// //     setFormData(prev => ({
// //       ...prev,
// //       images: [...prev.images, ...newImages].slice(0, 3) // Max 3 images
// //     }));
// //   };

// //   const removeImage = (id) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       images: prev.images.filter(img => img.id !== id)
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     // Simuler la création
// //     setTimeout(() => {
// //       setLoading(false);
// //       alert('Service créé avec succès!');
// //       navigate('/freelancer/gigs');
// //     }, 1500);
// //   };

// //   const calculateTotal = () => {
// //     const price = parseFloat(formData.basePrice) || 0;
// //     const serviceFee = price * 0.20; // 20% de frais de service
// //     return {
// //       price,
// //       serviceFee,
// //       total: price + serviceFee
// //     };
// //   };

// //   const totals = calculateTotal();

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-gray-900">Créer un nouveau service</h1>
// //           <p className="text-gray-600 mt-2">
// //             Remplissez les informations ci-dessous pour créer votre service freelance
// //           </p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-8">
// //           {/* Basic Information */}
// //           <div className="bg-white rounded-xl p-6 border border-gray-200">
// //             <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de base</h2>
            
// //             <div className="space-y-6">
// //               {/* Title */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Titre du service *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="title"
// //                   required
// //                   value={formData.title}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                   placeholder="Ex: Développement de site web WordPress"
// //                   maxLength={80}
// //                 />
// //                 <p className="text-sm text-gray-500 mt-2">
// //                   {formData.title.length}/80 caractères
// //                 </p>
// //               </div>

// //               {/* Category */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Catégorie *
// //                 </label>
// //                 <select
// //                   name="category"
// //                   required
// //                   value={formData.category}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                 >
// //                   {categories.map(cat => (
// //                     <option key={cat.value} value={cat.value}>
// //                       {cat.label}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Description */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Description détaillée *
// //                 </label>
// //                 <textarea
// //                   name="description"
// //                   required
// //                   rows={6}
// //                   value={formData.description}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                   placeholder="Décrivez en détail ce que vous offrez, vos compétences, votre processus de travail..."
// //                   maxLength={1200}
// //                 />
// //                 <p className="text-sm text-gray-500 mt-2">
// //                   {formData.description.length}/1200 caractères
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Pricing & Delivery */}
// //           <div className="bg-white rounded-xl p-6 border border-gray-200">
// //             <h2 className="text-xl font-bold text-gray-900 mb-6">Tarification & Livraison</h2>
            
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               {/* Price */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Prix de base (USD) *
// //                 </label>
// //                 <div className="relative">
// //                   <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   <input
// //                     type="number"
// //                     name="basePrice"
// //                     required
// //                     min="5"
// //                     step="0.01"
// //                     value={formData.basePrice}
// //                     onChange={handleChange}
// //                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                     placeholder="Ex: 99"
// //                   />
// //                 </div>
// //                 <p className="text-sm text-gray-500 mt-2">Le prix minimum est de $5</p>
// //               </div>

// //               {/* Delivery Days */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Délai de livraison (jours) *
// //                 </label>
// //                 <div className="relative">
// //                   <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                   <select
// //                     name="deliveryDays"
// //                     required
// //                     value={formData.deliveryDays}
// //                     onChange={handleChange}
// //                     className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                   >
// //                     <option value="1">1 jour</option>
// //                     <option value="2">2 jours</option>
// //                     <option value="3">3 jours</option>
// //                     <option value="5">5 jours</option>
// //                     <option value="7">7 jours</option>
// //                     <option value="10">10 jours</option>
// //                     <option value="14">14 jours</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               {/* Revisions */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Révisions incluses *
// //                 </label>
// //                 <select
// //                   name="revisions"
// //                   required
// //                   value={formData.revisions}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                 >
// //                   <option value="0">0 révision</option>
// //                   <option value="1">1 révision</option>
// //                   <option value="2">2 révisions</option>
// //                   <option value="3">3 révisions</option>
// //                   <option value="unlimited">Révisions illimitées</option>
// //                 </select>
// //               </div>

// //               {/* Preview Card */}
// //               <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
// //                 <h3 className="font-medium text-gray-900 mb-3">Aperçu pour les clients:</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                   <div className="bg-white p-4 rounded-lg border">
// //                     <div className="text-sm text-gray-600">Prix de base</div>
// //                     <div className="text-xl font-bold text-gray-900">${totals.price.toFixed(2)}</div>
// //                   </div>
// //                   <div className="bg-white p-4 rounded-lg border">
// //                     <div className="text-sm text-gray-600">Frais de service (20%)</div>
// //                     <div className="text-xl font-bold text-gray-900">${totals.serviceFee.toFixed(2)}</div>
// //                   </div>
// //                   <div className="bg-white p-4 rounded-lg border">
// //                     <div className="text-sm text-gray-600">Total pour le client</div>
// //                     <div className="text-xl font-bold text-green-600">${totals.total.toFixed(2)}</div>
// //                   </div>
// //                 </div>
// //                 <p className="text-sm text-gray-500 mt-3">
// //                   Vous recevrez: ${totals.price.toFixed(2)} (80% du total)
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Images */}
// //           <div className="bg-white rounded-xl p-6 border border-gray-200">
// //             <h2 className="text-xl font-bold text-gray-900 mb-6">Images du service</h2>
            
// //             <div className="space-y-4">
// //               <div className="flex items-center justify-center w-full">
// //                 <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
// //                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
// //                     <FaImage className="w-12 h-12 mb-4 text-gray-400" />
// //                     <p className="mb-2 text-sm text-gray-500">
// //                       <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
// //                     </p>
// //                     <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB (max 3 images)</p>
// //                   </div>
// //                   <input
// //                     type="file"
// //                     className="hidden"
// //                     accept="image/*"
// //                     multiple
// //                     onChange={handleImageUpload}
// //                   />
// //                 </label>
// //               </div>

// //               {/* Preview Images */}
// //               {formData.images.length > 0 && (
// //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                   {formData.images.map(img => (
// //                     <div key={img.id} className="relative group">
// //                       <img
// //                         src={img.preview}
// //                         alt="Preview"
// //                         className="w-full h-48 object-cover rounded-lg"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => removeImage(img.id)}
// //                         className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
// //                       >
// //                         ×
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Tags & Requirements */}
// //           <div className="bg-white rounded-xl p-6 border border-gray-200">
// //             <h2 className="text-xl font-bold text-gray-900 mb-6">Optimisation</h2>
            
// //             <div className="space-y-6">
// //               {/* Tags */}
// //               <div>
// //                 <label className="text-gray-700 font-medium mb-2 flex items-center">
// //                   <FaTag className="mr-2" />
// //                   Mots-clés (tags)
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="tags"
// //                   value={formData.tags}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                   placeholder="Ex: web development, react, wordpress, e-commerce"
// //                 />
// //                 <p className="text-sm text-gray-500 mt-2">
// //                   Séparez les tags par des virgules. Maximum 5 tags.
// //                 </p>
// //               </div>

// //               {/* Requirements */}
// //               <div>
// //                 <label className="block text-gray-700 font-medium mb-2">
// //                   Exigences pour le client
// //                 </label>
// //                 <textarea
// //                   name="requirements"
// //                   rows={4}
// //                   value={formData.requirements}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                   placeholder="Quelles informations avez-vous besoin du client pour commencer? Ex: informations sur l'entreprise, préférences de design, délais..."
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Submit Buttons */}
// //           <div className="flex justify-end space-x-4">
// //             <button
// //               type="button"
// //               onClick={() => navigate('/freelancer/gigs')}
// //               className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
// //             >
// //               Annuler
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center"
// //             >
// //               {loading ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
// //                   Création en cours...
// //                 </>
// //               ) : (
// //                 <>
// //                   <FaUpload className="mr-2" />
// //                   Publier le service
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         </form>

// //         {/* Help Tips */}
// //         <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
// //           <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Conseils pour un bon service</h3>
// //           <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //             <li className="flex items-start">
// //               <span className="text-blue-600 font-bold mr-2">•</span>
// //               <span className="text-gray-700">Utilisez un titre clair et descriptif</span>
// //             </li>
// //             <li className="flex items-start">
// //               <span className="text-blue-600 font-bold mr-2">•</span>
// //               <span className="text-gray-700">Ajoutez des images de haute qualité</span>
// //             </li>
// //             <li className="flex items-start">
// //               <span className="text-blue-600 font-bold mr-2">•</span>
// //               <span className="text-gray-700">Soyez précis sur les délais de livraison</span>
// //             </li>
// //             <li className="flex items-start">
// //               <span className="text-blue-600 font-bold mr-2">•</span>
// //               <span className="text-gray-700">Définissez clairement ce qui est inclus</span>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   FaUpload, 
//   FaTag, 
//   FaDollarSign, 
//   FaCalendar,
//   FaImages,
//   FaCheckCircle,
//   FaArrowLeft
// } from 'react-icons/fa';
// import gigService from '../../services/gigService';
// import categoryService from '../../services/categoryService';

// export default function CreateGig() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [step, setStep] = useState(1);
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category_id: '',
//     price: '',
//     delivery_days: 3,
//     revisions_included: 1,
//     requirements_description: '',
//     search_tags: [],
//     pricing_type: 'fixed',
//     currency: 'USD'
//   });
//   const [images, setImages] = useState([]);

//   // Charger les catégories au montage
//   useState(() => {
//     loadCategories();
//   }, []);

//   const loadCategories = async () => {
//     try {
//       const response = await categoryService.getAllCategories();
//       setCategories(response.data?.categories || []);
//     } catch (error) {
//       console.error('Error loading categories:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleTagsChange = (e) => {
//     const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
//     setFormData(prev => ({
//       ...prev,
//       search_tags: tags
//     }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     // Simuler le téléchargement d'images
//     const newImages = files.map(file => ({
//       id: Date.now() + Math.random(),
//       name: file.name,
//       url: URL.createObjectURL(file),
//       file
//     }));
//     setImages([...images, ...newImages]);
//   };

//   const removeImage = (id) => {
//     setImages(images.filter(img => img.id !== id));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const gigData = {
//         ...formData,
//         price: parseFloat(formData.price),
//         delivery_days: parseInt(formData.delivery_days),
//         revisions_included: parseInt(formData.revisions_included),
//         status: 'active'
//       };

//       console.log('Creating gig:', gigData);
      
//       const response = await gigService.createGig(gigData);
      
//       if (response.success) {
//         alert('Service créé avec succès !');
//         navigate('/freelancer/my-gigs');
//       } else {
//         alert('Erreur: ' + (response.error || 'Impossible de créer le service'));
//       }
//     } catch (error) {
//       console.error('Error creating gig:', error);
//       alert('Une erreur est survenue lors de la création du service');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (step < 4) setStep(step + 1);
//   };

//   const prevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const steps = [
//     { number: 1, title: 'Informations de base' },
//     { number: 2, title: 'Détails et tarifs' },
//     { number: 3, title: 'Médias et tags' },
//     { number: 4, title: 'Récapitulatif' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Navigation */}
//       <div className="mb-8">
//         <button
//           onClick={() => navigate('/freelancer/my-gigs')}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
//         >
//           <FaArrowLeft className="mr-2" />
//           Retour à mes services
//         </button>
        
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Créer un nouveau service
//         </h1>
//         <p className="text-gray-600">
//           Remplissez les informations ci-dessous pour créer votre service
//         </p>
//       </div>

//       {/* Étapes */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//         <div className="flex justify-between mb-8">
//           {steps.map((s, index) => (
//             <div key={s.number} className="flex flex-col items-center">
//               <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
//                 step === s.number ? 'bg-green-600 text-white' :
//                 step > s.number ? 'bg-green-100 text-green-600' :
//                 'bg-gray-100 text-gray-400'
//               }`}>
//                 {step > s.number ? <FaCheckCircle /> : s.number}
//               </div>
//               <span className={`text-sm font-medium ${
//                 step === s.number ? 'text-green-600' :
//                 step > s.number ? 'text-green-700' :
//                 'text-gray-500'
//               }`}>
//                 {s.title}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="border-t border-gray-200 pt-8">
//           <form onSubmit={handleSubmit}>
//             {step === 1 && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Titre du service *
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="ex: Je créerai un logo professionnel pour votre entreprise"
//                     required
//                   />
//                   <p className="text-sm text-gray-500 mt-1">
//                     Décrivez clairement ce que vous offrez
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Catégorie *
//                   </label>
//                   <select
//                     name="category_id"
//                     value={formData.category_id}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     required
//                   >
//                     <option value="">Sélectionnez une catégorie</option>
//                     {categories.map(cat => (
//                       <option key={cat._id} value={cat._id}>{cat.name}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description détaillée *
//                   </label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     rows={6}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="Décrivez en détail ce que vous allez fournir, vos compétences, votre expérience..."
//                     required
//                   />
//                 </div>
//               </div>
//             )}

//             {step === 2 && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <FaDollarSign className="inline mr-2" />
//                       Prix de base (DH) *
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       placeholder="ex: 500"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       <FaCalendar className="inline mr-2" />
//                       Délai de livraison (jours) *
//                     </label>
//                     <input
//                       type="number"
//                       name="delivery_days"
//                       value={formData.delivery_days}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                       min="1"
//                       max="30"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Nombre de révisions incluses
//                   </label>
//                   <select
//                     name="revisions_included"
//                     value={formData.revisions_included}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   >
//                     <option value="0">Aucune révision</option>
//                     <option value="1">1 révision</option>
//                     <option value="2">2 révisions</option>
//                     <option value="3">3 révisions</option>
//                     <option value="999">Révisions illimitées</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Exigences pour le client
//                   </label>
//                   <textarea
//                     name="requirements_description"
//                     value={formData.requirements_description}
//                     onChange={handleChange}
//                     rows={4}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="Indiquez ce dont vous avez besoin du client pour démarrer le projet (ex: brief, logo existant, etc.)"
//                   />
//                 </div>
//               </div>
//             )}

//             {step === 3 && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-4">
//                     <FaImages className="inline mr-2" />
//                     Images du service
//                   </label>
                  
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                     <FaUpload className="text-4xl text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-600 mb-4">
//                       Glissez-déposez vos images ici, ou cliquez pour sélectionner
//                     </p>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 cursor-pointer"
//                     >
//                       Sélectionner des images
//                     </label>
//                     <p className="text-sm text-gray-500 mt-2">
//                       JPG, PNG ou GIF. Max 10MB par image.
//                     </p>
//                   </div>

//                   {images.length > 0 && (
//                     <div className="mt-6">
//                       <h4 className="font-medium text-gray-900 mb-4">
//                         Images sélectionnées ({images.length})
//                       </h4>
//                       <div className="grid grid-cols-4 gap-4">
//                         {images.map(img => (
//                           <div key={img.id} className="relative">
//                             <img
//                               src={img.url}
//                               alt={img.name}
//                               className="w-full h-32 object-cover rounded-lg"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => removeImage(img.id)}
//                               className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
//                             >
//                               ×
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <FaTag className="inline mr-2" />
//                     Tags de recherche
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.search_tags.join(', ')}
//                     onChange={handleTagsChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                     placeholder="logo, design, branding, entreprise, moderne (séparés par des virgules)"
//                   />
//                   <p className="text-sm text-gray-500 mt-1">
//                     Ajoutez des mots-clés pour aider les clients à trouver votre service
//                   </p>
//                 </div>
//               </div>
//             )}

//             {step === 4 && (
//               <div className="space-y-6">
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                   <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
//                     <FaCheckCircle className="mr-2" />
//                     Récapitulatif de votre service
//                   </h3>
                  
//                   <div className="space-y-4">
//                     <div className="flex justify-between border-b border-green-100 pb-2">
//                       <span className="text-gray-700">Titre:</span>
//                       <span className="font-medium">{formData.title || 'Non spécifié'}</span>
//                     </div>
                    
//                     <div className="flex justify-between border-b border-green-100 pb-2">
//                       <span className="text-gray-700">Catégorie:</span>
//                       <span className="font-medium">
//                         {categories.find(c => c._id === formData.category_id)?.name || 'Non spécifiée'}
//                       </span>
//                     </div>
                    
//                     <div className="flex justify-between border-b border-green-100 pb-2">
//                       <span className="text-gray-700">Prix:</span>
//                       <span className="font-medium text-green-600">{formData.price || 0} DH</span>
//                     </div>
                    
//                     <div className="flex justify-between border-b border-green-100 pb-2">
//                       <span className="text-gray-700">Délai de livraison:</span>
//                       <span className="font-medium">{formData.delivery_days} jours</span>
//                     </div>
                    
//                     <div className="flex justify-between border-b border-green-100 pb-2">
//                       <span className="text-gray-700">Révisions incluses:</span>
//                       <span className="font-medium">{formData.revisions_included}</span>
//                     </div>
                    
//                     <div className="flex justify-between border-b border-green-100 pb-2">
//                       <span className="text-gray-700">Nombre d'images:</span>
//                       <span className="font-medium">{images.length}</span>
//                     </div>
                    
//                     <div className="flex justify-between border-b border-green-100 pb-2">
//                       <span className="text-gray-700">Tags:</span>
//                       <span className="font-medium">{formData.search_tags.length} tags</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                   <h4 className="font-medium text-yellow-800 mb-2">Conseils pour réussir:</h4>
//                   <ul className="text-sm text-yellow-700 space-y-1">
//                     <li>✓ Utilisez des images de haute qualité</li>
//                     <li>✓ Soyez précis dans votre description</li>
//                     <li>✓ Fixez un prix compétitif</li>
//                     <li>✓ Répondez rapidement aux messages des clients</li>
//                   </ul>
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className={`px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 ${step === 1 ? 'invisible' : ''}`}
//               >
//                 Précédent
//               </button>
              
//               {step < 4 ? (
//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                 >
//                   Suivant
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Création en cours...' : 'Publier le service'}
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  FaSave, 
  FaTimes, 
  FaUpload, 
  FaTag, 
  FaImage,
  FaDollarSign,
  FaCalendarDay,
  FaEdit
} from 'react-icons/fa';
import gigService from '../../services/gigService';
import categoryService from '../../services/categoryService';

const CreateGig = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    base_price: '',
    delivery_days: 3,
    revisions_included: 1,
    requirements_description: '',
    search_tags: [],
    tagInput: '',
    currency: 'USD',
    pricing_type: 'fixed'
  });

  // Récupérer les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await categoryService.getAllCategories();
        if (result.success) {
          setCategories(result.categories || []);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    const tag = formData.tagInput.trim();
    if (tag && !formData.search_tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        search_tags: [...prev.search_tags, tag],
        tagInput: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      search_tags: prev.search_tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.title.trim()) errors.push('Le titre est requis');
    if (!formData.description.trim()) errors.push('La description est requise');
    if (!formData.category_id) errors.push('La catégorie est requise');
    if (!formData.base_price || formData.base_price <= 0) errors.push('Le prix doit être supérieur à 0');
    if (!formData.delivery_days || formData.delivery_days < 1) errors.push('Le délai de livraison doit être d\'au moins 1 jour');
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    setLoading(true);
    
    try {
      const gigData = {
        title: formData.title,
        description: formData.description,
        category_id: formData.category_id,
        base_price: parseFloat(formData.base_price),
        delivery_days: parseInt(formData.delivery_days),
        revisions_included: parseInt(formData.revisions_included),
        requirements_description: formData.requirements_description,
        search_tags: formData.search_tags,
        currency: formData.currency,
        pricing_type: formData.pricing_type
      };

      const result = await gigService.createGig(gigData);
      
      if (result.success) {
        toast.success('Service créé avec succès !');
        navigate('/freelancer/my-gigs');
      } else {
        toast.error(result.error || 'Erreur lors de la création du service');
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Create gig error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Créer un nouveau service</h1>
        <p className="text-gray-600 mt-2">
          Remplissez les informations ci-dessous pour créer votre service et commencer à recevoir des commandes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations de base */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <FaEdit className="mr-2 text-green-600" />
            Informations de base
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du service *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Ex: Développement de site web WordPress professionnel"
                maxLength={100}
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.title.length}/100 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description détaillée *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Décrivez en détail ce que vous offrez dans ce service. Soyez précis et mentionnez ce qui est inclus."
              />
              <p className="mt-1 text-sm text-gray-500">
                Décrivez clairement votre service pour attirer les bons clients.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Prix et délai */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <FaDollarSign className="mr-2 text-green-600" />
            Prix et délai
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix de base (DH) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">DH</span>
                </div>
                <input
                  type="number"
                  name="base_price"
                  value={formData.base_price}
                  onChange={handleInputChange}
                  min="1"
                  step="1"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Délai de livraison (jours) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarDay className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="delivery_days"
                  value={formData.delivery_days}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Révisions incluses
              </label>
              <select
                name="revisions_included"
                value={formData.revisions_included}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                <option value="0">0 révision</option>
                <option value="1">1 révision</option>
                <option value="2">2 révisions</option>
                <option value="3">3 révisions</option>
                <option value="unlimited">Révisions illimitées</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de prix
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="pricing_type"
                  value="fixed"
                  checked={formData.pricing_type === 'fixed'}
                  onChange={handleInputChange}
                  className="text-green-600 focus:ring-green-500"
                />
                <span className="ml-2">Prix fixe</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="pricing_type"
                  value="hourly"
                  checked={formData.pricing_type === 'hourly'}
                  onChange={handleInputChange}
                  className="text-green-600 focus:ring-green-500"
                />
                <span className="ml-2">Tarif horaire</span>
              </label>
            </div>
          </div>
        </div>

        {/* Tags et mots-clés */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <FaTag className="mr-2 text-green-600" />
            Mots-clés pour la recherche
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ajouter des tags
            </label>
            <div className="flex">
              <input
                type="text"
                value={formData.tagInput}
                onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Ex: web design, logo, marketing digital"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-3 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200"
              >
                Ajouter
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Appuyez sur Entrée ou cliquez sur Ajouter pour ajouter un tag
            </p>
          </div>

          {formData.search_tags.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {formData.search_tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Exigences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Exigences pour les clients
          </h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions pour les clients
            </label>
            <textarea
              name="requirements_description"
              value={formData.requirements_description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              placeholder="Dites aux clients ce dont vous avez besoin pour commencer le travail (ex: logo, couleurs, informations sur l'entreprise...)"
            />
            <p className="mt-1 text-sm text-gray-500">
              Ces informations seront affichées aux clients avant qu'ils ne passent commande.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/freelancer/my-gigs')}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <FaTimes className="mr-2" />
            Annuler
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Création en cours...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Créer le service
              </>
            )}
          </button>
        </div>
      </form>

      {/* Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-4">
          💡 Conseils pour créer un service performant
        </h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Utilisez un titre clair et descriptif</strong> qui explique exactement ce que vous offrez</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Soyez précis dans la description</strong> pour éviter les malentendus avec les clients</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Choisissez un prix compétitif</strong> en fonction de votre expérience et du marché</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Ajoutez des mots-clés pertinents</strong> pour être trouvé plus facilement</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Définissez des exigences claires</strong> pour recevoir toutes les informations nécessaires</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreateGig;