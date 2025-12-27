// // // // import { useState } from 'react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
// // // // import { FcGoogle } from 'react-icons/fc';

// // // // export default function Login() {
// // // //   const [formData, setFormData] = useState({
// // // //     email: '',
// // // //     password: '',
// // // //   });
// // // //   const [showPassword, setShowPassword] = useState(false);
// // // //   const [rememberMe, setRememberMe] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');
  
// // // //   const navigate = useNavigate();

// // // //   const handleChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       [name]: value
// // // //     }));
// // // //   };

// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     setLoading(true);
// // // //     setError('');

// // // //     // Simulate API call
// // // //     setTimeout(() => {
// // // //       setLoading(false);
// // // //       // Navigate based on user role
// // // //       navigate('/freelancer/dashboard');
// // // //     }, 1500);
// // // //   };

// // // //   const handleGoogleLogin = () => {
// // // //     // Handle Google OAuth
// // // //     console.log('Google login');
// // // //   };

// // // //   const handleFacebookLogin = () => {
// // // //     // Handle Facebook OAuth
// // // //     console.log('Facebook login');
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // // //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// // // //         <Link to="/" className="flex justify-center items-center space-x-2">
// // // //           <span className="text-3xl font-bold text-fiverr-green">Work</span>
// // // //           <span className="text-3xl font-bold text-fiverr-dark">Net</span>
// // // //         </Link>
// // // //         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
// // // //           Sign in to your account
// // // //         </h2>
// // // //         <p className="mt-2 text-center text-sm text-gray-600">
// // // //           Or{' '}
// // // //           <Link to="/register" className="font-medium text-fiverr-green hover:text-fiverr-green-dark">
// // // //             create a new account
// // // //           </Link>
// // // //         </p>
// // // //       </div>

// // // //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// // // //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// // // //           {error && (
// // // //             <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
// // // //               {error}
// // // //             </div>
// // // //           )}

// // // //           <form className="space-y-6" onSubmit={handleSubmit}>
// // // //             {/* Email Input */}
// // // //             <div>
// // // //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 Email address
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // // //                   <FaEnvelope className="h-5 w-5 text-gray-400" />
// // // //                 </div>
// // // //                 <input
// // // //                   id="email"
// // // //                   name="email"
// // // //                   type="email"
// // // //                   autoComplete="email"
// // // //                   required
// // // //                   value={formData.email}
// // // //                   onChange={handleChange}
// // // //                   className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fiverr-green focus:border-fiverr-green sm:text-sm"
// // // //                   placeholder="you@example.com"
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {/* Password Input */}
// // // //             <div>
// // // //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 Password
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // // //                   <FaLock className="h-5 w-5 text-gray-400" />
// // // //                 </div>
// // // //                 <input
// // // //                   id="password"
// // // //                   name="password"
// // // //                   type={showPassword ? "text" : "password"}
// // // //                   autoComplete="current-password"
// // // //                   required
// // // //                   value={formData.password}
// // // //                   onChange={handleChange}
// // // //                   className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fiverr-green focus:border-fiverr-green sm:text-sm"
// // // //                   placeholder="••••••••"
// // // //                 />
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => setShowPassword(!showPassword)}
// // // //                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
// // // //                 >
// // // //                   {showPassword ? (
// // // //                     <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
// // // //                   ) : (
// // // //                     <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
// // // //                   )}
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             {/* Remember me & Forgot password */}
// // // //             <div className="flex items-center justify-between">
// // // //               <div className="flex items-center">
// // // //                 <input
// // // //                   id="remember-me"
// // // //                   name="remember-me"
// // // //                   type="checkbox"
// // // //                   checked={rememberMe}
// // // //                   onChange={(e) => setRememberMe(e.target.checked)}
// // // //                   className="h-4 w-4 text-fiverr-green focus:ring-fiverr-green border-gray-300 rounded"
// // // //                 />
// // // //                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
// // // //                   Remember me
// // // //                 </label>
// // // //               </div>

// // // //               <div className="text-sm">
// // // //                 <Link to="/forgot-password" className="font-medium text-fiverr-green hover:text-fiverr-green-dark">
// // // //                   Forgot your password?
// // // //                 </Link>
// // // //               </div>
// // // //             </div>

// // // //             {/* Submit Button */}
// // // //             <div>
// // // //               <button
// // // //                 type="submit"
// // // //                 disabled={loading}
// // // //                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-fiverr-green hover:bg-fiverr-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fiverr-green ${
// // // //                   loading ? 'opacity-70 cursor-not-allowed' : ''
// // // //                 }`}
// // // //               >
// // // //                 {loading ? (
// // // //                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // // //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // //                   </svg>
// // // //                 ) : (
// // // //                   'Sign in'
// // // //                 )}
// // // //               </button>
// // // //             </div>
// // // //           </form>

// // // //           {/* Social Login Divider */}
// // // //           <div className="mt-6">
// // // //             <div className="relative">
// // // //               <div className="absolute inset-0 flex items-center">
// // // //                 <div className="w-full border-t border-gray-300"></div>
// // // //               </div>
// // // //               <div className="relative flex justify-center text-sm">
// // // //                 <span className="px-2 bg-white text-gray-500">Or continue with</span>
// // // //               </div>
// // // //             </div>

// // // //             <div className="mt-6 grid grid-cols-2 gap-3">
// // // //               {/* Google Login */}
// // // //               <button
// // // //                 onClick={handleGoogleLogin}
// // // //                 className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
// // // //               >
// // // //                 <FcGoogle className="h-5 w-5 mr-2" />
// // // //                 Google
// // // //               </button>

// // // //               {/* Facebook Login */}
// // // //               <button
// // // //                 onClick={handleFacebookLogin}
// // // //                 className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
// // // //               >
// // // //                 <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
// // // //                 Facebook
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Role Selection */}
// // // //           <div className="mt-8">
// // // //             <p className="text-sm text-gray-600 text-center mb-4">
// // // //               Sign in as:
// // // //             </p>
// // // //             <div className="grid grid-cols-2 gap-3">
// // // //               <button
// // // //                 onClick={() => navigate('/client/dashboard')}
// // // //                 className="py-3 px-4 border border-fiverr-green rounded-lg text-sm font-medium text-fiverr-green hover:bg-fiverr-green-light"
// // // //               >
// // // //                 Client
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => navigate('/freelancer/dashboard')}
// // // //                 className="py-3 px-4 border border-fiverr-green rounded-lg text-sm font-medium text-fiverr-green hover:bg-fiverr-green-light"
// // // //               >
// // // //                 Freelancer
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Legal Links */}
// // // //       <div className="mt-8 text-center text-sm text-gray-500">
// // // //         <p>
// // // //           By signing in, you agree to our{' '}
// // // //           <a href="#" className="font-medium text-fiverr-green hover:text-fiverr-green-dark">
// // // //             Terms of Service
// // // //           </a>{' '}
// // // //           and{' '}
// // // //           <a href="#" className="font-medium text-fiverr-green hover:text-fiverr-green-dark">
// // // //             Privacy Policy
// // // //           </a>
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useState } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';

// // // export default function Login() {
// // //   const [formData, setFormData] = useState({
// // //     email: '',
// // //     password: '',
// // //   });
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [rememberMe, setRememberMe] = useState(false);
// // //   const [loading, setLoading] = useState(false);
  
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     setTimeout(() => {
// // //       setLoading(false);
// // //       navigate('/freelancer/dashboard');
// // //     }, 1500);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// // //         <Link to="/" className="flex justify-center items-center space-x-2">
// // //           <span className="text-3xl font-bold text-green-500">Work</span>
// // //           <span className="text-3xl font-bold text-gray-900">Net</span>
// // //         </Link>
// // //         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
// // //           Sign in to your account
// // //         </h2>
// // //         <p className="mt-2 text-center text-sm text-gray-600">
// // //           Or{' '}
// // //           <Link to="/register" className="font-medium text-green-500 hover:text-green-600">
// // //             create a new account
// // //           </Link>
// // //         </p>
// // //       </div>

// // //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// // //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// // //           <form className="space-y-6" onSubmit={handleSubmit}>
// // //             {/* Email Input */}
// // //             <div>
// // //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Email address
// // //               </label>
// // //               <input
// // //                 id="email"
// // //                 name="email"
// // //                 type="email"
// // //                 autoComplete="email"
// // //                 required
// // //                 value={formData.email}
// // //                 onChange={handleChange}
// // //                 className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
// // //                 placeholder="you@example.com"
// // //               />
// // //             </div>

// // //             {/* Password Input */}
// // //             <div>
// // //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Password
// // //               </label>
// // //               <div className="relative">
// // //                 <input
// // //                   id="password"
// // //                   name="password"
// // //                   type={showPassword ? "text" : "password"}
// // //                   autoComplete="current-password"
// // //                   required
// // //                   value={formData.password}
// // //                   onChange={handleChange}
// // //                   className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
// // //                   placeholder="••••••••"
// // //                 />
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setShowPassword(!showPassword)}
// // //                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
// // //                 >
// // //                   {showPassword ? "Hide" : "Show"}
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* Remember me & Forgot password */}
// // //             <div className="flex items-center justify-between">
// // //               <div className="flex items-center">
// // //                 <input
// // //                   id="remember-me"
// // //                   name="remember-me"
// // //                   type="checkbox"
// // //                   checked={rememberMe}
// // //                   onChange={(e) => setRememberMe(e.target.checked)}
// // //                   className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
// // //                 />
// // //                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
// // //                   Remember me
// // //                 </label>
// // //               </div>

// // //               <div className="text-sm">
// // //                 <Link to="/forgot-password" className="font-medium text-green-500 hover:text-green-600">
// // //                   Forgot your password?
// // //                 </Link>
// // //               </div>
// // //             </div>

// // //             {/* Submit Button */}
// // //             <div>
// // //               <button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
// // //                   loading ? 'opacity-70 cursor-not-allowed' : ''
// // //                 }`}
// // //               >
// // //                 {loading ? 'Signing in...' : 'Sign in'}
// // //               </button>
// // //             </div>
// // //           </form>

// // //           {/* Social Login Divider */}
// // //           <div className="mt-6">
// // //             <div className="relative">
// // //               <div className="absolute inset-0 flex items-center">
// // //                 <div className="w-full border-t border-gray-300"></div>
// // //               </div>
// // //               <div className="relative flex justify-center text-sm">
// // //                 <span className="px-2 bg-white text-gray-500">Or continue with</span>
// // //               </div>
// // //             </div>

// // //             <div className="mt-6 grid grid-cols-2 gap-3">
// // //               <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
// // //                 Google
// // //               </button>
// // //               <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
// // //                 Facebook
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';

// // export default function Login() {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [rememberMe, setRememberMe] = useState(false);
// //   const [loading, setLoading] = useState(false);
  
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setLoading(true);
    
// //     setTimeout(() => {
// //       setLoading(false);
// //       navigate('/freelancer/dashboard');
// //     }, 1000);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <Link to="/" className="flex justify-center items-center space-x-2">
// //           <span className="text-3xl font-bold text-green-500">Work</span>
// //           <span className="text-3xl font-bold text-gray-900">Net</span>
// //         </Link>
// //         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
// //           Sign in to your account
// //         </h2>
// //         <p className="mt-2 text-center text-sm text-gray-600">
// //           Or{' '}
// //           <Link to="/register" className="font-medium text-green-500 hover:text-green-600">
// //             create a new account
// //           </Link>
// //         </p>
// //       </div>

// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// //           <form className="space-y-6" onSubmit={handleSubmit}>
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Email address
// //               </label>
// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 required
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
// //                 placeholder="you@example.com"
// //               />
// //             </div>

// //             <div>
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   id="password"
// //                   name="password"
// //                   type={showPassword ? "text" : "password"}
// //                   required
// //                   value={formData.password}
// //                   onChange={handleChange}
// //                   className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
// //                   placeholder="••••••••"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
// //                 >
// //                   {showPassword ? "Hide" : "Show"}
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center">
// //                 <input
// //                   id="remember-me"
// //                   name="remember-me"
// //                   type="checkbox"
// //                   checked={rememberMe}
// //                   onChange={(e) => setRememberMe(e.target.checked)}
// //                   className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
// //                 />
// //                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
// //                   Remember me
// //                 </label>
// //               </div>

// //               <div className="text-sm">
// //                 <Link to="/forgot-password" className="font-medium text-green-500 hover:text-green-600">
// //                   Forgot your password?
// //                 </Link>
// //               </div>
// //             </div>

// //             <div>
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
// //                   loading ? 'opacity-70 cursor-not-allowed' : ''
// //                 }`}
// //               >
// //                 {loading ? 'Signing in...' : 'Sign in'}
// //               </button>
// //             </div>
// //           </form>

// //           <div className="mt-6 grid grid-cols-2 gap-3">
// //             <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
// //               Google
// //             </button>
// //             <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
// //               Facebook
// //             </button>
// //           </div>

// //           <div className="mt-8 text-center">
// //             <p className="text-sm text-gray-500">
// //               By signing in, you agree to our{' '}
// //               <a href="#" className="font-medium text-green-500 hover:text-green-600">
// //                 Terms of Service
// //               </a>{' '}
// //               and{' '}
// //               <a href="#" className="font-medium text-green-500 hover:text-green-600">
// //                 Privacy Policy
// //               </a>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, isAuthenticated, error: authError, clearError } = useAuth();
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
  
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
  
//   const from = location.state?.from?.pathname || '/';

//   // Rediriger si déjà connecté
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate(from, { replace: true });
//     }
    
//     // Nettoyer les erreurs précédentes
//     return () => clearError();
//   }, [isAuthenticated, navigate, from, clearError]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Effacer l'erreur pour ce champ
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.email) {
//       newErrors.email = 'L\'email est requis';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email invalide';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Le mot de passe est requis';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const result = await login(formData);
      
//       if (result.success) {
//         // Rediriger selon le rôle
//         const role = result.data?.role || 'client';
//         let redirectPath = '/';
        
//         if (role === 'freelancer') {
//           redirectPath = '/freelancer/dashboard';
//         } else if (role === 'client') {
//           redirectPath = '/client/dashboard';
//         } else if (role === 'admin') {
//           redirectPath = '/admin/dashboard';
//         }
        
//         navigate(redirectPath, { replace: true });
//       } else {
//         setErrors({ general: result.error || 'Échec de la connexion' });
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setErrors({ general: error.message || 'Une erreur est survenue' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDemoLogin = async (role) => {
//     const demoCredentials = {
//       freelancer: {
//         email: 'sadik@example.com',
//         password: 'password123'
//       },
//       client: {
//         email: 'client@example.com',
//         password: 'password123'
//       }
//     };
    
//     setFormData(demoCredentials[role] || demoCredentials.client);
//     setLoading(true);
    
//     try {
//       const result = await login(demoCredentials[role]);
      
//       if (result.success) {
//         const redirectPath = role === 'freelancer' 
//           ? '/freelancer/dashboard' 
//           : '/client/dashboard';
//         navigate(redirectPath, { replace: true });
//       }
//     } catch (error) {
//       setErrors({ general: 'Compte démo temporairement indisponible' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="flex items-center space-x-2">
//             <span className="text-3xl font-bold text-green-600">Work</span>
//             <span className="text-3xl font-bold text-gray-900">Net</span>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Connectez-vous à votre compte
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Ou{' '}
//           <Link 
//             to="/register" 
//             className="font-medium text-green-600 hover:text-green-500"
//           >
//             créez un nouveau compte
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
//           {/* Erreur générale */}
//           {(errors.general || authError) && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <div className="flex">
//                 <FaExclamationCircle className="h-5 w-5 text-red-400 mr-2" />
//                 <div className="flex-1">
//                   <p className="text-sm text-red-800">
//                     {errors.general || authError}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Adresse email
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaEnvelope className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200`}
//                   placeholder="vous@exemple.com"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-2 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             {/* Mot de passe */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Mot de passe
//               </label>
//               <div className="mt-1 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="current-password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`appearance-none block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200`}
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <span className="text-sm text-gray-600 hover:text-gray-900">Masquer</span>
//                   ) : (
//                     <span className="text-sm text-gray-600 hover:text-gray-900">Afficher</span>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-2 text-sm text-red-600">{errors.password}</p>
//               )}
//             </div>

//             {/* Options */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                   Se souvenir de moi
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <Link 
//                   to="/forgot-password" 
//                   className="font-medium text-green-600 hover:text-green-500"
//                 >
//                   Mot de passe oublié ?
//                 </Link>
//               </div>
//             </div>

//             {/* Bouton de connexion */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200`}
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Connexion en cours...
//                   </>
//                 ) : (
//                   'Se connecter'
//                 )}
//               </button>
//             </div>

//             {/* Comptes de démonstration */}
//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">
//                     Essayer avec un compte de démonstration
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <button
//                   type="button"
//                   onClick={() => handleDemoLogin('freelancer')}
//                   disabled={loading}
//                   className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
//                 >
//                   <span className="text-green-600 font-semibold">Freelancer</span>
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleDemoLogin('client')}
//                   disabled={loading}
//                   className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
//                 >
//                   <span className="text-green-600 font-semibold">Client</span>
//                 </button>
//               </div>
//             </div>
//           </form>

//           {/* Liens supplémentaires */}
//           <div className="mt-8">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Nouveau sur WorkNet ?
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-2 gap-3">
//               <Link
//                 to="/register?role=freelancer"
//                 className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//               >
//                 Devenir Freelancer
//               </Link>
//               <Link
//                 to="/register?role=client"
//                 className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
//               >
//                 Devenir Client
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Informations de sécurité */}
//         <div className="mt-8 text-center">
//           <p className="text-xs text-gray-500">
//             En vous connectant, vous acceptez nos{' '}
//             <Link to="/terms" className="text-green-600 hover:text-green-500">
//               Conditions d'utilisation
//             </Link>{' '}
//             et notre{' '}
//             <Link to="/privacy" className="text-green-600 hover:text-green-500">
//               Politique de confidentialité
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-green-500">Work</span>
            <span className="text-3xl font-bold text-gray-900">Net</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Connectez-vous à votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link to="/register" className="font-medium text-green-500 hover:text-green-600">
            créez un nouveau compte
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  disabled={loading}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-green-500 hover:text-green-600">
                  Mot de passe oublié?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </div>
                ) : 'Se connecter'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuez avec</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>
              <button
                type="button"
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Test credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Pour tester:</p>
            <div className="space-y-1 text-sm">
              <div>Email: <span className="font-mono text-gray-800">sadik@example.com</span></div>
              <div>Password: <span className="font-mono text-gray-800">[quelconque]</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}