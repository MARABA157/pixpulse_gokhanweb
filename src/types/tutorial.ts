export enum TutorialLevel {
  BEGINNER = 'Başlangıç',
  INTERMEDIATE = 'Orta Seviye',
  ADVANCED = 'İleri Seviye'
}

export interface Tutorial {
  id: string;
  title: string;
  content: string;
  level: TutorialLevel;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  duration: number; // dakika cinsinden
  createdAt: Date;
  likes: number;
  views: number;
}