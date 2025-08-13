import React from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';

interface ApiStatusNotificationProps {
  isApiAvailable: boolean;
  error?: string | null;
}

const ApiStatusNotification: React.FC<ApiStatusNotificationProps> = ({
  isApiAvailable,
  error
}) => {
  // Always show notification when API is unavailable
  if (isApiAvailable && !error) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm animate-slide-in">
      <div className={`rounded-lg p-4 shadow-xl border-2 ${
        isApiAvailable
          ? 'bg-green-50 border-green-300 text-green-800'
          : 'bg-amber-50 border-amber-300 text-amber-800'
      }`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {isApiAvailable ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <div className="relative">
                <WifiOff className="h-5 w-5 text-amber-500" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold">
              {isApiAvailable ? '✅ Kết nối API thành công' : '⚠️ Chế độ Offline'}
            </h3>
            <div className="mt-1 text-xs">
              {!isApiAvailable ? (
                <>
                  <p>🔍 API server không phản hồi</p>
                  <p>📱 Sử dụng dữ liệu demo để xem trước</p>
                  <p className="text-amber-600 font-medium mt-1">
                    💡 Website vẫn hoạt động bình thường!
                  </p>
                </>
              ) : (
                'Dữ liệu đã được đồng bộ từ server'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiStatusNotification;
