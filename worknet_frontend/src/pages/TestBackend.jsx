import { useState } from 'react';
import { gigService, categoryService } from '../services';

export default function TestBackend() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testGigs = async () => {
    setLoading(true);
    try {
      const gigs = await gigService.getAllGigs();
      setResult({ 
        success: true, 
        data: gigs,
        type: 'gigs' 
      });
    } catch (error) {
      setResult({ 
        success: false, 
        error: error.message,
        type: 'gigs' 
      });
    } finally {
      setLoading(false);
    }
  };

  const testCategories = async () => {
    setLoading(true);
    try {
      const categories = await categoryService.getAllCategories();
      setResult({ 
        success: true, 
        data: categories,
        type: 'categories' 
      });
    } catch (error) {
      setResult({ 
        success: false, 
        error: error.message,
        type: 'categories' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test Backend Connection</h1>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={testGigs}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test Gigs API
        </button>
        
        <button 
          onClick={testCategories}
          disabled={loading}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Categories API
        </button>
      </div>

      {loading && (
        <div className="text-center p-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2">Testing API...</p>
        </div>
      )}
      
      {result && (
        <div className={`p-4 rounded-lg border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className={`font-bold ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                {result.success ? '✅ API Success' : '❌ API Error'}
              </h3>
              <p className="text-sm text-gray-600">Testing: {result.type}</p>
            </div>
            <button 
              onClick={() => setResult(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          
          {result.success ? (
            <pre className="mt-2 p-3 bg-white rounded overflow-auto text-sm max-h-96">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          ) : (
            <div>
              <p className="text-red-600 mb-2">Error: {result.error}</p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Current API Endpoints:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><code>GET /api/gigs</code> - List all gigs</li>
          <li><code>GET /api/gigs/featured</code> - Featured gigs</li>
          <li><code>GET /api/gigs/search?q=...</code> - Search gigs</li>
          <li><code>GET /api/categories</code> - List all categories</li>
        </ul>
      </div>
    </div>
  );
}