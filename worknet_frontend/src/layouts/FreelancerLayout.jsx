// import { Outlet } from 'react-router-dom';
// import Navbar from '../components/layout/Navbar';
// import Sidebar from '../components/layout/Sidebar';
// import Footer from '../components/layout/Footer';
// import styles from './FreelancerLayout.module.css';
// import { useState } from 'react';

// const FreelancerLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className={styles.layout}>
//       <Navbar toggleSidebar={toggleSidebar} />
      
//       <div className={styles.mainContainer}>
//         <div className={`${styles.sidebarWrapper} ${isSidebarOpen ? styles.open : ''}`}>
//           <Sidebar />
//           {isSidebarOpen && (
//             <div 
//               className={styles.overlay}
//               onClick={() => setIsSidebarOpen(false)}
//             />
//           )}
//         </div>
        
//         <main className={styles.content}>
//           <div className={styles.contentWrapper}>
//             <Outlet />
//           </div>
//         </main>
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default FreelancerLayout;


import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';

const FreelancerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default FreelancerLayout;