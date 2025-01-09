import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { UserPlus, Mail, Lock, User, AlertCircle, Upload } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Şifreler eşleşmiyor');
    }

    try {
      setError('');
      setLoading(true);

      // Kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      let photoURL = '';

      // Avatar yükle
      if (avatar) {
        const fileRef = ref(storage, `avatars/${userCredential.user.uid}`);
        await uploadBytes(fileRef, avatar);
        photoURL = await getDownloadURL(fileRef);
      }

      // Profil güncelle
      await updateProfile(userCredential.user, {
        displayName: formData.username,
        photoURL
      });

      // Firestore'a kullanıcı verilerini kaydet
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username: formData.username,
        email: formData.email,
        photoURL,
        createdAt: new Date().toISOString(),
        bio: '',
        location: '',
        website: '',
        twitter: '',
        instagram: '',
      });

      navigate('/');
    } catch (err) {
      setError('Hesap oluşturulamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Hesap Oluştur</h1>
          <p className="text-gray-400">
            AI Art Market'e katılın ve sanat dünyasını keşfedin
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6 flex items-center gap-2 text-red-500">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Kullanıcı Adı</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="kullaniciadi"
                required
              />
              <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">E-posta</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="ornek@email.com"
                required
              />
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Şifre</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="********"
                required
              />
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Şifre Tekrar</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="********"
                required
              />
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Profil Fotoğrafı</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Upload size={20} />
                {avatar ? avatar.name : 'Fotoğraf seç'}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Hesap oluşturuluyor...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Kayıt Ol
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400">
          Zaten hesabınız var mı?{' '}
          <Link to="/login" className="text-purple-500 hover:text-purple-400 font-medium">
            Giriş yapın
          </Link>
        </p>
      </div>
    </div>
  );
}
