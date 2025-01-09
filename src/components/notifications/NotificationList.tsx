import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications, Notification } from '../../hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

const NotificationItem: React.FC<{
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}> = ({ notification, onMarkAsRead }) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'follow':
        return '👥';
      case 'mention':
        return '@';
      case 'sale':
        return '💰';
      default:
        return '📢';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`p-4 border-b dark:border-gray-700 ${
        notification.read ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
      }`}
      onClick={() => !notification.read && onMarkAsRead(notification.id)}
    >
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{getIcon(notification.type)}</span>
        <div className="flex-1">
          <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        )}
      </div>
    </motion.div>
  );
};

const NotificationList: React.FC = () => {
  const { notifications, loading, error, markAsRead, markAllAsRead } = useNotifications();

  if (loading) {
    return <div className="p-4 text-center">Loading notifications...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error loading notifications</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-h-[500px] overflow-y-auto">
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button
          onClick={() => markAllAsRead()}
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
        >
          Mark all as read
        </button>
      </div>
      <AnimatePresence>
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={markAsRead}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationList;
