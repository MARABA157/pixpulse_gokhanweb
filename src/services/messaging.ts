import { supabase } from '../config/supabase';
import { Message, Chat, ChatParticipant } from '../types/messaging';

export const messagingService = {
  // Sohbetleri getir
  async getChats(userId: string) {
    try {
      const { data: chats, error } = await supabase
        .from('chats')
        .select('*')
        .contains('participants', [userId])
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return chats;
    } catch (error) {
      console.error('Error fetching chats:', error);
      throw error;
    }
  },

  // Mesajları getir
  async getMessages(chatId: string, lastMessageId?: string) {
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Mesaj gönder
  async sendMessage(chatId: string, message: Omit<Message, 'id' | 'timestamp'>) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            chat_id: chatId,
            ...message,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Dosya yükle
  async uploadAttachment(chatId: string, file: File) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${chatId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-attachments')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat-attachments')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading attachment:', error);
      throw error;
    }
  },

  // Yeni sohbet oluştur
  async createChat(participants: string[]) {
    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([
          {
            participants,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  },

  // Mesajları okundu olarak işaretle
  async markAsRead(chatId: string, messageIds: string[]) {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .in('id', messageIds)
        .eq('chat_id', chatId);

      if (error) throw error;
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  },

  // Mesajları dinle
  subscribeToMessages(chatId: string, callback: (messages: Message[]) => void) {
    return supabase
      .channel(`messages:${chatId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatId}` },
        (payload) => {
          this.getMessages(chatId).then(callback);
        }
      )
      .subscribe();
  },

  // Sohbetleri dinle
  subscribeToChats(userId: string, callback: (chats: Chat[]) => void) {
    return supabase
      .channel(`chats:${userId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'chats' },
        (payload) => {
          this.getChats(userId).then(callback);
        }
      )
      .subscribe();
  }
};
