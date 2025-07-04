
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Award, AlertCircle, CheckCircle, X } from "lucide-react";

interface Notification {
  id: string;
  type: 'deadline' | 'status' | 'recommendation' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  urgent?: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const NotificationCenter = ({ 
  notifications = [],
  onMarkAsRead = () => {},
  onDismiss = () => {}
}: NotificationCenterProps) => {
  const [localNotifications, setLocalNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'deadline',
      title: '截止日期提醒',
      message: '哈佛大学奖学金申请将在3天后截止，请尽快完成申请！',
      date: '2024-01-15',
      read: false,
      urgent: true
    },
    {
      id: '2',
      type: 'status',
      title: '申请状态更新',
      message: '您的MIT奖学金申请状态已更新为"审核中"',
      date: '2024-01-14',
      read: false
    },
    {
      id: '3',
      type: 'recommendation',
      title: '新奖学金推荐',
      message: '根据您的资料，我们为您推荐了2个新的奖学金项目',
      date: '2024-01-13',
      read: true
    },
    {
      id: '4',
      type: 'system',
      title: '资料完善提醒',
      message: '完善个人陈述可以提高申请成功率，当前完成度60%',
      date: '2024-01-12',
      read: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Calendar className="h-5 w-5 text-red-500" />;
      case 'status':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'recommendation':
        return <Award className="h-5 w-5 text-green-500" />;
      case 'system':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'deadline':
        return { variant: 'destructive' as const, text: '紧急' };
      case 'status':
        return { variant: 'default' as const, text: '状态' };
      case 'recommendation':
        return { variant: 'secondary' as const, text: '推荐' };
      case 'system':
        return { variant: 'outline' as const, text: '系统' };
      default:
        return { variant: 'secondary' as const, text: '通知' };
    }
  };

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    onMarkAsRead(id);
  };

  const handleDismiss = (id: string) => {
    setLocalNotifications(prev => prev.filter(notif => notif.id !== id));
    onDismiss(id);
  };

  const unreadCount = localNotifications.filter(n => !n.read).length;
  const urgentCount = localNotifications.filter(n => n.urgent && !n.read).length;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            通知中心
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          {urgentCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {urgentCount} 紧急
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {localNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>暂无通知</p>
          </div>
        ) : (
          localNotifications.map((notification) => {
            const badge = getNotificationBadge(notification.type);
            return (
              <div
                key={notification.id}
                className={`border rounded-lg p-4 transition-colors ${
                  notification.read ? 'bg-gray-50' : 'bg-white border-blue-200'
                } ${notification.urgent ? 'border-red-200 bg-red-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                          {notification.title}
                        </h4>
                        <Badge variant={badge.variant} className="text-xs">
                          {badge.text}
                        </Badge>
                        {notification.urgent && (
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            紧急
                          </Badge>
                        )}
                      </div>
                      <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-xs"
                      >
                        标为已读
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDismiss(notification.id)}
                      className="p-1 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
