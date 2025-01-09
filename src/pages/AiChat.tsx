import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const API_URL = "https://gpt4all.io/api/chat";

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      toast.error('Lütfen bir mesaj girin');
      return;
    }

    const userMessage = newMessage.trim();
    setNewMessage('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({
              role: msg.isBot ? "assistant" : "user",
              content: msg.text
            })),
            { role: "user", content: userMessage }
          ],
          model: "gpt4all-j-v1.3-groovy",
          temperature: 0.7,
          max_tokens: 200
        }),
      });

      if (!response.ok) {
        throw new Error('API yanıt vermedi');
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      toast.success('Yanıt alındı');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
      setMessages(prev => [...prev, { text: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-start space-x-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            {message.isBot && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <FaRobot className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isBot
                  ? 'bg-blue-600 text-white'
                  : 'bg-purple-600 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
            {!message.isBot && (
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Mesajınızı yazın..."
          className="w-full p-4 pr-12 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !newMessage.trim()}
          className={`absolute right-2 bottom-2 p-2 rounded-full ${
            isLoading || !newMessage.trim()
              ? 'bg-gray-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin text-white" />
          ) : (
            <FaPaperPlane className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AIChat;
