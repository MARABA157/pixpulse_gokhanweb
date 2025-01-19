import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { marketplaceService } from '../services/marketplace';
import { MarketplaceArtwork, Bid } from '../types/marketplace';
import {
  Heart,
  Share2,
  Clock,
  Eye,
  MessageCircle,
  ExternalLink,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function MarketplaceDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const [artwork, setArtwork] = useState<MarketplaceArtwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [bidding, setBidding] = useState(false);

  useEffect(() => {
    loadArtwork();
  }, [id]);

  const loadArtwork = async () => {
    try {
      setLoading(true);
      if (!id) return;
      const artwork = await marketplaceService.getArtworkById(id);
      setArtwork(artwork);
      marketplaceService.incrementViews(id);
    } catch (error) {
      console.error('Error loading artwork:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !artwork) return;

    const amount = parseFloat(bidAmount);
    if (isNaN(amount)) {
      return setError('Geçerli bir teklif miktarı girin');
    }

    if (artwork.highestBid && amount <= artwork.highestBid.amount) {
      return setError('Teklif en yüksek tekliften büyük olmalıdır');
    }

    try {
      setBidding(true);
      setError('');
      await marketplaceService.placeBid(artwork.id, {
        userId: currentUser.uid,
        username: currentUser.displayName || '',
        userAvatar: currentUser.photoURL || '',
        amount,
        currency: artwork.price.currency
      });
      loadArtwork();
      setBidAmount('');
    } catch (error) {
      setError('Teklif verilemedi. Lütfen tekrar deneyin.');
    } finally {
      setBidding(false);
    }
  };

  const handleBuy = async () => {
    if (!currentUser || !artwork) return;

    try {
      await marketplaceService.buyArtwork(artwork.id, currentUser.uid);
      loadArtwork();
    } catch (error) {
      setError('Satın alma işlemi başarısız oldu. Lütfen tekrar deneyin.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Eser bulunamadı</h2>
          <Link
            to="/marketplace"
            className="text-purple-500 hover:text-purple-400 font-medium"
          >
            Marketplace'e dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sol Kolon - Görsel */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
              {artwork.isAuction && (
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full">
                  Açık Artırma
                </div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Eser Hakkında</h2>
              <p className="text-gray-400 leading-relaxed">{artwork.description}</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <span className="text-gray-400">Token ID</span>
                  <span className="font-mono">{artwork.tokenId}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <span className="text-gray-400">Kontrat Adresi</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{artwork.contractAddress?.slice(0, 6)}...{artwork.contractAddress?.slice(-4)}</span>
                    <a
                      href={`https://etherscan.io/address/${artwork.contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-500 hover:text-purple-400"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Detaylar */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <Link
                to={`/artist/${artwork.artist.id}`}
                className="flex items-center gap-3 group"
              >
                <img
                  src={artwork.artist.avatar}
                  alt={artwork.artist.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold group-hover:text-purple-500 transition-colors">
                    {artwork.artist.name}
                  </h3>
                  <p className="text-sm text-gray-400">Sanatçı</p>
                </div>
              </Link>

              <div className="flex items-center gap-4">
                <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>

            <div className="flex items-center gap-6 text-gray-400 mb-8">
              <span className="flex items-center gap-1">
                <Eye size={18} />
                {artwork.views} görüntülenme
              </span>
              <span className="flex items-center gap-1">
                <Heart size={18} />
                {artwork.likes} beğeni
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={18} />
                {artwork.bids.length} teklif
              </span>
            </div>

            <div className="p-6 bg-gray-800 rounded-xl mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    {artwork.isAuction ? 'Minimum Teklif' : 'Fiyat'}
                  </p>
                  <div className="flex items-center gap-2 text-2xl font-bold">
                    <Sparkles className="text-purple-500" />
                    {artwork.price.amount} {artwork.price.currency}
                  </div>
                </div>
                {artwork.endTime && (
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Kalan Süre</p>
                    <div className="flex items-center gap-2 text-xl font-semibold">
                      <Clock size={20} />
                      {new Date(artwork.endTime).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-4 flex items-center gap-2 text-red-500">
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </div>
              )}

              {artwork.isAuction ? (
                <form onSubmit={handleBid}>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-grow">
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        step="0.01"
                        min={artwork.highestBid ? artwork.highestBid.amount + 0.01 : artwork.price.amount}
                        placeholder="Teklif miktarı"
                        className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={bidding || !currentUser}
                      className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {bidding ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      ) : (
                        'Teklif Ver'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={!currentUser || artwork.isSold}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {artwork.isSold ? 'Satıldı' : 'Satın Al'}
                </button>
              )}

              {!currentUser && (
                <p className="text-center text-sm text-gray-400 mt-4">
                  Teklif vermek için{' '}
                  <Link to="/login" className="text-purple-500 hover:text-purple-400">
                    giriş yapın
                  </Link>
                </p>
              )}
            </div>

            {artwork.isAuction && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Teklifler</h2>
                <div className="space-y-4">
                  {artwork.bids.length === 0 ? (
                    <p className="text-gray-400">Henüz teklif verilmemiş</p>
                  ) : (
                    artwork.bids
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((bid) => (
                        <div
                          key={bid.id}
                          className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={bid.userAvatar}
                              alt={bid.username}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{bid.username}</p>
                              <p className="text-sm text-gray-400">
                                {new Date(bid.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-purple-500 font-semibold">
                            <Sparkles size={16} />
                            {bid.amount} {bid.currency}
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
