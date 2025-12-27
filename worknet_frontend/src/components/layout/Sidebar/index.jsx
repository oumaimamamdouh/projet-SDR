import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBox, 
  FaShoppingCart, 
  FaComments, 
  FaMoneyBill, 
  FaUser, 
  FaCog,
  FaChartLine,
  FaHeart
} from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navItems = [
    {
      path: '/freelancer/dashboard',
      icon: <FaTachometerAlt />,
      label: 'Dashboard',
      badge: null
    },
    {
      path: '/freelancer/gigs',
      icon: <FaBox />,
      label: 'Mes Services',
      badge: '8'
    },
    {
      path: '/freelancer/orders',
      icon: <FaShoppingCart />,
      label: 'Commandes',
      badge: '5'
    },
    {
      path: '/freelancer/messages',
      icon: <FaComments />,
      label: 'Messages',
      badge: '12'
    },
    {
      path: '/freelancer/earnings',
      icon: <FaMoneyBill />,
      label: 'Revenus',
      badge: null
    },
    {
      path: '/freelancer/analytics',
      icon: <FaChartLine />,
      label: 'Analytiques',
      badge: null
    },
    {
      path: '/freelancer/saved',
      icon: <FaHeart />,
      label: 'Favoris',
      badge: '3'
    },
    {
      path: '/freelancer/profile',
      icon: <FaUser />,
      label: 'Mon Profil',
      badge: null
    },
    {
      path: '/freelancer/settings',
      icon: <FaCog />,
      label: 'Paramètres',
      badge: null
    }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h3 className={styles.sidebarTitle}>Menu Freelance</h3>
      </div>
      
      <nav className={styles.sidebarNav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
            {item.badge && (
              <span className={styles.navBadge}>{item.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className={styles.sidebarFooter}>
        <div className={styles.statsCard}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>8</div>
            <div className={styles.statLabel}>Services</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>5</div>
            <div className={styles.statLabel}>Commandes</div>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>4.8</div>
            <div className={styles.statLabel}>Note</div>
          </div>
        </div>
        
        <div className={styles.upgradeCard}>
          <h4 className={styles.upgradeTitle}>Pro Seller</h4>
          <p className={styles.upgradeText}>
            Passez à Pro pour plus de fonctionnalités
          </p>
          <button className={styles.upgradeButton}>
            Mettre à niveau
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;