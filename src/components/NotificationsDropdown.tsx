import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { notificationService } from '../services/notifications';
import { Notification } from '../types/notifications';
import {
  Bell,
  Heart,
  MessageSquare,
  UserPlus,
  DollarSign,
  ShoppingCart,
  AtSign,
  Info,
  Check,
  Trash2,
  X
} from 'lucide-react';

export default function NotificationsDropdown() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribeNotifications = notificationService.subscribeToNotifications(
      currentUser.uid,
      (newNotifications) => {
        setNotifications(newNotifications);
      }
    );

    const unsubscribeUnreadCount = notificationService.subscribeToUnreadCount(
      currentUser.uid,
      (count) => {
        setUnreadCount(count);
      }
    );

    return () => {
      unsubscribeNotifications();
      unsubscribeUnreadCount();
    };
  }, [currentUser]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!currentUser) return;
    try {
      await notificationService.markAllAsRead(currentUser.uid);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await notificationService.deleteNotification(notificationId);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleClearAll = async () => {
    if (!currentUser) return;
    try {
      await notificationService.deleteAllNotifications(currentUser.uid);
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="text-red-500" size={18} />;
      case 'comment':
        return <MessageSquare className="text-blue-500" size={18} />;
      case 'follow':
        return <UserPlus className="text-green-500" size={18} />;
      case 'bid':
        return <DollarSign className="text-yellow-500" size={18} />;
      case 'sale':
        return <ShoppingCart className="text-purple-500" size={18} />;
      case 'message':
        return <MessageSquare className="text-blue-500" size={18} />;
      case 'mention':
        return <AtSign className="text-pink-500" size={18} />;
      case 'system':
        return <Info className="text-gray-500" size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium">
            {unreadCount}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold">Bildirimler</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  title="Tümünü okundu işaretle"
                >
                  <Check size={16} />
                </button>
              )}
              <button
                onClick={handleClearAll}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="Tümünü temizle"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                Bildirim bulunmuyor
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-750 transition-colors ${!notification.read ? 'bg-gray-750/50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium mb-1">
                        {notification.data.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {notification.data.body}
                      </p>
                      {notification.data.actionText && (
                        <Link
                          to={notification.data.actionLink || '#'}
                          className="inline-block mt-2 text-sm text-purple-500 hover:text-purple-400"
                        >
                          {notification.data.actionText}
                        </Link>
                      )}
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                        <span>
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="hover:text-white transition-colors"
                              title="Okundu işaretle"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="hover:text-white transition-colors"
                            title="Sil"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-700">
              <Link
                to="/notifications"
                className="block w-full text-center text-sm text-purple-500 hover:text-purple-400"
                onClick={() => setIsOpen(false)}
              >
                Tüm bildirimleri gör
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
