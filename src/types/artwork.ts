import { User } from '@supabase/supabase-js';

export enum Categories {
  PORTRAIT = 'Portre',
  LANDSCAPE = 'Manzara',
  ABSTRACT = 'Soyut',
  DIGITAL = 'Dijital',
  FANTASY = 'Fantastik',
  MODERN = 'Modern'
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  creator: {
    username: string;
    avatar_url?: string;
  };
  has_liked: boolean;
  likes_count: number;
  created_at: string;
  updated_at: string;
  tags?: string[];
  collection_id?: string;
  price?: number;
  is_for_sale?: boolean;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  cover_image?: string;
  artwork_count: number;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: string;
  user_id: string;
  artwork_id: string;
  created_at: string;
}

export interface Save {
  id: string;
  user_id: string;
  artwork_id: string;
  collection_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  artwork_id: string;
  content: string;
  created_at: string;
  user: {
    username: string;
    avatar_url?: string;
  };
}

export interface ArtworkFilters {
  search?: string;
  tags?: string[];
  creator?: string;
  collection?: string;
  sortBy?: 'latest' | 'oldest' | 'popular';
  priceRange?: {
    min?: number;
    max?: number;
  };
  forSale?: boolean;
}