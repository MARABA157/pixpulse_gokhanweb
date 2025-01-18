import { supabase } from '../config/supabase';
import { Artwork, Order } from '../types/marketplace';

export const marketplaceService = {
  // Eserleri getir
  async getArtworks(page = 1, pageSize = 20) {
    try {
      const { data: artworks, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      if (error) throw error;
      return artworks;
    } catch (error) {
      console.error('Error fetching artworks:', error);
      throw error;
    }
  },

  // Eser detayını getir
  async getArtwork(artworkId: string) {
    try {
      const { data: artwork, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', artworkId)
        .single();

      if (error) throw error;
      return artwork;
    } catch (error) {
      console.error('Error fetching artwork:', error);
      throw error;
    }
  },

  // Eser oluştur
  async createArtwork(artwork: Omit<Artwork, 'id' | 'createdAt'>) {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .insert([
          {
            ...artwork,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating artwork:', error);
      throw error;
    }
  },

  // Eser güncelle
  async updateArtwork(artworkId: string, artwork: Partial<Artwork>) {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .update(artwork)
        .eq('id', artworkId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating artwork:', error);
      throw error;
    }
  },

  // Eser sil
  async deleteArtwork(artworkId: string) {
    try {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', artworkId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting artwork:', error);
      throw error;
    }
  },

  // Sipariş oluştur
  async createOrder(order: Omit<Order, 'id' | 'createdAt'>) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            ...order,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Sipariş durumunu güncelle
  async updateOrderStatus(orderId: string, status: string) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Kullanıcının siparişlerini getir
  async getUserOrders(userId: string) {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return orders;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Eserleri dinle
  subscribeToArtworks(callback: (artworks: Artwork[]) => void) {
    return supabase
      .channel('artworks')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'artworks' },
        (payload) => {
          this.getArtworks().then(callback);
        }
      )
      .subscribe();
  }
};
