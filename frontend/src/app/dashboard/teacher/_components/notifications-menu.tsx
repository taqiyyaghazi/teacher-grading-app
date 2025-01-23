'use client';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatRelativeTime } from '@/lib/utils';
import { useNotificationStore } from '@/stores/notification-store';
import { Bell, Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';

const NotificationsMenu = () => {
  const { getNotifications, notifications, isLoading } = useNotificationStore();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          {notifications.length > 0 && (
            <div className="rounded-full bg-red-500 w-2 h-2 absolute top-2 right-2" />
          )}
          <Bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : notifications.length > 0 ? (
          <table>
            <tbody>
              {notifications.map((notification, index) => (
                <tr
                  key={`${notification.message}-${index}`}
                  className="border-b px-2"
                >
                  <td className="py-2">
                    <p className="text-sm">{notification.message}</p>
                    <small className="text-muted-foreground">
                      {formatRelativeTime(notification.createdAt)}
                    </small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No Notifications</p>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsMenu;
