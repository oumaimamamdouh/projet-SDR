// // // // import { useState } from 'react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import { FcGoogle } from 'react-icons/fc';
// // // // import { FaFacebook, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaBriefcase } from 'react-icons/fa';

// // // // export default function Register() {
// // // //   const [formData, setFormData] = useState({
// // // //     fullName: '',
// // // //     email: '',
// // // //     password: '',
// // // //     confirmPassword: '',
// // // //     userType: 'client', // 'client' or 'freelancer'
// // // //   });
  
// // // //   const [showPassword, setShowPassword] = useState(false);
// // // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');
// // // //   const [success, setSuccess] = useState('');
  
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
// // // //     setError('');
// // // //     setSuccess('');

// // // //     // Basic validation
// // // //     if (formData.password !== formData.confirmPassword) {
// // // //       setError('Passwords do not match');
// // // //       return;
// // // //     }

// // // //     if (formData.password.length < 6) {
// // // //       setError('Password must be at least 6 characters long');
// // // //       return;
// // // //     }

// // // //     setLoading(true);

// // // //     // Simulate API call
// // // //     setTimeout(() => {
// // // //       setLoading(false);
// // // //       setSuccess('Account created successfully! Redirecting...');
      
// // // //       // Redirect based on user type
// // // //       setTimeout(() => {
// // // //         if (formData.userType === 'freelancer') {
// // // //           navigate('/freelancer/dashboard');
// // // //         } else {
// // // //           navigate('/client/dashboard');
// // // //         }
// // // //       }, 1500);
// // // //     }, 2000);
// // // //   };

// // // //   const handleGoogleSignup = () => {
// // // //     console.log('Google signup');
// // // //   };

// // // //   const handleFacebookSignup = () => {
// // // //     console.log('Facebook signup');
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // // //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// // // //         <Link to="/" className="flex justify-center items-center space-x-2">
// // // //           <span className="text-3xl font-bold text-fiverr-green">Work</span>
// // // //           <span className="text-3xl font-bold text-fiverr-dark">Net</span>
// // // //         </Link>
// // // //         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
// // // //           Create your account
// // // //         </h2>
// // // //         <p className="mt-2 text-center text-sm text-gray-600">
// // // //           Already have an account?{' '}
// // // //           <Link to="/login" className="font-medium text-fiverr-green hover:text-fiverr-green-dark">
// // // //             Sign in
// // // //           </Link>
// // // //         </p>
// // // //       </div>

// // // //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
// // // //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// // // //           {error && (
// // // //             <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
// // // //               {error}
// // // //             </div>
// // // //           )}

// // // //           {success && (
// // // //             <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
// // // //               {success}
// // // //             </div>
// // // //           )}

// // // //           <form className="space-y-6" onSubmit={handleSubmit}>
// // // //             {/* User Type Selection */}
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 I want to join as a
// // // //               </label>
// // // //               <div className="grid grid-cols-2 gap-4">
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => setFormData(prev => ({ ...prev, userType: 'client' }))}
// // // //                   className={`py-4 px-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
// // // //                     formData.userType === 'client'
// // // //                       ? 'border-fiverr-green bg-fiverr-green-light'
// // // //                       : 'border-gray-300 hover:border-fiverr-green'
// // // //                   }`}
// // // //                 >
// // // //                   <FaUser className={`h-8 w-8 mb-2 ${
// // // //                     formData.userType === 'client' ? 'text-fiverr-green' : 'text-gray-400'
// // // //                   }`} />
// // // //                   <span className={`font-medium ${
// // // //                     formData.userType === 'client' ? 'text-fiverr-green' : 'text-gray-700'
// // // //                   }`}>Client</span>
// // // //                   <span className="text-xs text-gray-500 mt-1">Buy services</span>
// // // //                 </button>

// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => setFormData(prev => ({ ...prev, userType: 'freelancer' }))}
// // // //                   className={`py-4 px-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
// // // //                     formData.userType === 'freelancer'
// // // //                       ? 'border-fiverr-green bg-fiverr-green-light'
// // // //                       : 'border-gray-300 hover:border-fiverr-green'
// // // //                   }`}
// // // //                 >
// // // //                   <FaBriefcase className={`h-8 w-8 mb-2 ${
// // // //                     formData.userType === 'freelancer' ? 'text-fiverr-green' : 'text-gray-400'
// // // //                   }`} />
// // // //                   <span className={`font-medium ${
// // // //                     formData.userType === 'freelancer' ? 'text-fiverr-green' : 'text-gray-700'
// // // //                   }`}>Freelancer</span>
// // // //                   <span className="text-xs text-gray-500 mt-1">Sell services</span>
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             {/* Full Name */}
// // // //             <div>
// // // //               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 Full Name
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // // //                   <FaUser className="h-5 w-5 text-gray-400" />
// // // //                 </div>
// // // //                 <input
// // // //                   id="fullName"
// // // //                   name="fullName"
// // // //                   type="text"
// // // //                   autoComplete="name"
// // // //                   required
// // // //                   value={formData.fullName}
// // // //                   onChange={handleChange}
// // // //                   className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fiverr-green focus:border-fiverr-green sm:text-sm"
// // // //                   placeholder="John Doe"
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {/* Email */}
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

// // // //             {/* Password */}
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
// // // //                   autoComplete="new-password"
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
// // // //               <p className="mt-1 text-xs text-gray-500">
// // // //                 Must be at least 6 characters long
// // // //               </p>
// // // //             </div>

// // // //             {/* Confirm Password */}
// // // //             <div>
// // // //               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 Confirm Password
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// // // //                   <FaLock className="h-5 w-5 text-gray-400" />
// // // //                 </div>
// // // //                 <input
// // // //                   id="confirmPassword"
// // // //                   name="confirmPassword"
// // // //                   type={showConfirmPassword ? "text" : "password"}
// // // //                   autoComplete="new-password"
// // // //                   required
// // // //                   value={formData.confirmPassword}
// // // //                   onChange={handleChange}
// // // //                   className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fiverr-green focus:border-fiverr-green sm:text-sm"
// // // //                   placeholder="••••••••"
// // // //                 />
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // // //                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
// // // //                 >
// // // //                   {showConfirmPassword ? (
// // // //                     <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-500" />
// // // //                   ) : (
// // // //                     <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
// // // //                   )}
// // // //                 </button>
// // // //               </div>
// // // //             </div>

// // // //             {/* Terms and Conditions */}
// // // //             <div className="flex items-start">
// // // //               <div className="flex items-center h-5">
// // // //                 <input
// // // //                   id="terms"
// // // //                   name="terms"
// // // //                   type="checkbox"
// // // //                   required
// // // //                   className="h-4 w-4 text-fiverr-green focus:ring-fiverr-green border-gray-300 rounded"
// // // //                 />
// // // //               </div>
// // // //               <div className="ml-3 text-sm">
// // // //                 <label htmlFor="terms" className="font-medium text-gray-700">
// // // //                   I agree to the{' '}
// // // //                   <a href="#" className="text-fiverr-green hover:text-fiverr-green-dark">
// // // //                     Terms of Service
// // // //                   </a>{' '}
// // // //                   and{' '}
// // // //                   <a href="#" className="text-fiverr-green hover:text-fiverr-green-dark">
// // // //                     Privacy Policy
// // // //                   </a>
// // // //                 </label>
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
// // // //                   `Create ${formData.userType === 'freelancer' ? 'Freelancer' : 'Client'} Account`
// // // //                 )}
// // // //               </button>
// // // //             </div>
// // // //           </form>

// // // //           {/* Social Signup Divider */}
// // // //           <div className="mt-6">
// // // //             <div className="relative">
// // // //               <div className="absolute inset-0 flex items-center">
// // // //                 <div className="w-full border-t border-gray-300"></div>
// // // //               </div>
// // // //               <div className="relative flex justify-center text-sm">
// // // //                 <span className="px-2 bg-white text-gray-500">Or sign up with</span>
// // // //               </div>
// // // //             </div>

// // // //             <div className="mt-6 grid grid-cols-2 gap-3">
// // // //               <button
// // // //                 onClick={handleGoogleSignup}
// // // //                 className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
// // // //               >
// // // //                 <FcGoogle className="h-5 w-5 mr-2" />
// // // //                 Google
// // // //               </button>

// // // //               <button
// // // //                 onClick={handleFacebookSignup}
// // // //                 className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
// // // //               >
// // // //                 <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
// // // //                 Facebook
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Benefits Section */}
// // // //       <div className="mt-8 text-center">
// // // //         <h3 className="text-lg font-semibold text-gray-900 mb-4">
// // // //           Why join WorkNet?
// // // //         </h3>
// // // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
// // // //           <div className="bg-white p-4 rounded-lg shadow-sm">
// // // //             <div className="text-fiverr-green font-semibold mb-2">✓ Quality Work</div>
// // // //             <p className="text-sm text-gray-600">Access talented freelancers for your projects</p>
// // // //           </div>
// // // //           <div className="bg-white p-4 rounded-lg shadow-sm">
// // // //             <div className="text-fiverr-green font-semibold mb-2">✓ Secure Payments</div>
// // // //             <p className="text-sm text-gray-600">Your money is protected until work is complete</p>
// // // //           </div>
// // // //           <div className="bg-white p-4 rounded-lg shadow-sm">
// // // //             <div className="text-fiverr-green font-semibold mb-2">✓ 24/7 Support</div>
// // // //             <p className="text-sm text-gray-600">Get help whenever you need it</p>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';

// // // export default function Register() {
// // //   const [formData, setFormData] = useState({
// // //     fullName: '',
// // //     email: '',
// // //     password: '',
// // //     confirmPassword: '',
// // //     userType: 'client',
// // //   });
  
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [success, setSuccess] = useState('');
  
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
// // //     setError('');
// // //     setSuccess('');

// // //     if (formData.password !== formData.confirmPassword) {
// // //       setError('Passwords do not match');
// // //       return;
// // //     }

// // //     if (formData.password.length < 6) {
// // //       setError('Password must be at least 6 characters long');
// // //       return;
// // //     }

// // //     setLoading(true);

// // //     setTimeout(() => {
// // //       setLoading(false);
// // //       setSuccess('Account created successfully! Redirecting...');
      
// // //       setTimeout(() => {
// // //         if (formData.userType === 'freelancer') {
// // //           navigate('/freelancer/dashboard');
// // //         } else {
// // //           navigate('/client/dashboard');
// // //         }
// // //       }, 1500);
// // //     }, 2000);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// // //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// // //         <Link to="/" className="flex justify-center items-center space-x-2">
// // //           <span className="text-3xl font-bold text-green-500">Work</span>
// // //           <span className="text-3xl font-bold text-gray-900">Net</span>
// // //         </Link>
// // //         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
// // //           Create your account
// // //         </h2>
// // //         <p className="mt-2 text-center text-sm text-gray-600">
// // //           Already have an account?{' '}
// // //           <Link to="/login" className="font-medium text-green-500 hover:text-green-600">
// // //             Sign in
// // //           </Link>
// // //         </p>
// // //       </div>

// // //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
// // //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// // //           {error && (
// // //             <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
// // //               {error}
// // //             </div>
// // //           )}

// // //           {success && (
// // //             <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
// // //               {success}
// // //             </div>
// // //           )}

// // //           <form className="space-y-6" onSubmit={handleSubmit}>
// // //             {/* User Type Selection */}
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700 mb-2">
// // //                 I want to join as a
// // //               </label>
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setFormData(prev => ({ ...prev, userType: 'client' }))}
// // //                   className={`py-4 px-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
// // //                     formData.userType === 'client'
// // //                       ? 'border-green-500 bg-green-50'
// // //                       : 'border-gray-300 hover:border-green-500'
// // //                   }`}
// // //                 >
// // //                   <span className="text-2xl mb-2">👤</span>
// // //                   <span className={`font-medium ${
// // //                     formData.userType === 'client' ? 'text-green-500' : 'text-gray-700'
// // //                   }`}>Client</span>
// // //                   <span className="text-xs text-gray-500 mt-1">Buy services</span>
// // //                 </button>

// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setFormData(prev => ({ ...prev, userType: 'freelancer' }))}
// // //                   className={`py-4 px-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
// // //                     formData.userType === 'freelancer'
// // //                       ? 'border-green-500 bg-green-50'
// // //                       : 'border-gray-300 hover:border-green-500'
// // //                   }`}
// // //                 >
// // //                   <span className="text-2xl mb-2">💼</span>
// // //                   <span className={`font-medium ${
// // //                     formData.userType === 'freelancer' ? 'text-green-500' : 'text-gray-700'
// // //                   }`}>Freelancer</span>
// // //                   <span className="text-xs text-gray-500 mt-1">Sell services</span>
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* Full Name */}
// // //             <div>
// // //               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Full Name
// // //               </label>
// // //               <input
// // //                 id="fullName"
// // //                 name="fullName"
// // //                 type="text"
// // //                 autoComplete="name"
// // //                 required
// // //                 value={formData.fullName}
// // //                 onChange={handleChange}
// // //                 className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
// // //                 placeholder="John Doe"
// // //               />
// // //             </div>

// // //             {/* Email */}
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

// // //             {/* Password */}
// // //             <div>
// // //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Password
// // //               </label>
// // //               <div className="relative">
// // //                 <input
// // //                   id="password"
// // //                   name="password"
// // //                   type={showPassword ? "text" : "password"}
// // //                   autoComplete="new-password"
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
// // //               <p className="mt-1 text-xs text-gray-500">
// // //                 Must be at least 6 characters long
// // //               </p>
// // //             </div>

// // //             {/* Confirm Password */}
// // //             <div>
// // //               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
// // //                 Confirm Password
// // //               </label>
// // //               <div className="relative">
// // //                 <input
// // //                   id="confirmPassword"
// // //                   name="confirmPassword"
// // //                   type={showConfirmPassword ? "text" : "password"}
// // //                   autoComplete="new-password"
// // //                   required
// // //                   value={formData.confirmPassword}
// // //                   onChange={handleChange}
// // //                   className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
// // //                   placeholder="••••••••"
// // //                 />
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// // //                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
// // //                 >
// // //                   {showConfirmPassword ? "Hide" : "Show"}
// // //                 </button>
// // //               </div>
// // //             </div>

// // //             {/* Terms and Conditions */}
// // //             <div className="flex items-start">
// // //               <div className="flex items-center h-5">
// // //                 <input
// // //                   id="terms"
// // //                   name="terms"
// // //                   type="checkbox"
// // //                   required
// // //                   className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
// // //                 />
// // //               </div>
// // //               <div className="ml-3 text-sm">
// // //                 <label htmlFor="terms" className="font-medium text-gray-700">
// // //                   I agree to the{' '}
// // //                   <a href="#" className="text-green-500 hover:text-green-600">
// // //                     Terms of Service
// // //                   </a>{' '}
// // //                   and{' '}
// // //                   <a href="#" className="text-green-500 hover:text-green-600">
// // //                     Privacy Policy
// // //                   </a>
// // //                 </label>
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
// // //                 {loading ? 'Creating account...' : `Create ${formData.userType === 'freelancer' ? 'Freelancer' : 'Client'} Account`}
// // //               </button>
// // //             </div>
// // //           </form>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';

// // export default function Register() {
// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     userType: 'client',
// //   });
  
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');
  
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
// //     setError('');
// //     setSuccess('');

// //     if (formData.password !== formData.confirmPassword) {
// //       setError('Passwords do not match');
// //       return;
// //     }

// //     if (formData.password.length < 6) {
// //       setError('Password must be at least 6 characters long');
// //       return;
// //     }

// //     setLoading(true);

// //     setTimeout(() => {
// //       setLoading(false);
// //       setSuccess('Account created successfully! Redirecting...');
      
// //       setTimeout(() => {
// //         if (formData.userType === 'freelancer') {
// //           navigate('/freelancer/dashboard');
// //         } else {
// //           navigate('/client/dashboard');
// //         }
// //       }, 1500);
// //     }, 2000);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <Link to="/" className="flex justify-center items-center space-x-2">
// //           <span className="text-3xl font-bold text-green-500">Work</span>
// //           <span className="text-3xl font-bold text-gray-900">Net</span>
// //         </Link>
// //         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
// //           Create your account
// //         </h2>
// //         <p className="mt-2 text-center text-sm text-gray-600">
// //           Already have an account?{' '}
// //           <Link to="/login" className="font-medium text-green-500 hover:text-green-600">
// //             Sign in
// //           </Link>
// //         </p>
// //       </div>

// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
// //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// //           {error && (
// //             <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
// //               {error}
// //             </div>
// //           )}

// //           {success && (
// //             <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
// //               {success}
// //             </div>
// //           )}

// //           <form className="space-y-6" onSubmit={handleSubmit}>
// //             {/* User Type Selection */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 I want to join as a
// //               </label>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <button
// //                   type="button"
// //                   onClick={() => setFormData(prev => ({ ...prev, userType: 'client' }))}
// //                   className={`py-4 px-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
// //                     formData.userType === 'client'
// //                       ? 'border-green-500 bg-green-50'
// //                       : 'border-gray-300 hover:border-green-500'
// //                   }`}
// //                 >
// //                   <span className="text-2xl mb-2">👤</span>
// //                   <span className={`font-medium ${
// //                     formData.userType === 'client' ? 'text-green-500' : 'text-gray-700'
// //                   }`}>Client</span>
// //                   <span className="text-xs text-gray-500 mt-1">Buy services</span>
// //                 </button>

// //                 <button
// //                   type="button"
// //                   onClick={() => setFormData(prev => ({ ...prev, userType: 'freelancer' }))}
// //                   className={`py-4 px-4 border rounded-lg flex flex-col items-center justify-center transition-colors ${
// //                     formData.userType === 'freelancer'
// //                       ? 'border-green-500 bg-green-50'
// //                       : 'border-gray-300 hover:border-green-500'
// //                   }`}
// //                 >
// //                   <span className="text-2xl mb-2">💼</span>
// //                   <span className={`font-medium ${
// //                     formData.userType === 'freelancer' ? 'text-green-500' : 'text-gray-700'
// //                   }`}>Freelancer</span>
// //                   <span className="text-xs text-gray-500 mt-1">Sell services</span>
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Full Name */}
// //             <div>
// //               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Full Name
// //               </label>
// //               <input
// //                 id="fullName"
// //                 name="fullName"
// //                 type="text"
// //                 required
// //                 value={formData.fullName}
// //                 onChange={handleChange}
// //                 className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
// //                 placeholder="John Doe"
// //               />
// //             </div>

// //             {/* Email */}
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

// //             {/* Password */}
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
// //               <p className="mt-1 text-xs text-gray-500">
// //                 Must be at least 6 characters long
// //               </p>
// //             </div>

// //             {/* Confirm Password */}
// //             <div>
// //               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
// //                 Confirm Password
// //               </label>
// //               <div className="relative">
// //                 <input
// //                   id="confirmPassword"
// //                   name="confirmPassword"
// //                   type={showConfirmPassword ? "text" : "password"}
// //                   required
// //                   value={formData.confirmPassword}
// //                   onChange={handleChange}
// //                   className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
// //                   placeholder="••••••••"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
// //                 >
// //                   {showConfirmPassword ? "Hide" : "Show"}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Terms and Conditions */}
// //             <div className="flex items-start">
// //               <div className="flex items-center h-5">
// //                 <input
// //                   id="terms"
// //                   name="terms"
// //                   type="checkbox"
// //                   required
// //                   className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
// //                 />
// //               </div>
// //               <div className="ml-3 text-sm">
// //                 <label htmlFor="terms" className="font-medium text-gray-700">
// //                   I agree to the{' '}
// //                   <a href="#" className="text-green-500 hover:text-green-600">
// //                     Terms of Service
// //                   </a>{' '}
// //                   and{' '}
// //                   <a href="#" className="text-green-500 hover:text-green-600">
// //                     Privacy Policy
// //                   </a>
// //                 </label>
// //               </div>
// //             </div>

// //             {/* Submit Button */}
// //             <div>
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
// //                   loading ? 'opacity-70 cursor-not-allowed' : ''
// //                 }`}
// //               >
// //                 {loading ? 'Creating account...' : `Create ${formData.userType === 'freelancer' ? 'Freelancer' : 'Client'} Account`}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { 
//   FaUser, 
//   FaEnvelope, 
//   FaLock, 
//   FaUserTag, 
//   FaPhone, 
//   FaMapMarkerAlt,
//   FaExclamationCircle 
// } from 'react-icons/fa';

// export default function Register() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { register, isAuthenticated, error: authError, clearError } = useAuth();
  
//   const [formData, setFormData] = useState({
//     full_name: '',
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: searchParams.get('role') || 'client',
//     phone: '',
//     location: ''
//   });
  
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Rediriger si déjà connecté
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
    
//     // Nettoyer les erreurs précédentes
//     return () => clearError();
//   }, [isAuthenticated, navigate, clearError]);

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

//   const handleRoleChange = (role) => {
//     setFormData(prev => ({ ...prev, role }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.full_name.trim()) {
//       newErrors.full_name = 'Le nom complet est requis';
//     }
    
//     if (!formData.username.trim()) {
//       newErrors.username = "Le nom d'utilisateur est requis";
//     } else if (formData.username.length < 3) {
//       newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères";
//     }
    
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
    
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
//       // Préparer les données pour l'API
//       const userData = {
//         full_name: formData.full_name,
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role
//       };
      
//       // Ajouter les champs optionnels s'ils sont remplis
//       if (formData.phone) userData.phone = formData.phone;
//       if (formData.location) userData.location = formData.location;
      
//       const result = await register(userData);
      
//       if (result.success) {
//         // Rediriger selon le rôle
//         let redirectPath = '/';
        
//         if (formData.role === 'freelancer') {
//           redirectPath = '/freelancer/dashboard';
//         } else if (formData.role === 'client') {
//           redirectPath = '/client/dashboard';
//         }
        
//         navigate(redirectPath, { replace: true });
//       } else {
//         setErrors({ general: result.error || 'Échec de l\'inscription' });
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setErrors({ general: error.message || 'Une erreur est survenue' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
//         <div className="flex justify-center">
//           <div className="flex items-center space-x-2">
//             <span className="text-3xl font-bold text-green-600">Work</span>
//             <span className="text-3xl font-bold text-gray-900">Net</span>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Créer votre compte WorkNet
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Rejoignez la plus grande communauté de freelancers au Maroc
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
//         <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
//           {/* Sélection du rôle */}
//           <div className="mb-8">
//             <label className="block text-sm font-medium text-gray-700 mb-4">
//               Je veux m'inscrire en tant que :
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 type="button"
//                 onClick={() => handleRoleChange('client')}
//                 className={`py-4 px-6 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 ${formData.role === 'client' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-300 hover:border-green-300 hover:bg-green-50'}`}
//               >
//                 <FaUser className="h-8 w-8 mb-2" />
//                 <span className="font-semibold">Client</span>
//                 <span className="text-sm text-gray-600 mt-1">Je veux trouver des services</span>
//               </button>
//               <button
//                 type="button"
//                 onClick={() => handleRoleChange('freelancer')}
//                 className={`py-4 px-6 rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 ${formData.role === 'freelancer' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'}`}
//               >
//                 <FaUserTag className="h-8 w-8 mb-2" />
//                 <span className="font-semibold">Freelancer</span>
//                 <span className="text-sm text-gray-600 mt-1">Je veux offrir mes services</span>
//               </button>
//             </div>
//           </div>

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
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Nom complet */}
//               <div>
//                 <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
//                   Nom complet
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaUser className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="full_name"
//                     name="full_name"
//                     type="text"
//                     required
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-3 py-3 border ${errors.full_name ? 'border-red-300' : 'border-gray-300'} rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200`}
//                     placeholder="Votre nom complet"
//                   />
//                 </div>
//                 {errors.full_name && (
//                   <p className="mt-2 text-sm text-red-600">{errors.full_name}</p>
//                 )}
//               </div>

//               {/* Nom d'utilisateur */}
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                   Nom d'utilisateur
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaUserTag className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     required
//                     value={formData.username}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-3 py-3 border ${errors.username ? 'border-red-300' : 'border-gray-300'} rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200`}
//                     placeholder="ex: john_doe"
//                   />
//                 </div>
//                 {errors.username && (
//                   <p className="mt-2 text-sm text-red-600">{errors.username}</p>
//                 )}
//               </div>

//               {/* Email */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Adresse email
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaEnvelope className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200`}
//                     placeholder="vous@exemple.com"
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="mt-2 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               {/* Téléphone (optionnel) */}
//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                   Téléphone <span className="text-gray-500">(optionnel)</span>
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaPhone className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200"
//                     placeholder="06 12 34 56 78"
//                   />
//                 </div>
//               </div>

//               {/* Mot de passe */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Mot de passe
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200`}
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     <span className="text-sm text-gray-600 hover:text-gray-900">
//                       {showPassword ? 'Masquer' : 'Afficher'}
//                     </span>
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="mt-2 text-sm text-red-600">{errors.password}</p>
//                 )}
//                 <p className="mt-1 text-xs text-gray-500">
//                   Minimum 6 caractères
//                 </p>
//               </div>

//               {/* Confirmation mot de passe */}
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirmer le mot de passe
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaLock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className={`appearance-none block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200`}
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     <span className="text-sm text-gray-600 hover:text-gray-900">
//                       {showConfirmPassword ? 'Masquer' : 'Afficher'}
//                     </span>
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
//                 )}
//               </div>

//               {/* Localisation (optionnel) */}
//               <div className="md:col-span-2">
//                 <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//                   Localisation <span className="text-gray-500">(optionnel)</span>
//                 </label>
//                 <div className="mt-1 relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="location"
//                     name="location"
//                     type="text"
//                     value={formData.location}
//                     onChange={handleChange}
//                     className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-200"
//                     placeholder="Ville, Pays"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Termes et conditions */}
//             <div className="flex items-start">
//               <div className="flex items-center h-5">
//                 <input
//                   id="terms"
//                   name="terms"
//                   type="checkbox"
//                   required
//                   className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
//                 />
//               </div>
//               <div className="ml-3 text-sm">
//                 <label htmlFor="terms" className="font-medium text-gray-700">
//                   J'accepte les{' '}
//                   <Link to="/terms" className="text-green-600 hover:text-green-500">
//                     conditions d'utilisation
//                   </Link>{' '}
//                   et la{' '}
//                   <Link to="/privacy" className="text-green-600 hover:text-green-500">
//                     politique de confidentialité
//                   </Link>
//                 </label>
//               </div>
//             </div>

//             {/* Bouton d'inscription */}
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
//                     Création du compte...
//                   </>
//                 ) : formData.role === 'freelancer' ? (
//                   'Devenir Freelancer'
//                 ) : (
//                   'Créer mon compte Client'
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Lien vers login */}
//           <div className="mt-8 text-center">
//             <p className="text-sm text-gray-600">
//               Vous avez déjà un compte ?{' '}
//               <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
//                 Connectez-vous
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Informations supplémentaires */}
//         <div className="mt-8 text-center">
//           <p className="text-xs text-gray-500">
//             WorkNet protège vos données et garantit des transactions sécurisées.
//             Nous ne partageons jamais vos informations personnelles.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'freelancer'
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Le nom complet est requis';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Le nom d\'utilisateur est requis';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Minimum 3 caractères';
    }
    
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
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
      // Prépare les données pour l'API
      const userData = {
        full_name: formData.full_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };
      
      await register(userData);
    } catch (error) {
      console.error('Register error:', error);
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
          Créez votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Déjà membre?{' '}
          <Link to="/login" className="font-medium text-green-500 hover:text-green-600">
            Connectez-vous
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <div className="mt-1">
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.full_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  disabled={loading}
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nom d'utilisateur
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  disabled={loading}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

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
                  autoComplete="new-password"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Je veux m'inscrire en tant que:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'freelancer'})}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${formData.role === 'freelancer' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-300'}`}
                  disabled={loading}
                >
                  <div className="font-bold text-lg">👨‍💻 Freelancer</div>
                  <div className="text-sm text-gray-600 mt-1">Offrir mes services</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'client'})}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${formData.role === 'client' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-300'}`}
                  disabled={loading}
                >
                  <div className="font-bold text-lg">👔 Client</div>
                  <div className="text-sm text-gray-600 mt-1">Trouver des services</div>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                J'accepte les{' '}
                <a href="#" className="text-green-500 hover:text-green-600">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" className="text-green-500 hover:text-green-600">
                  politique de confidentialité
                </a>
              </label>
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
                    Inscription en cours...
                  </div>
                ) : 'Créer mon compte'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}