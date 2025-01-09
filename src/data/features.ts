import { FaRobot, FaImage, FaVideo } from 'react-icons/fa';

export const features = [
  {
    title: "Resim Oluştur",
    description: "Yapay zeka ile hayalinizdeki resimleri oluşturun",
    icon: FaImage,
    to: "/create",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "Video Oluştur",
    description: "Metinden video oluşturun",
    icon: FaVideo,
    to: "/create-video",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    title: "AI Chat",
    description: "Yapay zeka ile sohbet edin",
    icon: FaRobot,
    to: "/aichat",
    gradient: "from-blue-500 to-cyan-500"
  }
];
