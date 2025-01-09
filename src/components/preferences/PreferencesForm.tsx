import React from 'react';
import { usePreferences } from '../../hooks/usePreferences';
import { Settings, Palette, Bell, Layout } from 'lucide-react';

export default function PreferencesForm() {
  const { preferences, updatePreferences, loading } = usePreferences();

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    updatePreferences({ theme });
  };

  const handleStyleChange = (style: string) => {
    updatePreferences({
      aiStyle: { ...preferences.aiStyle, artStyle: style }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Settings className="mr-2" size={20} />
          Görünüm Tercihleri
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {['light', 'dark', 'system'].map((theme) => (
            <button
              key={theme}
              onClick={() => handleThemeChange(theme as 'light' | 'dark' | 'system')}
              className={`p-3 rounded-lg border ${
                preferences.theme === theme
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Palette className="mr-2" size={20} />
          AI Sanat Stili
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {['modern', 'classic', 'abstract', 'realistic'].map((style) => (
            <button
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`p-3 rounded-lg border ${
                preferences.aiStyle.artStyle === style
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="mr-2" size={20} />
          Bildirimler
        </h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.notifications.email}
              onChange={(e) => updatePreferences({
                notifications: { ...preferences.notifications, email: e.target.checked }
              })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2">E-posta Bildirimleri</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.notifications.browser}
              onChange={(e) => updatePreferences({
                notifications: { ...preferences.notifications, browser: e.target.checked }
              })}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2">Tarayıcı Bildirimleri</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Layout className="mr-2" size={20} />
          Görüntüleme
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updatePreferences({ displayMode: 'grid' })}
            className={`p-3 rounded-lg border ${
              preferences.displayMode === 'grid'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            Grid Görünüm
          </button>
          <button
            onClick={() => updatePreferences({ displayMode: 'list' })}
            className={`p-3 rounded-lg border ${
              preferences.displayMode === 'list'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            Liste Görünüm
          </button>
        </div>
      </div>
    </div>
  );
}