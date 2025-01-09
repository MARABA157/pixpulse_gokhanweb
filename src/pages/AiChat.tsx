import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const API_KEY = "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";
const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

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
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: userMessage,
          options: {
            wait_for_model: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error('API yanıt vermedi');
      }

      const data = await response.json();
      const botResponse = data[0]?.generated_text || 'Üzgünüm, şu anda yanıt veremiyorum.';
      
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
      toast.success('Yanıt alındı');
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', isBot: true }]);
      toast.error('Mesaj gönderilemedi');
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
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <img
          src="https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=2070&auto=format&fit=crop"
          alt="City Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 bg-opacity-90 rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center">
              <FaRobot className="text-2xl text-blue-500 mr-2" />
              <h1 className="text-xl font-semibold text-white">AI Sohbet</h1>
            </div>

            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.isBot ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-gray-800 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      {message.isBot ? (
                        <FaRobot className="text-blue-500" />
                      ) : (
                        <FaUser className="text-green-500" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex space-x-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın..."
                  className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !newMessage.trim()}
                  className={`px-4 py-2 rounded-lg flex items-center justify-center ${
                    isLoading || !newMessage.trim()
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors`}
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaPaperPlane />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
