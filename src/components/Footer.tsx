import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              PixelPulse
            </h2>
            <p className="mt-4 text-gray-400">
              Yapay zeka ile sanatsal görüntüler oluşturun, toplulukla paylaşın ve ilham verin.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Keşfet
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/explore" className="text-gray-400 hover:text-white transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors">
                  Pazar Yeri
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-white transition-colors">
                  Topluluk
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              Destek
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/learn" className="text-gray-400 hover:text-white transition-colors">
                  Öğrenme Merkezi
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  SSS
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  İletişim
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} PixelPulse. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
