import { useState } from 'react';
import { FaBell, FaSearch, FaEnvelope, FaWallet } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function FreelancerHeader() {
  const { user } = useAuth();
  const [notifications] = useState(2);
  const [messages] = useState(5);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Titre et stats */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">Espace Freelancer</h1>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
              <span className="flex items-center">
                <FaWallet className="mr-1" />
                Solde: <span className="font-medium ml-1 text-green-600">{user?.balance || 0} DH</span>
              </span>
              <span>•</span>
              <span>Note: ⭐ {user?.rating || 5.0}/5</span>
              <span>•</span>
              <span>Commandes en cours: {user?.active_orders || 0}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {/* Barre de recherche */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Rechercher commandes, clients..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Messages */}
            <button className="relative">
              <FaEnvelope className="text-xl text-gray-600 hover:text-blue-600" />
              {messages > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {messages}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button className="relative">
              <FaBell className="text-xl text-gray-600 hover:text-blue-600" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'F'}
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">{user?.full_name || user?.username}</p>
                <p className="text-xs text-gray-600">Niveau: Pro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}