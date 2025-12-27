
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-green-400">Work</span>
              <span className="text-2xl font-bold text-white">Net</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              La plateforme freelance n°1 au Maroc pour trouver et offrir des services professionnels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/design" className="text-gray-400 hover:text-white text-sm">Design Graphique</Link></li>
              <li><Link to="/categories/web" className="text-gray-400 hover:text-white text-sm">Développement Web</Link></li>
              <li><Link to="/categories/marketing" className="text-gray-400 hover:text-white text-sm">Marketing Digital</Link></li>
              <li><Link to="/categories/writing" className="text-gray-400 hover:text-white text-sm">Rédaction</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">À propos</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white text-sm">Carrières</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white text-sm">Presse</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white text-sm">Centre d'aide</Link></li>
              <li><Link to="/safety" className="text-gray-400 hover:text-white text-sm">Sécurité</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Confidentialité</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 WorkNet. Tous droits réservés.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
            <Link to="/terms" className="hover:text-white">Conditions d'utilisation</Link>
            <Link to="/privacy" className="hover:text-white">Politique de confidentialité</Link>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;