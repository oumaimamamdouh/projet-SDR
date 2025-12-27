import React, { useState } from 'react';
import { FaBell, FaEnvelope, FaShoppingCart, FaStar, FaExclamationTriangle, FaCheckCircle, FaTimes, FaFilter, FaCheck } from 'react-icons/fa';

export default function FreelancerNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Nouvelle commande reçue! 🎉',
      message: 'Sarah Martin a commandé votre service "Site Web E-commerce Premium" pour $850',
      time: 'Il y a 2 heures',
      read: false,
      priority: 'high',
      action: 'view_order',
      orderId: 'ORD-2025-1234'
    },
    {
      id: 2,
      type: 'review',
      title: 'Nouvel avis 5 étoiles ⭐',
      message: 'Tech Startup Inc a donné 5 étoiles à votre service "Application Mobile"',
      time: 'Il y a 1 jour',
      read: false,
      priority: 'medium',
      action: 'view_review'
    },
    {
      id: 3,
      type: 'message',
      title: 'Message urgent 📩',
      message: 'Local Restaurant vous a envoyé un message concernant la commande ORD-2025-1236',
      time: 'Il y a 2 jours',
      read: true,
      priority: 'high',
      action: 'reply'
    },
    {
      id: 4,
      type: 'system',
      title: 'Mise à jour importante 🔔',
      message: 'Nouvelles fonctionnalités disponibles! Découvrez les outils avancés de suivi de projets.',
      time: 'Il y a 3 jours',
      read: true,
      priority: 'medium',
      action: 'learn_more'
    },
    {
      id: 5,
      type: 'earning',
      title: 'Paiement reçu 💰',
      message: 'Votre paiement de $450 pour la commande ORD-2025-1236 a été traité',
      time: 'Il y a 4 jours',
      read: true,
      priority: 'low',
      action: 'view_earning'
    },
    {
      id: 6,
      type: 'warning',
      title: 'Délai approchant ⚠️',
      message: 'La commande ORD-2025-1237 arrive à échéance dans 2 jours',
      time: 'Il y a 5 jours',
      read: true,
      priority: 'high',
      action: 'view_order'
    },
    {
      id: 7,
      type: 'tip',
      title: 'Conseil de performance 💡',
      message: 'Votre taux de réponse est excellent! Continuez à répondre rapidement aux clients.',
      time: 'Il y a 1 semaine',
      read: true,
      priority: 'low',
      action: null
    },
    {
      id: 8,
      type: 'promotion',
      title: 'Offre spéciale ✨',
      message: 'Promouvez vos services avec 20% de réduction sur les publicités cette semaine',
      time: 'Il y a 1 semaine',
      read: true,
      priority: 'medium',
      action: 'promote'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'order': return <FaShoppingCart className="text-green-500" />;
      case 'review': return <FaStar className="text-yellow-500" />;
      case 'message': return <FaEnvelope className="text-blue-500" />;
      case 'system': return <FaBell className="text-purple-500" />;
      case 'earning': return <FaCheckCircle className="text-green-600" />;
      case 'warning': return <FaExclamationTriangle className="text-red-500" />;
      case 'tip': return '💡';
      case 'promotion': return '✨';
      default: return <FaBell className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const deleteSelected = () => {
    setNotifications(notifications.filter(notif => !selectedNotifications.includes(notif.id)));
    setSelectedNotifications([]);
  };

  const toggleSelectNotification = (id) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    if (filter === 'high') return notif.priority === 'high';
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-2">
                {unreadCount > 0 
                  ? `Vous avez ${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                  : 'Vous êtes à jour!'
                }
              </p>
            </div>
            <div className="flex space-x-4">
              {selectedNotifications.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  Supprimer ({selectedNotifications.length})
                </button>
              )}
              <button
                onClick={markAllAsRead}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Tout marquer comme lu
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
          <div className="flex items-center space-x-4">
            <FaFilter className="text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'Toutes' },
                { value: 'unread', label: 'Non lues' },
                { value: 'read', label: 'Lues' },
                { value: 'order', label: 'Commandes' },
                { value: 'message', label: 'Messages' },
                { value: 'high', label: 'Importantes' }
              ].map(filterOption => (
                <button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === filterOption.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <FaBell className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {filter === 'unread' ? 'Aucune notification non lue' : 'Aucune notification'}
              </h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? 'Vous avez lu toutes vos notifications' 
                  : 'Aucune notification ne correspond à vos filtres'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${getPriorityColor(notification.priority)} ${
                    !notification.read ? 'border-l-4 border-green-500' : ''
                  }`}
                >
                  <div className="flex">
                    {/* Checkbox for selection */}
                    <div className="flex-shrink-0 mr-4">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => toggleSelectNotification(notification.id)}
                        className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
                      />
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-gray-200">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">{notification.title}</h3>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500">{notification.time}</span>
                          {!notification.read && (
                            <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex space-x-3">
                          {notification.action && (
                            <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                              {notification.action === 'view_order' && 'Voir la commande'}
                              {notification.action === 'view_review' && 'Voir l\'avis'}
                              {notification.action === 'reply' && 'Répondre'}
                              {notification.action === 'learn_more' && 'En savoir plus'}
                              {notification.action === 'view_earning' && 'Voir le paiement'}
                              {notification.action === 'promote' && 'Promouvoir'}
                            </button>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-gray-600 hover:text-gray-900 text-sm"
                            >
                              <FaCheck className="inline mr-1" />
                              Marquer comme lu
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Paramètres de notifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Types de notifications</h4>
              <div className="space-y-3">
                {[
                  { label: 'Nouvelles commandes', enabled: true },
                  { label: 'Messages des clients', enabled: true },
                  { label: 'Avis et évaluations', enabled: true },
                  { label: 'Paiements et retraits', enabled: true },
                  { label: 'Promotions et offres', enabled: false },
                  { label: 'Conseils et astuces', enabled: true }
                ].map((setting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{setting.label}</span>
                    <button className={`w-12 h-6 rounded-full transition-colors ${
                      setting.enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                        setting.enabled ? 'translate-x-7' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Fréquence des notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Notifications push</span>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option>En temps réel</option>
                    <option>Quotidien</option>
                    <option>Désactivé</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Emails de résumé</span>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Quotidien</option>
                    <option>Hebdomadaire</option>
                    <option>Désactivé</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">SMS</span>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Urgent seulement</option>
                    <option>Toutes</option>
                    <option>Désactivé</option>
                  </select>
                </div>
              </div>
              <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Enregistrer les préférences
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Gestion des notifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                <FaBell />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Restez informé</h4>
                <p className="text-gray-600 text-sm">Activez les notifications importantes pour ne rien manquer</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                <FaFilter />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Personnalisez</h4>
                <p className="text-gray-600 text-sm">Ajustez les paramètres selon vos préférences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}