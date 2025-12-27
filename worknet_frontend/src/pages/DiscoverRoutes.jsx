import { useState } from 'react';
import axios from 'axios';

export default function DiscoverRoutes() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [baseUrl] = useState('http://localhost:5000');

  const testRoutes = async () => {
    setLoading(true);
    
    const routes = [
      // Routes de base
      { path: '/api/gigs', params: {} },
      { path: '/api/gigs', params: { page: 1, limit: 10 } },
      { path: '/api/gigs', params: { status: 'active' } },
      { path: '/api/gigs', params: { sort: 'popular' } },
      { path: '/api/gigs', params: { category: 'web-development' } },
      { path: '/api/gigs', params: { featured: true } },
      
      // Categories
      { path: '/api/categories', params: {} },
      { path: '/api/categories', params: { active: true } },
      { path: '/api/categories', params: { limit: 10 } },
      
      // Autres routes potentielles
      { path: '/api/health', params: {} },
      { path: '/api/status', params: {} },
      { path: '/api/version', params: {} },
      { path: '/api/config', params: {} },
    ];

    const testResults = [];
    
    for (const route of routes) {
      try {
        const url = `${baseUrl}${route.path}`;
        const response = await axios.get(url, { 
          params: route.params,
          timeout: 5000 
        });
        
        testResults.push({
          route: `${route.path}${Object.keys(route.params).length > 0 ? '?' + new URLSearchParams(route.params).toString() : ''}`,
          success: true,
          status: response.status,
          data: response.data,
          hasData: response.data && (
            (Array.isArray(response.data) && response.data.length > 0) ||
            (response.data.data && Array.isArray(response.data.data)) ||
            (typeof response.data === 'object' && Object.keys(response.data).length > 0)
          )
        });
      } catch (error) {
        testResults.push({
          route: `${route.path}${Object.keys(route.params).length > 0 ? '?' + new URLSearchParams(route.params).toString() : ''}`,
          success: false,
          status: error.response?.status,
          error: error.response?.data?.error || error.message,
          details: error.response?.data
        });
      }
    }

    setResults(testResults);
    setLoading(false);
  };

  // Regrouper par succès
  const successfulRoutes = results.filter(r => r.success);
  const failedRoutes = results.filter(r => !r.success);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Discover API Routes</h1>
      
      <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">💡 Insights:</h2>
        <ul className="list-disc pl-5 text-blue-700 space-y-1">
          <li><code>/api/gigs</code> → <strong>Status 400</strong> = Route existe mais besoin de paramètres</li>
          <li><code>/api/categories</code> → <strong>Status 500</strong> = Route existe mais erreur serveur</li>
          <li>Testons avec différents paramètres pour trouver la bonne combinaison</li>
        </ul>
      </div>

      <button
        onClick={testRoutes}
        disabled={loading}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 mb-8 font-semibold"
      >
        {loading ? 'Testing routes with parameters...' : 'Test Routes with Parameters'}
      </button>

      {successfulRoutes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-700">✅ Working Routes ({successfulRoutes.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {successfulRoutes.map((result, index) => (
              <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <code className="font-mono text-sm bg-green-100 px-2 py-1 rounded">
                    {result.route}
                  </code>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    ✓ {result.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-700">
                  {result.hasData ? (
                    <div>
                      <span className="text-green-600">Has data ✓</span>
                      {result.data?.data && Array.isArray(result.data.data) && (
                        <p>Items: {result.data.data.length}</p>
                      )}
                      {Array.isArray(result.data) && (
                        <p>Array length: {result.data.length}</p>
                      )}
                      {result.data?.message && (
                        <p className="truncate">Message: {result.data.message}</p>
                      )}
                    </div>
                  ) : (
                    <span className="text-yellow-600">No data returned</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {failedRoutes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-red-700">❌ Failed Routes ({failedRoutes.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {failedRoutes.map((result, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex justify-between items-center mb-2">
                  <code className="font-mono text-sm bg-red-100 px-2 py-1 rounded">
                    {result.route}
                  </code>
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                    ✗ {result.status || 'ERR'}
                  </span>
                </div>
                
                <div className="text-sm">
                  <p className="text-red-600 font-medium">{result.error}</p>
                  {result.details && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-gray-600 text-sm">Details</summary>
                      <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-800 text-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Next Steps:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Regarde les logs de ton backend Node.js pour voir les erreurs exactes</li>
          <li>Teste l'authentification: <code>/api/auth/login</code></li>
          <li>Regarde le code source de ton backend pour les routes exactes</li>
          <li>Essaie avec Postman pour plus de détails d'erreur</li>
        </ol>
        
        <div className="mt-4 p-4 bg-gray-700 rounded">
          <h4 className="font-medium mb-2">Test direct dans le navigateur:</h4>
          <div className="space-y-1 font-mono text-sm">
            <a href="http://localhost:5000/api/gigs?page=1&limit=5" 
               className="block text-blue-300 hover:text-blue-100"
               target="_blank">
               http://localhost:5000/api/gigs?page=1&limit=5
            </a>
            <a href="http://localhost:5000/api/gigs?status=active" 
               className="block text-blue-300 hover:text-blue-100"
               target="_blank">
               http://localhost:5000/api/gigs?status=active
            </a>
            <a href="http://localhost:5000/api/categories?active=true" 
               className="block text-blue-300 hover:text-blue-100"
               target="_blank">
               http://localhost:5000/api/categories?active=true
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}