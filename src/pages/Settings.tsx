import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  CreditCard,
  Shield,
  Languages,
  Save,
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <User className="w-5 h-5" /> },
    { id: 'account', label: 'Hesap', icon: <Mail className="w-5 h-5" /> },
    { id: 'security', label: 'Güvenlik', icon: <Lock className="w-5 h-5" /> },
    {
      id: 'notifications',
      label: 'Bildirimler',
      icon: <Bell className="w-5 h-5" />,
    },
    {
      id: 'appearance',
      label: 'Görünüm',
      icon: <Palette className="w-5 h-5" />,
    },
    { id: 'billing', label: 'Ödeme', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'privacy', label: 'Gizlilik', icon: <Shield className="w-5 h-5" /> },
    {
      id: 'language',
      label: 'Dil',
      icon: <Languages className="w-5 h-5" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Başlık */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Ayarlar</h1>
          <p className="text-gray-400">Hesap tercihlerini yönet</p>
        </div>

        {/* Ana İçerik */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-brand-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6"
            >
              {/* Form İçeriği */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Profil Fotoğrafı
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-brand-600" />
                    <button className="btn btn-secondary px-4 py-2">
                      Değiştir
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black/50 text-white rounded-xl p-3 border border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full bg-black/50 text-white rounded-xl p-3 border border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Biyografi
                  </label>
                  <textarea
                    className="w-full h-32 bg-black/50 text-white rounded-xl p-3 border border-white/10 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-none"
                    placeholder="Kendinden bahset..."
                  />
                </div>

                <div className="flex justify-end">
                  <button className="btn btn-primary px-6 py-2">
                    <Save className="w-5 h-5 mr-2" />
                    Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
