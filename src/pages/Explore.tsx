import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Share2 } from 'lucide-react';

interface Artwork {
  id: string;
  imageUrl: string;
  prompt: string;
  category: string;
  author: string;
  likes: number;
  views: number;
  createdAt: string;
}

const categories = [
  'Fantastik',
  'Bilim Kurgu',
  'Doğa',
  'Portre',
  'Soyut',
  'Mimari',
  'Karakter',
  'Manzara'
];

const artworks: Artwork[] = [
  // Fantastik Kategori
  {
    id: '1',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20majestic%20dragon%20perched%20on%20a%20crystal%20mountain%20peak,%20fantasy%20digital%20painting,%20epic%20scale,%208k,%20hyperdetailed',
    prompt: 'Kristal dağın zirvesinde muhteşem bir ejderha, fantastik dijital boyama, epik ölçek',
    category: 'Fantastik',
    author: 'DragonMaster',
    likes: 1245,
    views: 3890,
    createdAt: '2025-01-04'
  },
  {
    id: '2',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20magical%20forest%20with%20glowing%20mushrooms%20and%20floating%20wisps,%20ethereal%20atmosphere,%208k,%20fantasy%20art',
    prompt: 'Parlayan mantarlar ve uçuşan perilerle büyülü bir orman, eteryel atmosfer',
    category: 'Fantastik',
    author: 'ForestMage',
    likes: 892,
    views: 2156,
    createdAt: '2025-01-04'
  },
  // Bilim Kurgu Kategori
  {
    id: '3',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20futuristic%20megacity%20with%20flying%20vehicles%20and%20holographic%20billboards,%20cyberpunk,%208k,%20neon%20lights',
    prompt: 'Uçan araçlar ve holografik panolarla fütüristik bir mega şehir, cyberpunk',
    category: 'Bilim Kurgu',
    author: 'NeonDreamer',
    likes: 1567,
    views: 4230,
    createdAt: '2025-01-04'
  },
  {
    id: '4',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20space%20station%20orbiting%20a%20black%20hole,%20cosmic%20scene,%208k,%20scientifically%20accurate',
    prompt: 'Kara deliğin yörüngesinde bir uzay istasyonu, kozmik sahne',
    category: 'Bilim Kurgu',
    author: 'CosmicVoyager',
    likes: 2103,
    views: 5674,
    createdAt: '2025-01-04'
  },

  // Doğa Kategori
  {
    id: '5',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20serene%20mountain%20lake%20reflecting%20the%20aurora%20borealis,%20nature%20photography,%208k,%20peaceful',
    prompt: 'Kuzey ışıklarını yansıtan huzurlu bir dağ gölü, doğa fotoğrafçılığı',
    category: 'Doğa',
    author: 'NatureSeeker',
    likes: 1834,
    views: 4521,
    createdAt: '2025-01-04'
  },
  {
    id: '6',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20blooming%20cherry%20blossom%20garden%20in%20spring,%20soft%20sunlight,%208k,%20japanese%20style',
    prompt: 'Baharda açan bir kiraz bahçesi, yumuşak güneş ışığı, Japon stili',
    category: 'Doğa',
    author: 'BlossomArtist',
    likes: 1456,
    views: 3789,
    createdAt: '2025-01-04'
  },

  // Portre Kategori
  {
    id: '7',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20cyberpunk%20portrait%20of%20a%20woman%20with%20neon%20hair%20and%20cybernetic%20implants,%208k,%20detailed',
    prompt: 'Neon saçlı ve sibernetik implantlı bir kadının cyberpunk portresi',
    category: 'Portre',
    author: 'CyberPortrait',
    likes: 1678,
    views: 4123,
    createdAt: '2025-01-04'
  },
  {
    id: '8',
    imageUrl: 'https://image.pollinations.ai/prompt/An%20ethereal%20portrait%20of%20an%20elven%20queen%20with%20crystal%20crown,%20fantasy%20art,%208k',
    prompt: 'Kristal taçlı bir elf kraliçesinin eteryel portresi, fantezi sanatı',
    category: 'Portre',
    author: 'ElvenArtist',
    likes: 1923,
    views: 4876,
    createdAt: '2025-01-04'
  },

  // Soyut Kategori
  {
    id: '9',
    imageUrl: 'https://image.pollinations.ai/prompt/Abstract%20fluid%20art%20with%20swirling%20colors%20and%20metallic%20elements,%208k,%20modern%20art',
    prompt: 'Dönen renkler ve metalik elementlerle soyut akışkan sanat',
    category: 'Soyut',
    author: 'FluidArtist',
    likes: 1345,
    views: 3567,
    createdAt: '2025-01-04'
  },
  {
    id: '10',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20geometric%20abstract%20composition%20with%20floating%20shapes%20and%20light%20rays,%208k',
    prompt: 'Yüzen şekiller ve ışık ışınlarıyla geometrik soyut kompozisyon',
    category: 'Soyut',
    author: 'GeoArtist',
    likes: 1567,
    views: 3890,
    createdAt: '2025-01-04'
  },

  // Mimari Kategori
  {
    id: '11',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20floating%20city%20in%20the%20clouds%20with%20crystal%20spires,%20fantasy%20architecture,%208k',
    prompt: 'Kristal kulelerle bulutlarda yüzen bir şehir, fantezi mimarisi',
    category: 'Mimari',
    author: 'SkyArchitect',
    likes: 2034,
    views: 5123,
    createdAt: '2025-01-04'
  },
  {
    id: '12',
    imageUrl: 'https://image.pollinations.ai/prompt/An%20ancient%20temple%20overgrown%20with%20bioluminescent%20plants,%20mystical%20architecture,%208k',
    prompt: 'Biyolüminesan bitkilerle kaplı antik tapınak, mistik mimari',
    category: 'Mimari',
    author: 'TempleCreator',
    likes: 1789,
    views: 4567,
    createdAt: '2025-01-04'
  },

  // Karakter Kategori
  {
    id: '13',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20warrior%20mage%20with%20glowing%20runes%20and%20floating%20crystals,%20character%20design,%208k',
    prompt: 'Parlayan runeler ve yüzen kristallerle savaşçı büyücü, karakter tasarımı',
    category: 'Karakter',
    author: 'CharacterForge',
    likes: 1678,
    views: 4234,
    createdAt: '2025-01-04'
  },
  {
    id: '14',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20steampunk%20inventor%20with%20mechanical%20wings%20and%20brass%20goggles,%20character%20art,%208k',
    prompt: 'Mekanik kanatlı ve pirinç gözlüklü steampunk mucit, karakter sanatı',
    category: 'Karakter',
    author: 'SteamArtisan',
    likes: 1456,
    views: 3789,
    createdAt: '2025-01-04'
  },

  // Manzara Kategori
  {
    id: '15',
    imageUrl: 'https://image.pollinations.ai/prompt/An%20alien%20landscape%20with%20floating%20islands%20and%20binary%20star%20system,%20sci-fi,%208k',
    prompt: 'Yüzen adalar ve ikili yıldız sistemiyle yabancı bir manzara, bilim kurgu',
    category: 'Manzara',
    author: 'StarScaper',
    likes: 2145,
    views: 5432,
    createdAt: '2025-01-04'
  },
  {
    id: '16',
    imageUrl: 'https://image.pollinations.ai/prompt/A%20post-apocalyptic%20cityscape%20reclaimed%20by%20nature,%20atmospheric%20landscape,%208k',
    prompt: 'Doğa tarafından geri alınmış post-apokaliptik şehir manzarası',
    category: 'Manzara',
    author: 'UrbanExplorer',
    likes: 1890,
    views: 4678,
    createdAt: '2025-01-04'
  }
];

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  const filteredArtworks = selectedCategory === 'Tümü'
    ? artworks
    : artworks.filter(art => art.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Topluluk <span className="text-gradient">Eserleri</span>
          </h1>
          <p className="text-gray-400 text-lg">
            En yeni AI sanat eserlerini keşfedin
          </p>
        </div>

        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <button
            onClick={() => setSelectedCategory('Tümü')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'Tümü'
                ? 'bg-brand-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Tümü
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? 'bg-brand-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Eserler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map(artwork => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden"
            >
              <div className="aspect-square">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.prompt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-brand-500">{artwork.category}</span>
                  <span className="text-sm text-gray-400">{artwork.createdAt}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{artwork.prompt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Heart className="w-4 h-4" />
                      <span>{artwork.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span>{artwork.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-400">
                      by <span className="text-brand-500">{artwork.author}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
