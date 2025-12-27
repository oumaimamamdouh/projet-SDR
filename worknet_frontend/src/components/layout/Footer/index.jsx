import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram,
  FaHeart,
  FaShieldAlt
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Catégories': [
      { label: 'Design Graphique', path: '/categories/design' },
      { label: 'Développement Web', path: '/categories/web-development' },
      { label: 'Marketing Digital', path: '/categories/marketing' },
      { label: 'Rédaction', path: '/categories/writing' },
      { label: 'Vidéo & Animation', path: '/categories/video' }
    ],
    'À propos': [
      { label: 'Comment ça marche', path: '/about/how-it-works' },
      { label: 'Tarifs', path: '/about/pricing' },
      { label: 'Blog', path: '/blog' },
      { label: 'Carrières', path: '/careers' },
      { label: 'Presse', path: '/press' }
    ],
    'Support': [
      { label: 'Centre d\'aide', path: '/help-center' },
      { label: 'Confiance & Sécurité', path: '/trust-safety' },
      { label: 'Vendre sur WorkNet', path: '/sell' },
      { label: 'Acheter sur WorkNet', path: '/buy' },
      { label: 'Forum', path: '/forum' }
    ],
    'Communauté': [
      { label: 'Événements', path: '/community/events' },
      { label: 'Blog', path: '/blog' },
      { label: 'Forum', path: '/forum' },
      { label: 'Podcast', path: '/community/podcast' },
      { label: 'Affiliés', path: '/affiliates' }
    ]
  };

  const socialLinks = [
    { icon: <FaFacebookF />, label: 'Facebook', url: 'https://facebook.com' },
    { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com' },
    { icon: <FaLinkedinIn />, label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: <FaInstagram />, label: 'Instagram', url: 'https://instagram.com' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <div className={styles.brandSection}>
            <div className={styles.logo}>
              <span className={styles.logoGreen}>Work</span>
              <span className={styles.logoDark}>Net</span>
            </div>
            <p className={styles.tagline}>
              La plateforme freelance n°1 pour trouver et offrir des services professionnels.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className={styles.linksGrid}>
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className={styles.linkSection}>
                <h3 className={styles.linkTitle}>{title}</h3>
                <ul className={styles.linkList}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.path} className={styles.link}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className={styles.trustSection}>
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <FaShieldAlt className={styles.trustIcon} />
              <div>
                <div className={styles.trustTitle}>Sécurisé</div>
                <div className={styles.trustText}>Paiements protégés</div>
              </div>
            </div>
            <div className={styles.trustBadge}>
              <FaHeart className={styles.trustIcon} />
              <div>
                <div className={styles.trustTitle}>Garantie</div>
                <div className={styles.trustText}>Satisfait ou remboursé</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            © {currentYear} WorkNet. Tous droits réservés.
          </div>
          
          <div className={styles.legalLinks}>
            <Link to="/terms" className={styles.legalLink}>
              Conditions d'utilisation
            </Link>
            <Link to="/privacy" className={styles.legalLink}>
              Politique de confidentialité
            </Link>
            <Link to="/cookies" className={styles.legalLink}>
              Cookies
            </Link>
            <Link to="/sitemap" className={styles.legalLink}>
              Plan du site
            </Link>
          </div>
          
          <div className={styles.languageSelector}>
            <select className={styles.languageSelect}>
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
              <option value="ar">🇲🇦 العربية</option>
              <option value="es">🇪🇸 Español</option>
            </select>
          </div>
        </div>

        {/* Mobile App Badges */}
        <div className={styles.appSection}>
          <div className={styles.appBadges}>
            <div className={styles.appBadge}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="Download on App Store"
                className={styles.appStore}
              />
            </div>
            <div className={styles.appBadge}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play"
                className={styles.googlePlay}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;