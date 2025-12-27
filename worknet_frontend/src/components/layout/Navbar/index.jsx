import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaBell, FaEnvelope, FaUserCircle, FaBars } from 'react-icons/fa';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Mock data - remplace par tes appels API
  useEffect(() => {
    // Simuler des compteurs
    setNotificationsCount(3);
    setMessagesCount(2);
  }, []);

  const freelancerLinks = [
    { path: '/freelancer/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/freelancer/gigs', label: 'Mes Services', icon: '🎯' },
    { path: '/freelancer/orders', label: 'Commandes', icon: '📦' },
    { path: '/freelancer/messages', label: 'Messages', icon: '💬' },
    { path: '/freelancer/earnings', label: 'Revenus', icon: '💰' },
    { path: '/freelancer/profile', label: 'Profil', icon: '👤' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo et Navigation */}
        <div className={styles.logoSection}>
          <button 
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>
          
          <Link to="/" className={styles.logo}>
            <span className={styles.logoGreen}>Work</span>
            <span className={styles.logoDark}>Net</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {freelancerLinks.slice(0, 3).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.navLink} ${
                  location.pathname === link.path ? styles.active : ''
                }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher des services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </form>

        {/* User Actions */}
        <div className={styles.actionsSection}>
          <Link to="/freelancer/notifications" className={styles.actionButton}>
            <FaBell />
            {notificationsCount > 0 && (
              <span className={styles.badge}>{notificationsCount}</span>
            )}
          </Link>

          <Link to="/freelancer/messages" className={styles.actionButton}>
            <FaEnvelope />
            {messagesCount > 0 && (
              <span className={styles.badge}>{messagesCount}</span>
            )}
          </Link>

          <div className={styles.userDropdown}>
            <button className={styles.userButton}>
              {user?.avatar_url ? (
                <img 
                  src={user.avatar_url} 
                  alt={user.full_name || user.username}
                  className={styles.userAvatar}
                />
              ) : (
                <FaUserCircle className={styles.userIcon} />
              )}
              <span className={styles.userName}>
                {user?.full_name?.split(' ')[0] || user?.username}
              </span>
            </button>

            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownHeader}>
                <div className={styles.dropdownUserInfo}>
                  {user?.avatar_url ? (
                    <img 
                      src={user.avatar_url} 
                      alt={user.full_name || user.username}
                      className={styles.dropdownAvatar}
                    />
                  ) : (
                    <FaUserCircle className={styles.dropdownAvatarIcon} />
                  )}
                  <div>
                    <div className={styles.dropdownUserName}>
                      {user?.full_name || user?.username}
                    </div>
                    <div className={styles.dropdownUserEmail}>
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.dropdownDivider}></div>

              <Link to="/freelancer/profile" className={styles.dropdownItem}>
                👤 Mon Profil
              </Link>
              <Link to="/freelancer/gigs" className={styles.dropdownItem}>
                🎯 Mes Services
              </Link>
              <Link to="/freelancer/orders" className={styles.dropdownItem}>
                📦 Commandes
              </Link>
              <Link to="/freelancer/earnings" className={styles.dropdownItem}>
                💰 Revenus
              </Link>
              <Link to="/freelancer/settings" className={styles.dropdownItem}>
                ⚙️ Paramètres
              </Link>

              <div className={styles.dropdownDivider}></div>

              <button onClick={handleLogout} className={styles.logoutButton}>
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={styles.mobileNav}>
          {freelancerLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.mobileNavLink} ${
                location.pathname === link.path ? styles.active : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;