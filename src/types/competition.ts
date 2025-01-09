export interface Competition {
  id: string;
  title: string;
  description: string;
  prize: number;
  startDate: Date;
  endDate: Date;
  remainingTime: string;
  participants: number;
  submissions: Artwork[];
  winner?: Artwork;
  status: 'active' | 'completed' | 'upcoming';
}