import { renderHook, act } from '@testing-library/react-hooks';
import { useNotifications } from '../../../hooks/useNotifications';
import { supabase } from '../../../lib/supabase';

// Mock Supabase client
jest.mock('../../../lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(),
      update: jest.fn(),
      eq: jest.fn(),
      order: jest.fn(),
    })),
    channel: jest.fn(() => ({
      on: jest.fn().mockReturnThis(),
      subscribe: jest.fn(),
    })),
  },
}));

describe('useNotifications', () => {
  const mockUser = { id: 'test-user-id' };
  const mockNotifications = [
    {
      id: '1',
      type: 'like',
      message: 'Someone liked your NFT',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'comment',
      message: 'New comment on your NFT',
      read: true,
      createdAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({ data: mockUser });
    (supabase.from as jest.Mock)().select.mockResolvedValue({
      data: mockNotifications,
      error: null,
    });
  });

  it('fetches notifications on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useNotifications());
    
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    
    expect(result.current.loading).toBe(false);
    expect(result.current.notifications).toEqual(mockNotifications);
    expect(result.current.unreadCount).toBe(1);
  });

  it('marks notification as read', async () => {
    (supabase.from as jest.Mock)().update.mockResolvedValue({ error: null });

    const { result, waitForNextUpdate } = renderHook(() => useNotifications());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.markAsRead('1');
    });

    expect(supabase.from).toHaveBeenCalledWith('notifications');
    expect(result.current.unreadCount).toBe(0);
  });

  it('marks all notifications as read', async () => {
    (supabase.from as jest.Mock)().update.mockResolvedValue({ error: null });

    const { result, waitForNextUpdate } = renderHook(() => useNotifications());
    await waitForNextUpdate();

    await act(async () => {
      await result.current.markAllAsRead();
    });

    expect(supabase.from).toHaveBeenCalledWith('notifications');
    expect(result.current.unreadCount).toBe(0);
    expect(result.current.notifications.every(n => n.read)).toBe(true);
  });

  it('handles errors during fetch', async () => {
    const mockError = new Error('Failed to fetch');
    (supabase.from as jest.Mock)().select.mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useNotifications());
    await waitForNextUpdate();

    expect(result.current.error).toBe(mockError);
    expect(result.current.loading).toBe(false);
  });

  it('subscribes to real-time updates', async () => {
    const { waitForNextUpdate } = renderHook(() => useNotifications());
    await waitForNextUpdate();

    expect(supabase.channel).toHaveBeenCalled();
  });
});
