// import { useState } from 'react';
// import { authService } from '../services/authService';
// import axiosInstance from '../services/api/axiosConfig';

// export default function TestConnection() {
//   const [results, setResults] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [loginData, setLoginData] = useState({
//     email: 'sadik@example.com',
//     password: 'test123'
//   });

//   const testAllEndpoints = async () => {
//     setLoading(true);
//     const testResults = {};

//     try {
//       // Test health
//       const health = await axiosInstance.get('/health');
//       testResults.health = { success: true, data: health.data };
      
//       // Test API status
//       const status = await axiosInstance.get('/api/status');
//       testResults.status = { success: true, data: status.data };
      
//       // Test public gigs (sans auth)
//       try {
//         const gigs = await axiosInstance.get('/api/gigs');
//         testResults.gigs = { success: true, count: gigs.data.length };
//       } catch (error) {
//         testResults.gigs = { success: false, error: error.message };
//       }
      
//       // Test categories
//       try {
//         const categories = await axiosInstance.get('/api/categories');
//         testResults.categories = { success: true, count: categories.data.length };
//       } catch (error) {
//         testResults.categories = { success: false, error: error.message };
//       }
      
//       // Test login
//       try {
//         const login = await axiosInstance.post('/api/auth/login', loginData);
//         testResults.login = { success: true, user: login.data.user?.username };
        
//         // Test authenticated endpoints after login
//         if (login.data.token) {
//           axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${login.data.token}`;
          
//           const profile = await axiosInstance.get('/api/users/profile');
//           testResults.profile = { success: true, data: profile.data };
          
//           const myOrders = await axiosInstance.get('/api/orders/my');
//           testResults.orders = { success: true, count: myOrders.data?.length || 0 };
//         }
//       } catch (error) {
//         testResults.login = { success: false, error: error.response?.data?.error || error.message };
//       }
      
//     } catch (error) {
//       console.error('Test failed:', error);
//     } finally {
//       setLoading(false);
//       setResults(testResults);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-bold mb-6">Test Backend Connection</h1>
      
//       <div className="mb-8 bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">Test Login Credentials</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               value={loginData.email}
//               onChange={(e) => setLoginData({...loginData, email: e.target.value})}
//               className="w-full px-3 py-2 border rounded"
//               placeholder="test@example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={loginData.password}
//               onChange={(e) => setLoginData({...loginData, password: e.target.value})}
//               className="w-full px-3 py-2 border rounded"
//               placeholder="password"
//             />
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={testAllEndpoints}
//         disabled={loading}
//         className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
//       >
//         {loading ? 'Testing...' : 'Test All API Endpoints'}
//       </button>

//       {Object.keys(results).length > 0 && (
//         <div className="mt-8 space-y-6">
//           <h2 className="text-2xl font-bold">Test Results</h2>
          
//           {Object.entries(results).map(([key, result]) => (
//             <div key={key} className="bg-white p-4 rounded-lg shadow">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-semibold text-lg capitalize">{key}</h3>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   result.success 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-red-100 text-red-800'
//                 }`}>
//                   {result.success ? '✓ Success' : '✗ Failed'}
//                 </span>
//               </div>
              
//               {result.success ? (
//                 <div className="text-gray-600">
//                   {result.data && (
//                     <pre className="text-sm bg-gray-50 p-2 rounded overflow-auto">
//                       {JSON.stringify(result.data, null, 2)}
//                     </pre>
//                   )}
//                   {result.count !== undefined && (
//                     <p>Count: {result.count}</p>
//                   )}
//                   {result.user && (
//                     <p>User: {result.user}</p>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-red-600">
//                   Error: {result.error}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-8 bg-blue-50 p-6 rounded-lg">
//         <h3 className="text-lg font-semibold mb-2">Available Endpoints</h3>
//         <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
//           <li>✓ GET /health</li>
//           <li>✓ GET /rpc-health</li>
//           <li>✓ GET /api/status</li>
//           <li>✓ GET /api/version</li>
//           <li>✓ POST /api/auth/login</li>
//           <li>✓ POST /api/auth/register</li>
//           <li>✓ GET /api/users/*</li>
//           <li>✓ GET /api/gigs/*</li>
//           <li>✓ GET /api/orders/*</li>
//           <li>✓ GET /api/categories/*</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import axiosInstance from '../services/api/axiosConfig';

export default function TestConnection() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: 'sadik@example.com',
    password: 'test123'
  });

  const testEndpoint = async (name, url, method = 'GET', data = null) => {
    try {
      const config = { url, method };
      if (data) config.data = data;
      
      const response = await axiosInstance(config);
      return { 
        success: true, 
        data: response.data,
        status: response.status
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || error.message,
        status: error.response?.status
      };
    }
  };

  const testAllEndpoints = async () => {
    setLoading(true);
    const testResults = {};

    try {
      // Test endpoints publics
      testResults.health = await testEndpoint('Health Check', '/health');
      testResults.status = await testEndpoint('API Status', '/api/status');
      
      // Test gigs avec différents paramètres
      testResults.gigs_all = await testEndpoint('All Gigs', '/api/gigs');
      testResults.gigs_limit = await testEndpoint('Gigs (limit 5)', '/api/gigs?limit=5');
      testResults.gigs_featured = await testEndpoint('Featured Gigs', '/api/gigs/featured');
      testResults.gigs_popular = await testEndpoint('Popular Gigs', '/api/gigs/popular');
      
      // Test categories
      testResults.categories_all = await testEndpoint('All Categories', '/api/categories');
      testResults.categories_active = await testEndpoint('Active Categories', '/api/categories/active');
      
      // Test login
      testResults.login = await testEndpoint('Login', '/api/auth/login', 'POST', loginData);
      
      // Si login réussi, test endpoints authentifiés
      if (testResults.login.success && testResults.login.data.token) {
        // Stocke le token
        localStorage.setItem('token', testResults.login.data.token);
        localStorage.setItem('user', JSON.stringify(testResults.login.data.user));
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${testResults.login.data.token}`;
        
        // Test endpoints protégés
        testResults.profile = await testEndpoint('User Profile', '/api/users/profile');
        testResults.my_gigs = await testEndpoint('My Gigs', '/api/gigs/my');
        testResults.my_orders = await testEndpoint('My Orders', '/api/orders/my');
        
        // Test avec ID spécifique
        if (testResults.my_gigs.success && testResults.my_gigs.data.length > 0) {
          const gigId = testResults.my_gigs.data[0]._id;
          testResults.single_gig = await testEndpoint('Single Gig', `/api/gigs/${gigId}`);
        }
      }
      
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setLoading(false);
      setResults(testResults);
    }
  };

  const testSimpleConnection = async () => {
  try {
    const response = await fetch('http://localhost:5000/health');
    const data = await response.json();
    console.log('✅ Backend connected:', data);
    alert(`Backend connected: ${data.message}`);
  } catch (error) {
    console.error('❌ CORS Error:', error);
    alert('CORS Error: ' + error.message);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">WorkNet API Tester</h1>
      
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test Login (utilisateur de ta DB)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="sadik@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="password"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Utilise les identifiants d'un utilisateur existant dans ta base de données
        </p>
      </div>

      <button
        onClick={testAllEndpoints}
        disabled={loading}
        className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 font-semibold text-lg"
      >
        {loading ? 'Testing API Endpoints...' : '▶ Test All API Endpoints'}
      </button>

      {Object.keys(results).length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Test Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(results).map(([key, result]) => (
              <div key={key} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {key.replace(/_/g, ' ')}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      result.success 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.status || 'N/A'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      result.success 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.success ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
                
                <div className="text-sm">
                  {result.success ? (
                    <div>
                      {result.data?.message && (
                        <p className="text-green-600 mb-1">{result.data.message}</p>
                      )}
                      {result.data?.length !== undefined && (
                        <p className="text-gray-600">Items: {result.data.length}</p>
                      )}
                      {result.data?.user && (
                        <p className="text-gray-600">User: {result.data.user.username || result.data.user.email}</p>
                      )}
                      {result.data?.token && (
                        <p className="text-gray-600 truncate">Token: {result.data.token.substring(0, 20)}...</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-red-600">
                      {result.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-900 text-white p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">API Documentation</h3>
        <div className="space-y-2">
          <div className="flex justify-between border-b border-gray-700 py-2">
            <span>GET /health</span>
            <span className="text-green-400">Public</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 py-2">
            <span>GET /api/status</span>
            <span className="text-green-400">Public</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 py-2">
            <span>GET /api/gigs</span>
            <span className="text-green-400">Public</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 py-2">
            <span>GET /api/gigs/featured</span>
            <span className="text-green-400">Public</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 py-2">
            <span>GET /api/gigs/popular</span>
            <span className="text-green-400">Public</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 py-2">
            <span>GET /api/categories</span>
            <span className="text-green-400">Public</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 py-2">
            <span>POST /api/auth/login</span>
            <span className="text-green-400">Public</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 py-2">
            <span>GET /api/users/profile</span>
            <span className="text-yellow-400">Protected</span>
          </div>
          <div className="flex justify-between border-b border-gray-700 py-2">
            <span>GET /api/orders/my</span>
            <span className="text-yellow-400">Protected</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Quick Test Commands</h3>
        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
          <p className="mb-2"># Test dans le navigateur:</p>
          <code className="block mb-2 p-2 bg-white rounded">http://localhost:5000/api/gigs?limit=5</code>
          <code className="block mb-2 p-2 bg-white rounded">http://localhost:5000/api/gigs/featured</code>
          <code className="block mb-2 p-2 bg-white rounded">http://localhost:5000/api/categories/active</code>
        </div>
      </div>
    </div>
  );
} };