import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, Filter, Maximize2, Share2 } from 'lucide-react';
import { LazyImage } from '../../components/common/LazyImage';
import { AdvancedFilters } from '../../components/filters/AdvancedFilters';
import { ShareButtons } from '../../components/social/ShareButtons';
import { useTranslation } from '../../hooks/useTranslation';

interface NFTItem {
  id: string;
  title: string;
  creator: string;
  image: string;
  price: number;
  likes: number;
  category: string;
}

const GalleryPage: React.FC = () => {
  const { t } = useTranslation();
  const [view, setView] = useState<'grid' | 'masonry'>('grid');
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);

  const filterOptions = [
    {
      id: 'category',
      label: t('gallery.filters.category'),
      type: 'select',
      options: [
        { value: 'art', label: t('gallery.categories.art') },
        { value: 'photography', label: t('gallery.categories.photography') },
        { value: 'music', label: t('gallery.categories.music') },
        { value: 'collectibles', label: t('gallery.categories.collectibles') },
      ],
    },
    {
      id: 'price',
      label: t('gallery.filters.price'),
      type: 'range',
      min: 0,
      max: 100,
      step: 1,
    },
  ];

  const handleFilterChange = (filters: any) => {
    // Implement filter logic
    console.log('Filters changed:', filters);
  };

  const NFTModal: React.FC<{ nft: NFTItem; onClose: () => void }> = ({ nft, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{nft.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        <div className="aspect-square rounded-lg overflow-hidden mb-4">
          <LazyImage src={nft.image} alt={nft.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">{t('gallery.creator')}: {nft.creator}</p>
            <p className="text-lg font-bold">{nft.price} ETH</p>
          </div>
          <ShareButtons
            title={nft.title}
            text={t('gallery.share.text', { title: nft.title, creator: nft.creator })}
            url={window.location.href}
          />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('gallery.title')}</h1>
        <div className="flex items-center space-x-4">
          <AdvancedFilters
            filters={filterOptions}
            onChange={handleFilterChange}
          />
          <button
            onClick={() => setView(view === 'grid' ? 'masonry' : 'grid')}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {view === 'grid' ? <Grid size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>

      <motion.div
        layout
        className={`grid gap-6 ${
          view === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
        }`}
      >
        {/* NFT items will be mapped here */}
      </motion.div>

      <AnimatePresence>
        {selectedNFT && (
          <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
