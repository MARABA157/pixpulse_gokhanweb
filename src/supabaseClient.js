import { createClient } from '@supabase/supabase-js';

// Supabase URL ve Anon Anahtarınızı buraya ekleyin
const supabaseUrl = 'https://qwzykvrlqmouhipyyrjn.supabase.co'; // Verdiğiniz URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // API anahtarınızı buraya ekleyin

// Supabase istemcisini oluşturun
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Örnek bir veri alma işlemi
async function fetchData() {
    const { data, error } = await supabase
        .from('your_table_name') // Buraya veritabanınızdaki tablo adını ekleyin
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
    } else {
        console.log('Data:', data);
    }
}

// Veri çekme fonksiyonunu çağırın
fetchData();
