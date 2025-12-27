import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaCheckCircle, FaClock, FaExclamationTriangle, 
  FaPaperclip, FaUpload, FaComments, FaCalendarAlt, 
  FaUser, FaMoneyBillWave, FaStar, FaDownload, FaShareAlt 
} from 'react-icons/fa';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [status, setStatus] = useState('in_progress');

  // Données de la commande (simulées)
  const order = {
    id: 'ORD-2025-1234',
    client: {
      name: 'Sarah Martin',
      email: 'sarah@example.com',
      joinDate: 'Jan 2024',
      completedOrders: 12,
      rating: 4.8
    },
    service: {
      title: 'Site Web E-commerce Premium',
      description: 'Site e-commerce complet avec panier, paiement et dashboard admin.',
      price: 850,
      deliveryDays: 7,
      revisions: 2
    },
    details: {
      createdAt: '2025-12-20',
      deadline: '2025-12-28',
      status: 'in_progress',
      progress: 75,
      requirements: 'Besoin d\'un site e-commerce pour une boutique de vêtements. Doit inclure: catalogue produits, panier, paiement sécurisé, dashboard admin.',
      files: [
        { name: 'brand_guidelines.pdf', size: '2.4 MB' },
        { name: 'logo.png', size: '1.2 MB' },
        { name: 'product_images.zip', size: '15 MB' }
      ]
    },
    timeline: [
      { action: 'Commande créée', date: '2025-12-20 10:30', by: 'Client' },
      { action: 'Commande confirmée', date: '2025-12-20 10:35', by: 'Vous' },
      { action: 'Travail commencé', date: '2025-12-21 09:00', by: 'Vous' },
      { action: 'Premier livrable', date: '2025-12-23 14:20', by: 'Vous' }
    ]
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleDeliver = () => {
    if (!deliveryMessage.trim()) {
      alert('Veuillez ajouter un message de livraison');
      return;
    }
    
    setStatus('delivered');
    alert('Commande livrée avec succès!');
  };

  const handleComplete = () => {
    setStatus('completed');
    alert('Commande marquée comme terminée!');
  };

  const getStatusInfo = () => {
    switch(status) {
      case 'pending': return { color: 'bg-yellow-100 text-yellow-800', icon: <FaClock />, text: 'En attente' };
      case 'in_progress': return { color: 'bg-blue-100 text-blue-800', icon: <FaClock />, text: 'En cours' };
      case 'delivered': return { color: 'bg-purple-100 text-purple-800', icon: <FaCheckCircle />, text: 'Livré' };
      case 'completed': return { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle />, text: 'Terminé' };
      default: return { color: 'bg-gray-100 text-gray-800', icon: null, text: status };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/freelancer/orders')}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="text-xl" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Commande #{order.id}</h1>
                <p className="text-gray-600 mt-2">
                  {order.service.title}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}>
                {statusInfo.icon && <span className="mr-2">{statusInfo.icon}</span>}
                {statusInfo.text}
              </span>
              <button className="flex items-center text-green-600 hover:text-green-700">
                <FaShareAlt className="mr-2" />
                Partager
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Détails */}
          <div className="lg:col-span-2">
            {/* Progression */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">Progression: {order.details.progress}%</span>
                  <span className="text-gray-500">
                    {Math.ceil((new Date(order.details.deadline) - new Date()) / (1000 * 60 * 60 * 24))} jours restants
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${order.details.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                {status === 'in_progress' && (
                  <>
                    <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
                      Mettre à jour la progression
                    </button>
                    <button
                      onClick={() => setStatus('delivered')}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
                    >
                      Livrer la commande
                    </button>
                  </>
                )}
                {status === 'delivered' && (
                  <button
                    onClick={handleComplete}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
                  >
                    Marquer comme terminé
                  </button>
                )}
                <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <FaComments />
                </button>
              </div>
            </div>

            {/* Exigences du client */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Exigences du client</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700">{order.details.requirements}</p>
              </div>

              {/* Fichiers joints */}
              <h4 className="font-medium text-gray-900 mb-3">Fichiers fournis par le client</h4>
              <div className="space-y-3">
                {order.details.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FaPaperclip className="text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{file.name}</div>
                        <div className="text-sm text-gray-500">{file.size}</div>
                      </div>
                    </div>
                    <button className="text-green-600 hover:text-green-700">
                      <FaDownload />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Livraison */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Livrer le travail</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message de livraison
                  </label>
                  <textarea
                    rows={4}
                    value={deliveryMessage}
                    onChange={(e) => setDeliveryMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Décrivez votre travail et fournissez des instructions..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Fichiers à livrer
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FaUpload className="text-3xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Glissez-déposez vos fichiers ici</p>
                    <p className="text-sm text-gray-500 mb-4">ou</p>
                    <label className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 cursor-pointer">
                      Parcourir les fichiers
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Fichiers attachés */}
                {attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Fichiers attachés</h4>
                    <div className="space-y-2">
                      {attachments.map(file => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FaPaperclip className="text-gray-400 mr-3" />
                            <span className="text-gray-900">{file.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{file.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleDeliver}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
                >
                  Livrer la commande
                </button>
              </div>
            </div>
          </div>

          {/* Colonne droite - Informations */}
          <div className="space-y-6">
            {/* Informations client */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FaUser className="mr-3 text-green-600" />
                Informations client
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    SM
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{order.client.name}</div>
                    <div className="text-sm text-gray-600">{order.client.email}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membre depuis</span>
                    <span className="font-medium">{order.client.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commandes terminées</span>
                    <span className="font-medium">{order.client.completedOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Note moyenne</span>
                    <span className="font-medium flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      {order.client.rating}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                  Contacter le client
                </button>
              </div>
            </div>

            {/* Détails commande */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FaMoneyBillWave className="mr-3 text-green-600" />
                Détails de la commande
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix du service</span>
                  <span className="font-bold">${order.service.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais de service</span>
                  <span className="text-gray-900">${(order.service.price * 0.20).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">${(order.service.price * 1.20).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de création</span>
                    <span className="font-medium">
                      {new Date(order.details.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date limite</span>
                    <span className="font-medium flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {new Date(order.details.deadline).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Révisions incluses</span>
                    <span className="font-medium">{order.service.revisions}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Historique</h3>
              
              <div className="space-y-4">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        event.by === 'Vous' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {event.by === 'Vous' ? <FaCheckCircle /> : <FaUser />}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className="h-8 w-0.5 bg-gray-300 mx-auto mt-1"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{event.action}</div>
                      <div className="text-sm text-gray-500">{event.date}</div>
                      <div className="text-sm text-gray-600">Par {event.by}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aide */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3">💡 Conseils</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Communiquez régulièrement avec le client</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Livrez avant la date limite</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Fournissez des fichiers de qualité</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}