// // // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// // // // import Home from './pages/public/Home.jsx'
// // // // Pages simples pour tester
// // // function Home() {
// // //   return (
// // //     <div style={{ padding: '50px', textAlign: 'center' }}>
// // //       <h1 style={{ color: '#1DBF73' }}>WorkNet - Page d'accueil</h1>
// // //       <p>L'application est en cours de chargement...</p>
// // //       <div style={{ marginTop: '30px' }}>
// // //         <a href="/login" style={{ marginRight: '20px', color: '#1DBF73' }}>Se connecter</a>
// // //         <a href="/register" style={{ color: '#1DBF73' }}>S'inscrire</a>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // function Login() {
// // //   return (
// // //     <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px' }}>
// // //       <h2 style={{ color: '#1DBF73' }}>Connexion</h2>
// // //       <form style={{ marginTop: '20px' }}>
// // //         <div style={{ marginBottom: '15px' }}>
// // //           <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
// // //           <input type="email" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
// // //         </div>
// // //         <div style={{ marginBottom: '15px' }}>
// // //           <label style={{ display: 'block', marginBottom: '5px' }}>Mot de passe</label>
// // //           <input type="password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
// // //         </div>
// // //         <button type="submit" style={{ 
// // //           width: '100%', 
// // //           padding: '12px', 
// // //           background: '#1DBF73', 
// // //           color: 'white', 
// // //           border: 'none', 
// // //           borderRadius: '5px',
// // //           cursor: 'pointer'
// // //         }}>
// // //           Se connecter
// // //         </button>
// // //       </form>
// // //     </div>
// // //   )
// // // }

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         <Route path="/" element={<Home />} />
// // //         <Route path="/login" element={<Login />} />
// // //         <Route path="*" element={<Home />} />
// // //       </Routes>
// // //     </Router>
// // //   )
// // // }

// // // export default App

// // // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// // // // // IMPORT TES PAGES EXISTANTES - Vérifie ces chemins!
// // // // import Home from './pages/public/Home.jsx'
// // // // import Login from './pages/auth/Login.jsx'
// // // // import Register from './pages/auth/Register.jsx'



// // // // function App() {
// // // //   return (
// // // //     <Router>
// // // //       <Routes>
// // // //         {/* Route publique principale */}
// // // //         <Route path="/" element={<MainLayout />}>
// // // //           <Route index element={<Home />} />
// // // //           <Route path="login" element={<Login />} />
// // // //           <Route path="register" element={<Register />} />
// // // //           <Route path="*" element={<Navigate to="/" />} />
// // // //         </Route>

       
// // // //       </Routes>
// // // //     </Router>
// // // //   )
// // // // }
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import { AuthProvider } from './context/AuthContext';
// // // import { Toaster } from 'react-hot-toast';

// // // // Pages publiques
// // // import Home from './pages/public/Home';
// // // import Login from './pages/auth/Login';
// // // import Register from './pages/auth/Register';

// // // // Layouts pour utilisateurs connectés
// // // import MainLayout from './layouts/MainLayout';
// // // import ClientLayout from './layouts/ClientLayout';
// // // import FreelancerLayout from './layouts/FreelancerLayout';

// // // // Routes protégées
// // // import PrivateRoute from './routes/PrivateRoute';

// // // // Pages protégées
// // // import ClientDashboard from './pages/client/Dashboard';
// // // import FreelancerDashboard from './pages/freelancer/Dashboard';
// // // import MyGigs from './pages/freelancer/MyGigs';
// // // import CreateGig from './pages/freelancer/CreateGig';

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <AuthProvider>
// // //         <Toaster 
// // //           position="top-right"
// // //           toastOptions={{
// // //             duration: 3000,
// // //             style: {
// // //               background: '#363636',
// // //               color: '#fff',
// // //             },
// // //             success: {
// // //               style: {
// // //                 background: '#1DBF73',
// // //               },
// // //             },
// // //             error: {
// // //               style: {
// // //                 background: '#f74040',
// // //               },
// // //             },
// // //           }}
// // //         />
        
// // //         <Routes>
// // //           {/* Routes publiques */}
// // //           <Route path="/" element={<MainLayout />}>
// // //             <Route index element={<Home />} />
// // //             <Route path="login" element={<Login />} />
// // //             <Route path="register" element={<Register />} />
// // //           </Route>

// // //           {/* Routes client protégées */}
// // //           <Route 
// // //             path="/client" 
// // //             element={
// // //               <PrivateRoute>
// // //                 <ClientLayout />
// // //               </PrivateRoute>
// // //             }
// // //           >
// // //             <Route index element={<Navigate to="dashboard" replace />} />
// // //             <Route path="dashboard" element={<ClientDashboard />} />
// // //             {/* Ajoute d'autres routes client ici */}
// // //           </Route>

// // //           {/* Routes freelancer protégées */}
// // //           <Route 
// // //             path="/freelancer" 
// // //             element={
// // //               <PrivateRoute>
// // //                 <FreelancerLayout />
// // //               </PrivateRoute>
// // //             }
// // //           >
// // //             <Route index element={<Navigate to="dashboard" replace />} />
// // //             <Route path="dashboard" element={<FreelancerDashboard />} />
// // //             <Route path="my-gigs" element={<MyGigs />} />
// // //             <Route path="create-gig" element={<CreateGig />} />
// // //           </Route>

// // //           {/* Route 404 */}
// // //           <Route path="*" element={<Navigate to="/" replace />} />
// // //         </Routes>
// // //       </AuthProvider>
// // //     </Router>
// // //   );
// // // }

// // // export default App;


// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { AuthProvider } from './context/AuthContext';
// // import { Toaster } from 'react-hot-toast';
// // import PrivateRoute from './routes/PrivateRoute';

// // // Layouts
// // import FreelancerLayout from './layouts/FreelancerLayout';

// // // Pages publiques
// // import Home from './pages/public/Home';
// // import Login from './pages/auth/Login';
// // import Register from './pages/auth/Register';

// // // Pages freelancer
// // import Dashboard from './pages/freelancer/Dashboard';
// // import MyGigs from './pages/freelancer/MyGigs';
// // import CreateGig from './pages/freelancer/CreateGig';

// // function App() {
// //   return (
// //     <Router>
// //       <AuthProvider>
// //         <Toaster 
// //           position="top-right"
// //           toastOptions={{
// //             duration: 3000,
// //             style: {
// //               background: '#363636',
// //               color: '#fff',
// //             },
// //             success: {
// //               style: {
// //                 background: '#1DBF73',
// //               },
// //             },
// //             error: {
// //               style: {
// //                 background: '#f74040',
// //               },
// //             },
// //           }}
// //         />
        
// //         <Routes>
// //           {/* Routes publiques */}
// //           <Route path="/" element={<Home />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />

// //           {/* Routes freelancer protégées */}
// //           <Route 
// //             path="/freelancer" 
// //             element={
// //               <PrivateRoute>
// //                 <FreelancerLayout />
// //               </PrivateRoute>
// //             }
// //           >
// //             <Route index element={<Navigate to="dashboard" replace />} />
// //             <Route path="dashboard" element={<Dashboard />} />
// //             <Route path="my-gigs" element={<MyGigs />} />
// //             <Route path="create-gig" element={<CreateGig />} />
// //             <Route path="orders" element={<div className="p-6">Page Commandes</div>} />
// //             <Route path="messages" element={<div className="p-6">Page Messages</div>} />
// //             <Route path="profile" element={<div className="p-6">Page Profil</div>} />
// //           </Route>

// //           {/* Route 404 */}
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </AuthProvider>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Pages de test
// function Home() {
//   return (
//     <div style={{ padding: '50px', textAlign: 'center' }}>
//       <h1 style={{ color: '#1DBF73', fontSize: '48px' }}>🏠 WorkNet - Home</h1>
//       <p>Page d'accueil fonctionnelle</p>
//       <div style={{ marginTop: '30px' }}>
//         <a href="/freelancer/dashboard" style={{ 
//           marginRight: '20px', 
//           color: '#1DBF73',
//           textDecoration: 'none',
//           padding: '10px 20px',
//           border: '2px solid #1DBF73',
//           borderRadius: '5px'
//         }}>
//           🚀 Aller au Dashboard Freelance
//         </a>
//       </div>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div style={{ padding: '50px' }}>
//       <h1 style={{ color: '#1DBF73' }}>📊 Dashboard Freelance</h1>
//       <p>Interface freelancer fonctionnelle</p>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Pages de base */}
//         <Route path="/" element={<Home />} />
//         <Route path="/freelancer/dashboard" element={<Dashboard />} />
//         <Route path="*" element={<Home />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './routes/PrivateRoute';

// Layouts
import FreelancerLayout from './layouts/FreelancerLayout';

// Pages publiques
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Pages freelancer
import Dashboard from './pages/freelancer/Dashboard';
import MyGigs from './pages/freelancer/MyGigs';
import CreateGig from './pages/freelancer/CreateGig';
import EditGig from './pages/freelancer/EditGig';

// Pages clients
import BrowseGigs from './pages/client/BrowseGigs';
import GigDetails from './pages/client/GigDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#1DBF73',
              },
            },
            error: {
              style: {
                background: '#f74040',
              },
            },
          }}
        />
        
        <Routes>
          {/* Routes publiques */}
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes publiques pour voir les gigs */}
          <Route path="/gigs" element={<BrowseGigs />} />
          <Route path="/gigs/:id" element={<GigDetails />} />

          {/* Routes freelancer protégées */}
          <Route 
            path="/freelancer" 
            element={
              <PrivateRoute>
                <FreelancerLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="my-gigs" element={<MyGigs />} />
            <Route path="create-gig" element={<CreateGig />} />
            <Route path="gigs/:id/edit" element={<EditGig />} />
            <Route path="orders" element={<div className="p-6">Page Commandes</div>} />
            <Route path="messages" element={<div className="p-6">Page Messages</div>} />
            <Route path="profile" element={<div className="p-6">Page Profil</div>} />
          </Route>

          {/* Route 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;