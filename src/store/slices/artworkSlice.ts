import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  artist: {
    id: string;
    username: string;
    avatar?: string;
  };
  price: number;
  likes: number;
  comments: number;
  createdAt: string;
}

interface ArtworkState {
  items: Artwork[];
  selectedArtwork: Artwork | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArtworkState = {
  items: [],
  selectedArtwork: null,
  loading: false,
  error: null,
};

const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {
    setArtworks: (state, action: PayloadAction<Artwork[]>) => {
      state.items = action.payload;
      state.error = null;
    },
    setSelectedArtwork: (state, action: PayloadAction<Artwork>) => {
      state.selectedArtwork = action.payload;
      state.error = null;
    },
    addArtwork: (state, action: PayloadAction<Artwork>) => {
      state.items.unshift(action.payload);
    },
    updateArtwork: (state, action: PayloadAction<Artwork>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteArtwork: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setArtworks,
  setSelectedArtwork,
  addArtwork,
  updateArtwork,
  deleteArtwork,
  setLoading,
  setError,
} = artworkSlice.actions;

export default artworkSlice.reducer;
