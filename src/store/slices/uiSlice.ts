import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface Modal {
  id: string;
  type: string;
  props?: Record<string, any>;
}

interface UiState {
  notifications: Notification[];
  activeModals: Modal[];
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

const initialState: UiState = {
  notifications: [],
  activeModals: [],
  theme: 'dark',
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    openModal: (state, action: PayloadAction<Modal>) => {
      state.activeModals.push(action.payload);
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.activeModals = state.activeModals.filter(m => m.id !== action.payload);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const {
  addNotification,
  removeNotification,
  openModal,
  closeModal,
  setTheme,
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
