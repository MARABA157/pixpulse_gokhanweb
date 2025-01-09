export enum Categories {
  PORTRAIT = 'Portre',
  LANDSCAPE = 'Manzara',
  ABSTRACT = 'Soyut',
  DIGITAL = 'Dijital',
  FANTASY = 'Fantastik',
  MODERN = 'Modern'
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  category: Categories;
  likes: number;
  comments: number;
  createdAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  artworks: Artwork[];
  owner: string;
  isPublic: boolean;
  createdAt: Date;
}