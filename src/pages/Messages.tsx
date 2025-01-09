import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { messagingService } from '../services/messaging';
import { Message, Chat, ChatParticipant } from '../types/messaging';
import {
  Search,
  Send,
  Image,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react';

export default function Messages() {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribeChats = messagingService.subscribeToChats(
      currentUser.uid,
      (newChats) => {
        setChats(newChats);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeChats();
    };
  }, [currentUser]);

  useEffect(() => {
    if (!selectedChat) return;

    const unsubscribeMessages = messagingService.subscribeToMessages(
      selectedChat.id,
      (newMessages) => {
        setMessages(newMessages);
        scrollToBottom();
      }
    );

    return () => {
      unsubscribeMessages();
    };
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedChat || (!messageText.trim() && attachments.length === 0)) return;

    try {
      const uploadedAttachments = await Promise.all(
        attachments.map((file) =>
          messagingService.uploadAttachment(selectedChat.id, file)
        )
      );

      await messagingService.sendMessage(selectedChat.id, {
        senderId: currentUser.uid,
        receiverId: selectedChat.participants.find((id) => id !== currentUser.uid) || '',
        content: messageText.trim(),
        read: false,
        attachments: uploadedAttachments
      });

      setMessageText('');
      setAttachments([]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments([...attachments, ...files]);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Mesajları görüntülemek için giriş yapın</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl overflow-hidden h-[calc(100vh-8rem)]">
          <div className="grid grid-cols-4 h-full">
            {/* Sol Panel - Sohbetler */}
            <div className="col-span-1 border-r border-gray-700">
              <div className="p-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Sohbet ara..."
                    className="w-full bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>

                <div className="space-y-2">
                  {chats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                        selectedChat?.id === chat.id
                          ? 'bg-brand-600'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src="https://via.placeholder.com/40"
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                      </div>
                      <div className="flex-grow text-left">
                        <h3 className="font-medium line-clamp-1">John Doe</h3>
                        {chat.lastMessage && (
                          <p className="text-sm text-gray-400 line-clamp-1">
                            {chat.lastMessage.content}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {chat.lastMessage && (
                          <p className="text-xs text-gray-400 mb-1">
                            {formatTime(chat.lastMessage.timestamp)}
                          </p>
                        )}
                        {chat.unreadCount > 0 && (
                          <div className="bg-purple-600 text-white text-xs rounded-full px-2 py-1">
                            {chat.unreadCount}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sağ Panel - Mesajlar */}
            <div className="col-span-3 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Sohbet Başlığı */}
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://via.placeholder.com/40"
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                      </div>
                      <div>
                        <h2 className="font-semibold">John Doe</h2>
                        <p className="text-sm text-gray-400">Çevrimiçi</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Phone size={20} />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Video size={20} />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Info size={20} />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Mesajlar */}
                  <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === currentUser.uid
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            message.senderId === currentUser.uid
                              ? 'bg-purple-600'
                              : 'bg-gray-700'
                          } rounded-lg p-3`}
                        >
                          {message.content && (
                            <p className="mb-1">{message.content}</p>
                          )}

                          {message.attachments?.map((attachment, index) => (
                            <div key={index} className="mt-2">
                              {attachment.type === 'image' ? (
                                <img
                                  src={attachment.url}
                                  alt={attachment.name}
                                  className="rounded-lg max-w-full"
                                />
                              ) : (
                                <a
                                  href={attachment.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
                                >
                                  <Paperclip size={16} />
                                  {attachment.name}
                                </a>
                              )}
                            </div>
                          ))}

                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.senderId === currentUser.uid && (
                              message.read ? (
                                <CheckCheck size={14} className="text-blue-400" />
                              ) : (
                                <Check size={14} />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Mesaj Gönderme */}
                  <div className="p-4 border-t border-gray-700">
                    <form onSubmit={handleSendMessage} className="flex items-end gap-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                        className="hidden"
                      />
                      
                      <div className="flex-grow">
                        {attachments.length > 0 && (
                          <div className="flex gap-2 mb-2">
                            {attachments.map((file, index) => (
                              <div
                                key={index}
                                className="bg-gray-700 rounded px-2 py-1 text-sm flex items-center gap-1"
                              >
                                <span className="line-clamp-1">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAttachments(attachments.filter((_, i) => i !== index));
                                  }}
                                  className="text-gray-400 hover:text-white"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="relative">
                          <textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Mesajınızı yazın..."
                            className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            rows={1}
                          />
                          
                          <div className="absolute right-2 bottom-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <Image size={20} />
                            </button>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              <Paperclip size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={!messageText.trim() && attachments.length === 0}
                        className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={20} />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-grow flex items-center justify-center text-gray-400">
                  <p>Sohbet seçin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
