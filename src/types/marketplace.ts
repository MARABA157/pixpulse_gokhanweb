import { Artwork } from './artwork';

export type Currency = 'ETH' | 'USD';

export interface ArtworkPrice {
  amount: number;
  currency: Currency;
}

export interface Bid {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  amount: number;
  currency: Currency;
  timestamp: string;
}

export interface MarketplaceArtwork {
  id: string;
  title: string;
  description: string;
  image: string;
  artist: {
    id: string;
    name: string;
    avatar: string;
  };
  price: ArtworkPrice;
  highestBid?: ArtworkPrice;
  bids: Bid[];
  likes: number;
  views: number;
  createdAt: string;
  endTime?: string;
  isAuction: boolean;
  isSold: boolean;
  tokenId?: string;
  contractAddress?: string;
  tags: string[];
  category: string;
}

export interface Order {
  id: string;
  artworkId: string;
  buyerId: string;
  sellerId: string;
  price: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Bid {
  id: string;
  artworkId: string;
  bidderId: string;
  amount: number;
  createdAt: string;
}

export interface MarketplaceState {
  artworks: Artwork[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  lastDoc: any;
}

export { Artwork };
