import React, { useState } from 'react';
import { FaFilter, FaDownload, FaMoneyBillWave, FaChartLine, FaWallet, FaCreditCard, FaCalendarAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function Earnings() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedYear, setSelectedYear] = useState('2025');

  // Données des revenus
  const earningsData = {
    overview: {
      totalEarnings: 12450,
      availableBalance: 2850,
      pendingClearance: 1200,
      lifetimeEarnings: 28900
    },
    monthly: [
      { month: 'Jan', earnings: 1850, orders: 8 },
      { month: 'Fév', earnings: 2100, orders: 10 },
      { month: 'Mar', earnings: 1750, orders: 7 },
      { month: 'Avr', earnings: 2400, orders: 11 },
      { month: 'Mai', earnings: 1950, orders: 9 },
      { month: 'Jun', earnings: 2200, orders: 10 },
      { month: 'Jul', earnings: 2650, orders: 12 },
      { month: 'Aoû', earnings: 3100, orders: 14 },
      { month: 'Sep', earnings: 2850, orders: 13 },
      { month: 'Oct', earnings: 3200, orders: 15 },
      { month: 'Nov', earnings: 2950, orders: 14 },
      { month: 'Déc', earnings: 2850, orders: 13 }
    ],
    transactions: [
      { id: 'TXN-001', date: '2025-12-20', description: 'Site Web E-commerce', amount: 850, status: 'completed', type: 'credit' },
      { id: 'TXN-002', date: '2025-12-18', description: 'Logo Design', amount: 299, status: 'completed', type: 'credit' },
      { id: 'TXN-003', date: '2025-12-15', description: 'Application Mobile', amount: 2200, status: 'pending', type: 'credit' },
      { id: 'TXN-004', date: '2025-12-12', description: 'Site Vitrine', amount: 450, status: 'completed', type: 'credit' },
      { id: 'TXN-005', date: '2025-12-10', description: 'Retrait', amount: 1000, status: 'completed', type: 'debit' },
      { id: 'TXN-006', date: '2025-12-08', description: 'Marketing Digital', amount: 650, status: 'completed', type: 'credit' },
      { id: 'TXN-007', date: '2025-12-05', description: 'Frais de service', amount: 120, status: 'completed', type: 'debit' },
      { id: 'TXN-008', date: '2025-12-01', description: 'Tutoriel Vidéo', amount: 350, status: 'pending', type: 'credit' }
    ]
  };

  const calculateStats = () => {
    const currentMonth = earningsData.monthly[11]; // Décembre
    const previousMonth = earningsData.monthly[10]; // Novembre
    
    return {
      currentMonthEarnings: currentMonth.earnings,
      previousMonthEarnings: previousMonth.earnings,
      growthRate: ((currentMonth.earnings - previousMonth.earnings) / previousMonth.earnings * 100).toFixed(1),
      averageOrderValue: (earningsData.overview.totalEarnings / earningsData.monthly.reduce((sum, m) => sum + m.orders, 0)).toFixed(0)
    };
  };

  const stats = calculateStats();

  const filteredTransactions = earningsData.transactions.filter(txn => {
    if (timeRange === 'all') return true;
    if (timeRange === 'month') {
      const txnDate = new Date(txn.date);
      const now = new Date();
      return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Revenus</h1>
          <p className="text-gray-600 mt-2">Suivez vos revenus, transactions et analysez vos performances financières</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <FaMoneyBillWave className="text-2xl text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Solde disponible</div>
                <div className="text-2xl font-bold text-gray-900">${earningsData.overview.availableBalance}</div>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                Retirer des fonds
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <FaChartLine className="text-2xl text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Revenus ce mois</div>
                <div className="text-2xl font-bold text-gray-900">${stats.currentMonthEarnings}</div>
                <div className={`flex items-center mt-1 ${stats.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.growthRate >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                  <span>{Math.abs(stats.growthRate)}%</span>
                  <span className="text-gray-500 ml-1">vs mois dernier</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <FaWallet className="text-2xl text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">En attente</div>
                <div className="text-2xl font-bold text-gray-900">${earningsData.overview.pendingClearance}</div>
                <div className="text-gray-500 text-sm mt-1">Disponible dans 7 jours</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <FaCreditCard className="text-2xl text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Revenus totaux</div>
                <div className="text-2xl font-bold text-gray-900">${earningsData.overview.lifetimeEarnings}</div>
                <div className="text-gray-500 text-sm mt-1">Depuis le début</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Évolution des revenus</h2>
            <div className="flex items-center space-x-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <button className="flex items-center text-green-600 hover:text-green-700">
                <FaDownload className="mr-2" />
                Exporter
              </button>
            </div>
          </div>

          {/* Chart (simplifié) */}
          <div className="h-64 flex items-end space-x-2">
            {earningsData.monthly.map((month, index) => {
              const maxEarnings = Math.max(...earningsData.monthly.map(m => m.earnings));
              const height = (month.earnings / maxEarnings) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center">
                    <div 
                      className="w-3/4 bg-gradient-to-t from-green-400 to-green-300 rounded-t-lg hover:from-green-500 hover:to-green-400 transition-all cursor-pointer"
                      style={{ height: `${height}%` }}
                      title={`${month.month}: $${month.earnings} (${month.orders} commandes)`}
                    >
                      <div className="h-full bg-gradient-to-t from-green-500 to-green-400 opacity-0 hover:opacity-100 transition-opacity rounded-t-lg"></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">{month.month}</div>
                    <div className="text-xs text-gray-500">${month.earnings}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats under chart */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">${stats.averageOrderValue}</div>
              <div className="text-gray-600">Valeur moyenne par commande</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {earningsData.monthly.reduce((sum, m) => sum + m.orders, 0)}
              </div>
              <div className="text-gray-600">Commandes totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+{stats.growthRate}%</div>
              <div className="text-gray-600">Croissance ce mois</div>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Transactions récentes</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <FaFilter className="text-gray-500 mr-2" />
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="month">Ce mois</option>
                    <option value="all">Tout</option>
                    <option value="week">Cette semaine</option>
                  </select>
                </div>
                <button className="flex items-center text-green-600 hover:text-green-700">
                  <FaDownload className="mr-2" />
                  Télécharger CSV
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{txn.id}</div>
                      <div className="text-sm text-gray-500">
                        {txn.type === 'credit' ? 'Revenu' : 'Dépense'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <span>{new Date(txn.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{txn.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        txn.status === 'completed' ? 'bg-green-100 text-green-800' :
                        txn.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {txn.status === 'completed' ? 'Complété' : 
                         txn.status === 'pending' ? 'En attente' : 'Échoué'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`font-bold ${
                        txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {txn.type === 'credit' ? '+' : '-'}${txn.amount}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center">
              <FaMoneyBillWave className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune transaction</h3>
              <p className="text-gray-600">Aucune transaction ne correspond à vos critères</p>
            </div>
          )}
        </div>

        {/* Withdrawal Info */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Conseils pour augmenter vos revenus</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaArrowUp className="text-green-500 mt-1 mr-3" />
                <span>Proposez des packages (Basic/Standard/Premium)</span>
              </li>
              <li className="flex items-start">
                <FaArrowUp className="text-green-500 mt-1 mr-3" />
                <span>Augmentez vos prix progressivement</span>
              </li>
              <li className="flex items-start">
                <FaArrowUp className="text-green-500 mt-1 mr-3" />
                <span>Proposez des services additionnels</span>
              </li>
              <li className="flex items-start">
                <FaArrowUp className="text-green-500 mt-1 mr-3" />
                <span>Fidélisez vos clients avec des offres exclusives</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Informations de retrait</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Méthode actuelle</span>
                <span className="font-medium">PayPal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prochain retrait</span>
                <span className="font-medium">1 Jan 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum de retrait</span>
                <span className="font-medium">$50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frais de retrait</span>
                <span className="font-medium">1%</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
              Modifier la méthode de retrait
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}