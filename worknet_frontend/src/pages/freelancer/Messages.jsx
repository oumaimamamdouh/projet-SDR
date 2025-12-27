import React, { useState, useEffect } from 'react';
import { FaSearch, FaPaperPlane, FaPaperclip, FaImage, FaVideo, FaSmile, FaCheckDouble } from 'react-icons/fa';

export default function FreelancerMessages() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Martin',
        avatar: 'SM',
        role: 'Client',
        online: true
      },
      lastMessage: 'Je vous envoie les modifications demandées.',
      timestamp: '10:30',
      unread: 3,
      orderId: 'ORD-2025-1234'
    },
    {
      id: 2,
      user: {
        name: 'Tech Startup Inc',
        avatar: 'TS',
        role: 'Client',
        online: false
      },
      lastMessage: 'Merci pour le travail rapide!',
      timestamp: 'Hier',
      unread: 0,
      orderId: 'ORD-2025-1235'
    },
    {
      id: 3,
      user: {
        name: 'Local Restaurant',
        avatar: 'LR',
        role: 'Client',
        online: true
      },
      lastMessage: 'Pouvez-vous ajouter une section menu?',
      timestamp: '11:45',
      unread: 1,
      orderId: 'ORD-2025-1236'
    },
    {
      id: 4,
      user: {
        name: 'Fashion Brand',
        avatar: 'FB',
        role: 'Client',
        online: false
      },
      lastMessage: 'J\'ai envoyé les ressources créatives.',
      timestamp: '10 déc.',
      unread: 0,
      orderId: 'ORD-2025-1237'
    }
  ]);

  const [activeConversation, setActiveConversation] = useState(1);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const messagesData = {
    1: [
      { id: 1, sender: 'client', text: 'Bonjour! J\'ai quelques modifications pour le site web.', time: '09:30', read: true },
      { id: 2, sender: 'me', text: 'Bonjour Sarah! Quelles modifications souhaitez-vous?', time: '09:32', read: true },
      { id: 3, sender: 'client', text: 'Pouvez-vous changer la couleur principale en bleu?', time: '09:35', read: true },
      { id: 4, sender: 'me', text: 'Bien sûr! Je vais faire ça aujourd\'hui.', time: '09:40', read: true },
      { id: 5, sender: 'client', text: 'Je vous envoie les modifications demandées.', time: '10:30', read: false }
    ],
    2: [
      { id: 1, sender: 'me', text: 'Voici la première version de l\'application.', time: 'Hier 14:20', read: true },
      { id: 2, sender: 'client', text: 'Merci pour le travail rapide! C\'est exactement ce que je voulais.', time: 'Hier 15:45', read: true }
    ],
    3: [
      { id: 1, sender: 'client', text: 'Pouvez-vous ajouter une section menu sur le site?', time: '11:45', read: false }
    ],
    4: [
      { id: 1, sender: 'client', text: 'J\'ai envoyé les ressources créatives par email.', time: '10 déc. 09:00', read: true },
      { id: 2, sender: 'me', text: 'Reçu! Je commence le design aujourd\'hui.', time: '10 déc. 10:15', read: true }
    ]
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    // Ici, normalement tu enverrais au backend
    setMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(search.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const activeConv = conversations.find(c => c.id === activeConversation);
  const activeMessages = messagesData[activeConversation] || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">Communiquez avec vos clients et gérez vos conversations</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex h-[600px]">
            {/* Sidebar Conversations */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map(conversation => (
                  <div
                    key={conversation.id}
                    onClick={() => setActiveConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      activeConversation === conversation.id ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {conversation.user.avatar}
                        </div>
                        {conversation.user.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-900">{conversation.user.name}</h3>
                            <p className="text-sm text-gray-600">{conversation.user.role}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            {conversation.unread > 0 && (
                              <span className="mt-1 bg-green-500 text-white text-xs rounded-full px-2 py-1">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mt-2 truncate">{conversation.lastMessage}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          Commande: {conversation.orderId}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Temps de réponse moyen</div>
                  <div className="text-lg font-bold text-green-600">1 heure</div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="w-2/3 flex flex-col">
              {/* Chat Header */}
              {activeConv && (
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {activeConv.user.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{activeConv.user.name}</h3>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-4">{activeConv.user.role}</span>
                          {activeConv.user.online ? (
                            <span className="flex items-center text-sm text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                              En ligne
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">Hors ligne</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Commande: <span className="font-medium">{activeConv.orderId}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {activeMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`mb-4 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`inline-block max-w-xl rounded-2xl px-4 py-3 ${
                      msg.sender === 'me'
                        ? 'bg-green-100 text-gray-900 rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none'
                    }`}>
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-end mt-2 text-xs text-gray-500">
                        <span>{msg.time}</span>
                        {msg.sender === 'me' && (
                          <FaCheckDouble className={`ml-2 ${msg.read ? 'text-green-500' : 'text-gray-400'}`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Tapez votre message..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaSmile />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaImage />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <FaPaperclip />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={sendMessage}
                    className="ml-4 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Appuyez sur Entrée pour envoyer
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Conseils de communication</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                <FaCheckDouble />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Répondez rapidement</h4>
                <p className="text-gray-600 text-sm">Les clients apprécient les réponses rapides</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
                <FaPaperclip />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Soyez professionnel</h4>
                <p className="text-gray-600 text-sm">Utilisez un langage poli et professionnel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}