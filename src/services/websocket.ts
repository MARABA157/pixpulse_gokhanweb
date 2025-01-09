import { io, Socket } from 'socket.io-client';
import store from '../store';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect() {
    if (this.socket?.connected) return;

    this.socket = io(import.meta.env.VITE_WS_URL || 'wss://pixelpulse.io', {
      transports: ['websocket'],
      auth: {
        token: store.getState().auth.token,
      },
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.handleReconnect();
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    // Özel event listener'lar
    this.socket.on('new_message', (data) => {
      // Mesaj geldiğinde store'u güncelle
      store.dispatch({ type: 'messages/newMessage', payload: data });
    });

    this.socket.on('artwork_liked', (data) => {
      // Beğeni geldiğinde store'u güncelle
      store.dispatch({ type: 'artwork/liked', payload: data });
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this.connect();
    }, Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000));
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (!this.socket?.connected) {
      console.warn('Socket not connected. Attempting to connect...');
      this.connect();
      return;
    }
    this.socket.emit(event, data);
  }
}

export const wsService = new WebSocketService();
