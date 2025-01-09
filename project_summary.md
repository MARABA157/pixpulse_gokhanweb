# PixelPulse Proje Özeti

## Proje URL
https://aesthetic-bombolone-f48ba3.netlify.app

## Netlify Site ID
aesthetic-bombolone-f48ba3

## Önemli Dosyalar ve Konumları
- `src/pages/Home.tsx`: Ana sayfa ve film şeridi galerisi
- `src/pages/AIChat.tsx`: AI Chat özelliği
- `src/pages/CreateVideo.tsx`: Video oluşturma özelliği
- `tailwind.config.js`: Animasyon ve stil ayarları

## Mevcut Özellikler
1. Film Şeridi Galerisi
   - Boyutlar: 700px genişlik, 300px yükseklik
   - Kayma hızı: 20 saniye
   - Hover efekti ile büyüme

2. AI Chat
   - Hugging Face API entegrasyonu
   - Blenderbot modeli kullanımı

3. Video Oluşturma
   - Deforum Stable Diffusion API
   - Text-to-video dönüşümü

## Stil ve Animasyon Detayları
```css
- Film şeridi animasyonları:
  scroll-left: 20s linear infinite
  scroll-right: 20s linear infinite
  
- Hover efekti:
  transform: scale(110%)
  transition: 500ms
```

## Yapılacaklar ve Öneriler
1. Animasyon hızı ayarlanabilir
2. Resimler arası boşluk düzenlenebilir
3. Yeni hover efektleri eklenebilir
4. Responsive tasarım geliştirilebilir
