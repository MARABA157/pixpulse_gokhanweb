import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  increment
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { MarketplaceArtwork, ArtworkPrice, Bid } from '../types/marketplace';

export const marketplaceService = {
  // Eserleri getir
  async getArtworks(
    category?: string,
    sortBy: 'price' | 'createdAt' | 'likes' = 'createdAt',
    lastDoc?: any,
    pageSize: number = 12
  ) {
    try {
      let q = query(
        collection(db, 'marketplace'),
        orderBy(sortBy, 'desc'),
        limit(pageSize)
      );

      if (category) {
        q = query(q, where('category', '==', category));
      }

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const artworks: MarketplaceArtwork[] = [];
      
      snapshot.forEach((doc) => {
        artworks.push({ id: doc.id, ...doc.data() } as MarketplaceArtwork);
      });

      return {
        artworks,
        lastDoc: snapshot.docs[snapshot.docs.length - 1]
      };
    } catch (error) {
      console.error('Error fetching artworks:', error);
      throw error;
    }
  },

  // Eser detayını getir
  async getArtworkById(artworkId: string) {
    try {
      const docRef = doc(db, 'marketplace', artworkId);
      const docSnap = await getDocs(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as MarketplaceArtwork;
      }
      
      throw new Error('Artwork not found');
    } catch (error) {
      console.error('Error fetching artwork:', error);
      throw error;
    }
  },

  // Eser sat
  async listArtwork(artwork: Omit<MarketplaceArtwork, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, 'marketplace'), {
        ...artwork,
        createdAt: Timestamp.now(),
        isSold: false,
        bids: [],
        views: 0
      });

      return docRef.id;
    } catch (error) {
      console.error('Error listing artwork:', error);
      throw error;
    }
  },

  // Teklif ver
  async placeBid(artworkId: string, bid: Omit<Bid, 'id' | 'timestamp'>) {
    try {
      const artworkRef = doc(db, 'marketplace', artworkId);
      const newBid = {
        ...bid,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Timestamp.now()
      };

      await updateDoc(artworkRef, {
        bids: arrayUnion(newBid),
        highestBid: {
          amount: bid.amount,
          currency: bid.currency
        }
      });

      return newBid;
    } catch (error) {
      console.error('Error placing bid:', error);
      throw error;
    }
  },

  // Satın al
  async buyArtwork(artworkId: string, buyerId: string) {
    try {
      const artworkRef = doc(db, 'marketplace', artworkId);
      
      await updateDoc(artworkRef, {
        isSold: true,
        buyerId,
        soldAt: Timestamp.now()
      });

      return true;
    } catch (error) {
      console.error('Error buying artwork:', error);
      throw error;
    }
  },

  // Görüntülenme sayısını artır
  async incrementViews(artworkId: string) {
    try {
      const artworkRef = doc(db, 'marketplace', artworkId);
      await updateDoc(artworkRef, {
        views: increment(1)
      });
    } catch (error) {
      console.error('Error incrementing views:', error);
      throw error;
    }
  },

  // Beğeni sayısını artır/azalt
  async toggleLike(artworkId: string, increment: boolean) {
    try {
      const artworkRef = doc(db, 'marketplace', artworkId);
      await updateDoc(artworkRef, {
        likes: increment(increment ? 1 : -1)
      });
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }
};
