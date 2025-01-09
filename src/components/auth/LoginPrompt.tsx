import React, { useState } from 'react';
import { Lock, Home } from 'lucide-react';
import Modal from '../ui/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function LoginPrompt() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
        <Lock className="mx-auto text-purple-600 mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-4">Giriş Yapmanız Gerekiyor</h2>
        <p className="text-gray-600 mb-6">
          AI görsel oluşturmak için lütfen giriş yapın veya kayıt olun.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => setShowLogin(true)}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            Giriş Yap
          </button>
          <button
            onClick={() => setShowLogin(false)}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Kayıt Ol
          </button>
          <a
            href="/"
            className="flex items-center justify-center space-x-2 w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <Home size={20} />
            <span>Anasayfaya Dön</span>
          </a>
        </div>
      </div>

      <Modal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        title="Giriş Yap"
      >
        <LoginForm onSuccess={() => window.location.reload()} />
      </Modal>

      <Modal
        isOpen={!showLogin}
        onClose={() => setShowLogin(true)}
        title="Kayıt Ol"
      >
        <RegisterForm onSuccess={() => window.location.reload()} />
      </Modal>
    </div>
  );
}