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
