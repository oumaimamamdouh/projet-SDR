import { 
  FaUsers, 
  FaShoppingBag, 
  FaClipboardList, 
  FaDollarSign,
  FaChartLine,
  FaUserCheck,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

export default function AdminDashboard() {
  const stats = [
    { title: 'Utilisateurs totaux', value: '1,245', icon: <FaUsers />, color: 'blue', change: '+12%', trend: 'up' },
    { title: 'Services actifs', value: '856', icon: <FaShoppingBag />, color: 'green', change: '+5%', trend: 'up' },
    { title: 'Commandes du jour', value: '89', icon: <FaClipboardList />, color: 'purple', change: '+23%', trend: 'up' },
    { title: 'Revenus totaux', value: '245,680 DH', icon: <FaDollarSign />, color: 'yellow', change: '+18%', trend: 'up' },
    { title: 'Taux de conversion', value: '3.8%', icon: <FaChartLine />, color: 'pink', change: '-2%', trend: 'down' },
    { title: 'Utilisateurs actifs', value: '892', icon: <FaUserCheck />, color: 'indigo', change: '+8%', trend: 'up' },
  ];

  const recentActivities = [
    { user: 'Ahmed Benali', action: 'a créé un nouveau service', time: 'Il y a 5 minutes', type: 'success' },
    { user: 'Sarah Tech', action: 'a terminé une commande', time: 'Il y a 15 minutes', type: 'success' },
    { user: 'Mike Designer', action: 'a reçu un nouvel avis 5 étoiles', time: 'Il y a 30 minutes', type: 'info' },
    { user: 'Client123', action: 'a signalé un problème', time: 'Il y a 1 heure', type: 'warning' },
    { user: 'Admin System', action: 'a mis à jour les paramètres', time: 'Il y a 2 heures', type: 'info' },
  ];

  return (
    <div className="min-h-screen">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Admin</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de la plateforme WorkNet</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className={`flex items-center mt-2 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span>{stat.change} ce mois</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                <div className="text-2xl">{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activités récentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Activités récentes</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'success' ? 'bg-green-100 text-green-600' :
                  activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {activity.type === 'warning' ? <FaExclamationTriangle /> : activity.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes système */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Alertes système</h2>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-red-500 mr-3" />
                <div>
                  <p className="font-medium text-red-800">2 services signalés</p>
                  <p className="text-sm text-red-600">Nécessite une revue immédiate</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-yellow-500 mr-3" />
                <div>
                  <p className="font-medium text-yellow-800">3 paiements en attente</p>
                  <p className="text-sm text-yellow-600">À traiter dans les 24h</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <FaChartLine className="text-green-500 mr-3" />
                <div>
                  <p className="font-medium text-green-800">Performance excellente</p>
                  <p className="text-sm text-green-600">+25% de croissance ce mois</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}