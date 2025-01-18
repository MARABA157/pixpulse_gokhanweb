import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../../lib/supabase';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const username = formData.get('username') as string;

      if (!email || !password || !username) {
        throw new Error('Lütfen tüm alanları doldurun');
      }

      const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      if (existingUser) {
        throw new Error('Bu kullanıcı adı zaten kullanımda');
      }

      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
          emailRedirectTo: window.location.origin + '/auth/callback',
        },
      });

      if (signUpError) throw signUpError;

      if (data?.user) {
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            username,
            email,
            created_at: new Date().toISOString(),
          },
        ]);

        toast.success('Kayıt başarılı! Email adresinizi doğrulayın.');
        navigate('/login');
      }
    } catch (err: any) {
      console.error('Kayıt hatası:', err);
      let errorMessage = 'Kayıt sırasında bir hata oluştu';
      
      if (err.message.includes('duplicate key')) {
        errorMessage = 'Bu email adresi zaten kullanımda';
      } else if (err.message.includes('valid email')) {
        errorMessage = 'Geçerli bir email adresi girin';
      } else if (err.message.includes('password')) {
        errorMessage = 'Şifre en az 6 karakter olmalıdır';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Kullanıcı Adı
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            minLength={3}
            maxLength={20}
            pattern="^[a-zA-Z0-9_]+$"
            title="Sadece harf, rakam ve alt çizgi kullanabilirsiniz"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            En az 6 karakter uzunluğunda olmalıdır
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
        </button>
      </form>
    </div>
  );
}