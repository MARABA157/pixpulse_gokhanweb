import { supabase } from '../../lib/supabase';
import { rateLimit } from '../../utils/rateLimit';
import { analytics } from '../analytics';

export interface NFT {
  id: string;
  title: string;
  description: string;
  image_url: string;
  creator_id: string;
  owner_id: string;
  price: number;
  currency: string;
  likes: number;
  views: number;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'listed' | 'sold';
  metadata: Record<string, any>;
}

class NFTService {
  private readonly RATE_LIMIT = 100; // requests per minute
  private rateLimiter = rateLimit(this.RATE_LIMIT, 60000);

  async listNFTs(options: {
    page?: number;
    limit?: number;
    sort?: string;
    filter?: Record<string, any>;
    search?: string;
  }) {
    await this.rateLimiter.checkLimit();

    try {
      let query = supabase.from('nfts').select('*');

      // Apply filters
      if (options.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply search
      if (options.search) {
        query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      // Apply sorting
      if (options.sort) {
        const [field, order] = options.sort.split(':');
        query = query.order(field, { ascending: order === 'asc' });
      }

      // Apply pagination
      const page = options.page || 1;
      const limit = options.limit || 20;
      query = query.range((page - 1) * limit, page * limit - 1);

      const { data, error, count } = await query;

      if (error) throw error;

      analytics.trackEvent('NFT List Fetched', {
        page,
        limit,
        sort: options.sort,
        filter: options.filter,
        search: options.search,
        resultsCount: data?.length,
      });

      return {
        nfts: data,
        total: count,
        page,
        limit,
      };
    } catch (error) {
      analytics.trackError(error as Error, {
        operation: 'listNFTs',
        options,
      });
      throw error;
    }
  }

  async getNFTById(id: string) {
    await this.rateLimiter.checkLimit();

    try {
      const { data, error } = await supabase
        .from('nfts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      // Increment views
      await this.incrementNFTViews(id);

      analytics.trackNFTView(id, {
        title: data.title,
        creator: data.creator_id,
      });

      return data;
    } catch (error) {
      analytics.trackError(error as Error, {
        operation: 'getNFTById',
        nftId: id,
      });
      throw error;
    }
  }

  async createNFT(nftData: Omit<NFT, 'id' | 'created_at' | 'updated_at'>) {
    await this.rateLimiter.checkLimit();

    try {
      const { data, error } = await supabase
        .from('nfts')
        .insert([nftData])
        .select()
        .single();

      if (error) throw error;

      analytics.trackEvent('NFT Created', {
        nftId: data.id,
        title: data.title,
        creator: data.creator_id,
      });

      return data;
    } catch (error) {
      analytics.trackError(error as Error, {
        operation: 'createNFT',
        nftData,
      });
      throw error;
    }
  }

  async updateNFT(id: string, updates: Partial<NFT>) {
    await this.rateLimiter.checkLimit();

    try {
      const { data, error } = await supabase
        .from('nfts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      analytics.trackEvent('NFT Updated', {
        nftId: id,
        updates,
      });

      return data;
    } catch (error) {
      analytics.trackError(error as Error, {
        operation: 'updateNFT',
        nftId: id,
        updates,
      });
      throw error;
    }
  }

  private async incrementNFTViews(id: string) {
    try {
      await supabase.rpc('increment_nft_views', { nft_id: id });
    } catch (error) {
      console.error('Failed to increment NFT views:', error);
    }
  }

  async likeNFT(id: string, userId: string) {
    await this.rateLimiter.checkLimit();

    try {
      const { data, error } = await supabase
        .from('nft_likes')
        .insert([{ nft_id: id, user_id: userId }])
        .select()
        .single();

      if (error) throw error;

      analytics.trackNFTInteraction(id, 'like', {
        userId,
      });

      return data;
    } catch (error) {
      analytics.trackError(error as Error, {
        operation: 'likeNFT',
        nftId: id,
        userId,
      });
      throw error;
    }
  }
}

export const nftService = new NFTService();
