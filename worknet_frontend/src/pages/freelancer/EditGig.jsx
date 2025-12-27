import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaImage, FaTag, FaDollarSign, FaCalendarAlt, FaTimes } from 'react-icons/fa';

export default function EditGig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [gigData, setGigData] = useState({
    title: '',
    category: 'web',
    description: '',
    basePrice: '',
    deliveryDays: '3',
    revisions: '2',
    tags: '',
    requirements: '',
    images: [],
    status: 'active'
  });

  // Simuler le chargement des données
  useEffect(() => {
    setTimeout(() => {
      setGigData({
        title: 'Développement Web React/Node.js',
        category: 'web',
        description: 'Création de site web moderne avec React frontend et Node.js backend. Design responsive et base de données MongoDB. Parfait pour les startups et entreprises.',
        basePrice: '399',
        deliveryDays: '5',
        revisions: '2',
        tags: 'web,development,react,nodejs,mongodb',
        requirements: 'Fournir les spécifications du projet, les maquettes de design et les préférences de style.',
        images: [
          { id: 1, preview: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format' },
          { id: 2, preview: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&auto=format' }
        ],
        status: 'active'
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGigData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      preview: URL.createObjectURL(file)
    }));
    setGigData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 3)
    }));
  };

  const removeImage = (imageId) => {
    setGigData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Simuler la sauvegarde
    setTimeout(() => {
      setSaving(false);
      alert('Service modifié avec succès!');
      navigate('/freelancer/gigs');
    }, 1500);
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service? Cette action est irréversible.')) {
      // Ici, normalement tu supprimerais du backend
      alert('Service supprimé avec succès!');
      navigate('/freelancer/gigs');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données du service...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/freelancer/gigs')}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="text-xl" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Modifier le service</h1>
                <p className="text-gray-600 mt-2">Mettez à jour les informations de votre service</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de base</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Titre du service *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={gigData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: Développement de site web WordPress"
                  maxLength={80}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {gigData.title.length}/80 caractères
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Catégorie *
                </label>
                <select
                  name="category"
                  required
                  value={gigData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="web">Développement Web</option>
                  <option value="design">Design Graphique</option>
                  <option value="marketing">Marketing Digital</option>
                  <option value="writing">Rédaction & Traduction</option>
                  <option value="video">Vidéo & Animation</option>
                  <option value="music">Musique & Audio</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Description détaillée *
                </label>
                <textarea
                  name="description"
                  required
                  rows={6}
                  value={gigData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Décrivez en détail ce que vous offrez..."
                  maxLength={1200}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {gigData.description.length}/1200 caractères
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Delivery */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tarification & Livraison</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Prix de base (USD) *
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    name="basePrice"
                    required
                    min="5"
                    value={gigData.basePrice}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Délai de livraison (jours) *
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="deliveryDays"
                    required
                    value={gigData.deliveryDays}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 5, 7, 10, 14].map(days => (
                      <option key={days} value={days}>{days} jour{days > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Révisions incluses *
                </label>
                <select
                  name="revisions"
                  required
                  value={gigData.revisions}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="0">0 révision</option>
                  <option value="1">1 révision</option>
                  <option value="2">2 révisions</option>
                  <option value="3">3 révisions</option>
                  <option value="unlimited">Révisions illimitées</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Statut du service
                </label>
                <select
                  name="status"
                  value={gigData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="active">Actif</option>
                  <option value="paused">En pause</option>
                  <option value="draft">Brouillon</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Images du service</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {gigData.images.map(img => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.preview}
                    alt="Service"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

            {gigData.images.length < 3 && (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaImage className="w-12 h-12 mb-4 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      Cliquez pour ajouter des images
                    </p>
                    <p className="text-xs text-gray-500">Maximum 3 images</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Tags & Requirements */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Optimisation</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-gray-700 font-medium mb-2 flex items-center">
                  <FaTag className="mr-2" />
                  Mots-clés (tags)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={gigData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Séparez les tags par des virgules"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Ex: web development, react, wordpress, e-commerce
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Exigences pour le client
                </label>
                <textarea
                  name="requirements"
                  rows={4}
                  value={gigData.requirements}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Quelles informations avez-vous besoin du client?"
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/freelancer/gigs')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sauvegarde en cours...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Enregistrer les modifications
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}