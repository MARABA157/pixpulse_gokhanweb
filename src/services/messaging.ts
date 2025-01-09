import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Message, Chat, ChatParticipant } from '../types/messaging';

export const messagingService = {
  // Sohbetleri getir
  async getChats(userId: string) {
    try {
      const q = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const chats: Chat[] = [];
      
      snapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() } as Chat);
      });

      return chats;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  },

  // Mesajları getir
  async getMessages(chatId: string, lastMessageId?: string) {
    try {
      let q = query(
        collection(db, `chats/${chatId}/messages`),
        orderBy('timestamp', 'desc'),
        limit(50)
      );

      if (lastMessageId) {
        const lastDoc = await getDocs(doc(db, `chats/${chatId}/messages/${lastMessageId}`));
        q = query(q, where('timestamp', '<', lastDoc.data()?.timestamp));
      }

      const snapshot = await getDocs(q);
      const messages: Message[] = [];
      
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() } as Message);
      });

      return messages.reverse();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Mesaj gönder
  async sendMessage(chatId: string, message: Omit<Message, 'id' | 'timestamp'>) {
    try {
      const messageData = {
        ...message,
        timestamp: Timestamp.now()
      };

      const docRef = await addDoc(
        collection(db, `chats/${chatId}/messages`),
        messageData
      );

      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: { ...messageData, id: docRef.id },
        updatedAt: Timestamp.now()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Dosya yükle
  async uploadAttachment(chatId: string, file: File) {
    try {
      const fileRef = ref(storage, `chats/${chatId}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      return {
        type: file.type.startsWith('image/') ? 'image' : 'file',
        url,
        name: file.name
      };
    } catch (error) {
      console.error('Error uploading attachment:', error);
      throw error;
    }
  },

  // Yeni sohbet oluştur
  async createChat(participants: string[]) {
    try {
      const chatData = {
        participants,
        unreadCount: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'chats'), chatData);
      return docRef.id;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  },

  // Mesajları okundu olarak işaretle
  async markAsRead(chatId: string, messageIds: string[]) {
    try {
      const batch = db.batch();
      
      messageIds.forEach((messageId) => {
        const messageRef = doc(db, `chats/${chatId}/messages/${messageId}`);
        batch.update(messageRef, { read: true });
      });

      await batch.commit();
      
      await updateDoc(doc(db, 'chats', chatId), {
        unreadCount: 0
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  },

  // Mesajları dinle
  subscribeToMessages(chatId: string, callback: (messages: Message[]) => void) {
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    return onSnapshot(q, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() } as Message);
      });
      callback(messages.reverse());
    });
  },

  // Sohbetleri dinle
  subscribeToChats(userId: string, callback: (chats: Chat[]) => void) {
    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', userId),
      orderBy('updatedAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const chats: Chat[] = [];
      snapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() } as Chat);
      });
      callback(chats);
    });
  }
};
