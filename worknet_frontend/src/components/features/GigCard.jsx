import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaEye, FaHeart, FaClock } from 'react-icons/fa';

const GigCard = ({ gig, showActions = false, onEdit, onDelete, onToggleStatus }) => {
  const {
    _id,
    title,
    description,
    price,
    delivery_days,
    images_url,
    gig_rating,
    total_orders,
    status,
    category_id,
    slug
  } = gig;

  const gigImage = images_url?.[0] || 'https://via.placeholder.com/400x300?text=WorkNet';

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'pending': return 'En attente';
      case 'draft': return 'Brouillon';
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={gigImage}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badge de statut */}
        {status && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {getStatusLabel(status)}
          </span>
        )}
        
        {/* Overlay d'actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
            <FaHeart className="text-gray-600" />
          </button>
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
            <FaEye className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Catégorie */}
        {category_id?.name && (
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-green-600 bg-green-50 rounded-full">
            {category_id.name}
          </span>
        )}

        {/* Titre */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Rating et commandes */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-medium">{gig_rating?.toFixed(1) || '0.0'}</span>
              <span className="text-gray-500 ml-1">({total_orders || 0})</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <FaClock className="mr-1" />
            <span>{delivery_days} jours</span>
          </div>
        </div>

        {/* Prix et actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {price?.toLocaleString()} DH
            </span>
          </div>
          
          {showActions ? (
            <div className="flex space-x-2">
              <Link
                to={`/freelancer/gigs/${_id}/edit`}
                className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg"
                title="Modifier"
              >
                ✏️
              </Link>
              <button
                onClick={() => onDelete?.(_id, title)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          ) : (
            <Link
              to={`/gigs/${slug || _id}`}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center text-sm font-medium"
            >
              <FaShoppingCart className="mr-2" />
              Voir détails
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigCard;