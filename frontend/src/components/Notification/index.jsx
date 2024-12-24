import {
  IconMessageCircle,
  IconCalendarEvent,
  IconCheck,
  IconBell,
} from "@tabler/icons-react";

const Notification = () => {
  // Dữ liệu thông báo giả bằng tiếng Nhật
  const notifications = [
    {
      type: "event",
      icon: <IconCalendarEvent size={20} className="text-blue-500" />,
      message: "新しいイベントが作成されました: 金曜日午後3時のチームビルディング。",
      timestamp: "2024-12-24T14:00:00Z",
    },
    {
      type: "chat",
      icon: <IconMessageCircle size={20} className="text-green-500" />,
      message: "'プロジェクトアルファ'グループチャットに新しいメッセージがあります。",
      timestamp: "2024-12-24T13:45:00Z",
    },
    {
      type: "topic",
      icon: <IconBell size={20} className="text-yellow-500" />,
      message: "新しいトピックが作成されました: 'オフィスの装飾アイデア'。",
      timestamp: "2024-12-24T12:30:00Z",
    },
    {
      type: "personal",
      icon: <IconCheck size={20} className="text-purple-500" />,
      message: "あなたのタスク 'プレゼンテーションの準備' が完了としてマークされました。",
      timestamp: "2024-12-24T11:00:00Z",
    }
  ];

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white border rounded-md shadow-lg p-4">
      <p className="text-lg font-bold mb-4 border-b pb-2">通知</p>
      <ul className="space-y-4">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="flex items-start gap-3 bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition"
          >
            <div>{notification.icon}</div>
            <div>
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(notification.timestamp).toLocaleString("ja-JP", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
