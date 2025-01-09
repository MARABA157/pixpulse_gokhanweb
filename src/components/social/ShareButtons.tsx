import React from 'react';
import { Twitter, Facebook, Linkedin, Share2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { socialMediaService } from '../../services/socialMedia';

interface ShareButtonsProps {
  title: string;
  text?: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, text, url }) => {
  const shareOptions = { title, text, url };

  const buttons = [
    {
      name: 'Twitter',
      icon: Twitter,
      onClick: () => socialMediaService.shareToTwitter(shareOptions),
      color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      onClick: () => socialMediaService.shareToFacebook(shareOptions),
      color: 'bg-[#4267B2] hover:bg-[#365899]'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      onClick: () => socialMediaService.shareToLinkedIn(shareOptions),
      color: 'bg-[#0077B5] hover:bg-[#006399]'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      onClick: () => socialMediaService.shareToWhatsApp(shareOptions),
      color: 'bg-[#25D366] hover:bg-[#22bf5b]'
    },
    {
      name: 'Share',
      icon: Share2,
      onClick: () => socialMediaService.shareNative(shareOptions),
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  return (
    <div className="flex space-x-2">
      {buttons.map((button) => (
        <motion.button
          key={button.name}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={button.onClick}
          className={`p-2 rounded-full text-white ${button.color} transition-colors duration-200`}
          aria-label={`Share on ${button.name}`}
        >
          <button.icon className="w-5 h-5" />
        </motion.button>
      ))}
    </div>
  );
};

export default ShareButtons;
