// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

// // export default function ForgotPassword() {
// //   const [email, setEmail] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [sent, setSent] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     // Simulate API call
// //     setTimeout(() => {
// //       setLoading(false);
// //       setSent(true);
// //     }, 1500);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <Link to="/" className="flex justify-center items-center space-x-2">
// //           <span className="text-3xl font-bold text-fiverr-green">Work</span>
// //           <span className="text-3xl font-bold text-fiverr-dark">Net</span>
// //         </Link>
// //         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
// //           Reset your password
// //         </h2>
// //         <p className="mt-2 text-center text-sm text-gray-600">
// //           Enter your email address and we'll send you a link to reset your password.
// //         </p>
// //       </div>

// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// //           {!sent ? (
// //             <>
// //               {error && (
// //                 <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
// //                   {error}
// //                 </div>
// //               )}

// //               <form className="space-y-6" onSubmit={handleSubmit}>
// //                 <div>
// //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Email address
// //                   </label>
// //                   <div className="relative">
// //                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                       <FaEnvelope className="h-5 w-5 text-gray-400" />
// //                     </div>
// //                     <input
// //                       id="email"
// //                       name="email"
// //                       type="email"
// //                       autoComplete="email"
// //                       required
// //                       value={email}
// //                       onChange={(e) => setEmail(e.target.value)}
// //                       className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fiverr-green focus:border-fiverr-green sm:text-sm"
// //                       placeholder="you@example.com"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-fiverr-green hover:bg-fiverr-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fiverr-green ${
// //                       loading ? 'opacity-70 cursor-not-allowed' : ''
// //                     }`}
// //                   >
// //                     {loading ? (
// //                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                       </svg>
// //                     ) : (
// //                       'Send reset link'
// //                     )}
// //                   </button>
// //                 </div>
// //               </form>

// //               <div className="mt-6 text-center">
// //                 <Link to="/login" className="font-medium text-fiverr-green hover:text-fiverr-green-dark">
// //                   Back to sign in
// //                 </Link>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="text-center py-8">
// //               <FaCheckCircle className="h-16 w-16 text-fiverr-green mx-auto mb-4" />
// //               <h3 className="text-xl font-semibold text-gray-900 mb-2">
// //                 Check your email
// //               </h3>
// //               <p className="text-gray-600 mb-6">
// //                 We've sent a password reset link to <span className="font-semibold">{email}</span>
// //               </p>
// //               <div className="space-y-4">
// //                 <p className="text-sm text-gray-500">
// //                   Didn't receive the email? Check your spam folder or{' '}
// //                   <button
// //                     onClick={() => setSent(false)}
// //                     className="text-fiverr-green hover:text-fiverr-green-dark font-medium"
// //                   >
// //                     try again
// //                   </button>
// //                 </p>
// //                 <Link
// //                   to="/login"
// //                   className="inline-block w-full py-3 px-4 border border-fiverr-green rounded-lg text-sm font-medium text-fiverr-green hover:bg-fiverr-green-light"
// //                 >
// //                   Return to sign in
// //                 </Link>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [sent, setSent] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       setSent(true);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <Link to="/" className="flex justify-center items-center space-x-2">
//           <span className="text-3xl font-bold text-green-500">Work</span>
//           <span className="text-3xl font-bold text-gray-900">Net</span>
//         </Link>
//         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//           Reset your password
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Enter your email address and we'll send you a link to reset your password.
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {!sent ? (
//             <>
//               <form className="space-y-6" onSubmit={handleSubmit}>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email address
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                     placeholder="you@example.com"
//                   />
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
//                       loading ? 'opacity-70 cursor-not-allowed' : ''
//                     }`}
//                   >
//                     {loading ? 'Sending...' : 'Send reset link'}
//                   </button>
//                 </div>
//               </form>

//               <div className="mt-6 text-center">
//                 <Link to="/login" className="font-medium text-green-500 hover:text-green-600">
//                   Back to sign in
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-8">
//               <div className="text-4xl mb-4">✅</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Check your email
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 We've sent a password reset link to <span className="font-semibold">{email}</span>
//               </p>
//               <div className="space-y-4">
//                 <p className="text-sm text-gray-500">
//                   Didn't receive the email? Check your spam folder or{' '}
//                   <button
//                     onClick={() => setSent(false)}
//                     className="text-green-500 hover:text-green-600 font-medium"
//                   >
//                     try again
//                   </button>
//                 </p>
//                 <Link
//                   to="/login"
//                   className="inline-block w-full py-3 px-4 border border-green-500 rounded-lg text-sm font-medium text-green-500 hover:bg-green-50"
//                 >
//                   Return to sign in
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Mot de passe oublié</h2>
        <p className="text-gray-600 text-center">Page en construction...</p>
      </div>
    </div>
  );
}