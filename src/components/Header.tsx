import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut, Home } from 'lucide-react';

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const menuItems = [
    { path: '/ai-create', label: 'AI ile Oluştur' },
    { path: '/collections', label: 'Koleksiyonlar' },
    { path: '/competitions', label: 'Yarışmalar' },
    { path: '/marketplace', label: 'Pazar Yeri' },
    { path: '/tutorials', label: 'Öğreticiler' },
    { path: '/prompt-templates', label: 'Prompt Şablonları' },
    { path: '/sell', label: 'Sat' },
  ];

  return (
    <header className="bg-gray-800 shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-gray-300 transition-colors"
          >
            <Home size={24} />
            <span>AI Art Market</span>
          </button>

          {/* Mobil menü butonu */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-gray-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menü */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <User size={20} />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>

        {/* Mobil menü */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={20} />
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Giriş Yap
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}