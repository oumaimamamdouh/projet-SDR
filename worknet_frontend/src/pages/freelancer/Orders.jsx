import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFilter, FaSearch, FaSort, FaEye, FaComments, FaCheckCircle,
  FaClock, FaExclamationTriangle, FaTimesCircle, FaCalendarAlt,
  FaMoneyBillWave, FaUser, FaFileAlt, FaDownload, FaShareAlt
} from 'react-icons/fa';

export default function FreelancerOrders() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const orders = [
    {
      id: 'ORD-2025-1001',
      client: { name: 'Sarah Martin', avatar: 'SM' },
      service: 'Site Web E-commerce Premium',
      amount: 850,
      status: 'in_progress',
      deadline: '2025-12-28',
      progress: 75,
      daysLeft: 3,
      createdAt: '2025-12-20',
      priority: 'high',
      revisions: 2,
      messages: 5
    },
    {
      id: 'ORD-2025-1002',
      client: { name: 'Tech Startup Inc', avatar: 'TS' },
      service: 'Application Mobile React Native',
      amount: 2200,
      status: 'pending',
      deadline: '2025-12-30',
      progress: 0,
      daysLeft: 5,
      createdAt: '2025-12-22',
      priority: 'medium',
      revisions: 3,
      messages: 2
    },
    {
      id: 'ORD-2025-1003',
      client: { name: 'Local Restaurant', avatar: 'LR' },
      service: 'Site Vitrine WordPress',
      amount: 450,
      status: 'delivered',
      deadline: '2025-12-25',
      progress: 100,
      daysLeft: 0,
      createdAt: '2025-12-18',
      priority: 'low',
      revisions: 1,
      messages: 8
    },
    {
      id: 'ORD-2025-1004',
      client: { name: 'Fashion Brand', avatar: 'FB' },
      service: 'Logo Design + Brand Identity',
      amount: 299,
      status: 'in_progress',
      deadline: '2025-12-29',
      progress: 40,
      daysLeft: 4,
      createdAt: '2025-12-21',
      priority: 'high',
      revisions: 2,
      messages: 3
    },
    {
      id: 'ORD-2025-1005',
      client: { name: 'Education Platform', avatar: 'EP' },
      service: 'Tutoriel Vidéo Éducatif',
      amount: 650,
      status: 'completed',
      deadline: '2025-12-24',
      progress: 100,
      daysLeft: -1,
      createdAt: '2025-12-15',
      priority: 'low',
      revisions: 0,
      messages: 12
    },
    {
      id: 'ORD-2025-1006',
      client: { name: 'Healthcare Clinic', avatar: 'HC' },
      service: 'Site Web Médical',
      amount: 1200,
      status: 'cancelled',
      deadline: '2025-12-27',
      progress: 30,
      daysLeft: -2,
      createdAt: '2025-12-10',
      priority: 'medium',
      revisions: 1,
      messages: 4
    }
  ];

  const stats = {
    total: orders.length,
    active: orders.filter(o => o.status === 'in_progress').length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    revenue: orders.reduce((sum, o) => sum + o.amount, 0)
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  }).filter(order => {
    return order.id.toLowerCase().includes(search.toLowerCase()) ||
           order.client.name.toLowerCase().includes(search.toLowerCase()) ||
           order.service.toLowerCase().includes(search.toLowerCase());
  }).sort((a, b) => {
    switch(sortBy) {
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest': return new Date(a.createdAt) - new Date(b.createdAt);
      case 'price-high': return b.amount - a.amount;
      case 'price-low': return a.amount - b.amount;
      case 'deadline': return new Date(a.deadline) - new Date(b.deadline);
      default: return 0;
    }
  });

  const getStatusInfo = (status) => {
    switch(status) {
      case 'in_progress': return { color: 'bg-blue-100 text-blue-800', icon: <FaClock />, text: 'En cours' };
      case 'pending': return { color: 'bg-yellow-100 text-yellow-800', icon: <FaExclamationTriangle />, text: 'En attente' };
      case 'delivered': return { color: 'bg-purple-100 text-purple-800', icon: <FaCheckCircle />, text: 'Livré' };
      case 'completed': return { color: 'bg-green-100 text-green-800', icon: <FaCheckCircle />, text: 'Terminé' };
      case 'cancelled': return { color: 'bg-red-100 text-red-800', icon: <FaTimesCircle />, text: 'Annulé' };
      default: return { color: 'bg-gray-100 text-gray-800', icon: null, text: status };
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
        <p className="text-gray-600 mt-2">Gérez toutes vos commandes et suivez leur progression</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-gray-600">Total</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-3xl font-bold text-blue-600">{stats.active}</div>
          <div className="text-gray-600">En cours</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-gray-600">En attente</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-gray-600">Terminées</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-3xl font-bold text-purple-600">${stats.revenue}</div>
          <div className="text-gray-600">Revenus totaux</div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center space-x-4">
            <FaFilter className="text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'Toutes', color: 'bg-gray-100' },
                { value: 'in_progress', label: 'En cours', color: 'bg-blue-100 text-blue-800' },
                { value: 'pending', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
                { value: 'delivered', label: 'Livrées', color: 'bg-purple-100 text-purple-800' },
                { value: 'completed', label: 'Terminées', color: 'bg-green-100 text-green-800' }
              ].map(filterOption => (
                <button
                  key={filterOption.value}
                  onClick={() => setFilter(filterOption.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === filterOption.value
                      ? `${filterOption.color} border border-transparent`
                      : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center">
            <FaSort className="text-gray-500 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="newest">Plus récentes</option>
              <option value="oldest">Plus anciennes</option>
              <option value="price-high">Prix décroissant</option>
              <option value="price-low">Prix croissant</option>
              <option value="deadline">Échéance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
            <p className="text-gray-600">Aucune commande ne correspond à vos critères de recherche</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Échéance
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${
                              order.priority === 'high' ? 'bg-red-500' :
                              order.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <div>
                              <p className="font-bold text-gray-900">{order.id}</p>
                              <p className="text-sm text-gray-600 truncate max-w-xs">{order.service}</p>
                            </div>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <FaCalendarAlt className="mr-2" />
                            <span>Créée le {new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {order.client.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{order.client.name}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <FaComments className="mr-1" />
                              <span>{order.messages} messages</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 text-lg">${order.amount}</div>
                        <div className="text-sm text-gray-600">{order.revisions} révisions incluses</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.icon && <span className="mr-2">{statusInfo.icon}</span>}
                            {statusInfo.text}
                          </span>
                          {order.status === 'in_progress' && (
                            <div className="w-24">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${order.progress}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1 text-center">{order.progress}%</div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center justify-center px-4 py-2 rounded-lg border ${getPriorityColor(order.priority)}`}>
                          <FaCalendarAlt className="mr-2" />
                          <div>
                            <div className="font-medium">
                              {order.daysLeft > 0 ? `${order.daysLeft} jour${order.daysLeft !== 1 ? 's' : ''}` : 'Dépassé'}
                            </div>
                            <div className="text-sm">
                              {new Date(order.deadline).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Link
                            to={`/freelancer/orders/${order.id}`}
                            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium flex items-center"
                          >
                            <FaEye className="mr-2" />
                            Voir
                          </Link>
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                            <FaComments />
                          </button>
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                              <FaCheckCircle />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Export & Bulk Actions */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-600">
          {filteredOrders.length} commande{filteredOrders.length !== 1 ? 's' : ''} affichée{filteredOrders.length !== 1 ? 's' : ''}
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-700 hover:text-green-600">
            <FaDownload className="mr-2" />
            Exporter CSV
          </button>
          <button className="flex items-center text-gray-700 hover:text-green-600">
            <FaShareAlt className="mr-2" />
            Partager
          </button>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Conseils pour gérer vos commandes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start">
            <FaClock className="text-green-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Respectez les délais</h4>
              <p className="text-gray-600 text-sm">Livrez toujours avant la date limite pour garder vos clients satisfaits</p>
            </div>
          </div>
          <div className="flex items-start">
            <FaComments className="text-green-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Communiquez régulièrement</h4>
              <p className="text-gray-600 text-sm">Maintenez vos clients informés de l'avancement de leur projet</p>
            </div>
          </div>
          <div className="flex items-start">
            <FaFileAlt className="text-green-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Documentez tout</h4>
              <p className="text-gray-600 text-sm">Gardez une trace de toutes les communications et livrables</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}