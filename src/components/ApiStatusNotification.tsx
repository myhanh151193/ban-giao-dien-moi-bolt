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
  if (isApiAvailable && !error) {
    return null; // Don't show anything when everything is working
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className={`rounded-lg p-4 shadow-lg border ${
        isApiAvailable 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {isApiAvailable ? (
              <Wifi className="h-5 w-5 text-green-400" />
            ) : (
              <WifiOff className="h-5 w-5 text-amber-400" />
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">
              {isApiAvailable ? 'Kết nối API thành công' : 'Chế độ offline'}
            </h3>
            <div className="mt-1 text-sm">
              {error || (isApiAvailable 
                ? 'Dữ liệu đã được đồng bộ từ server' 
                : 'Sử dụng dữ liệu offline. Một số tính năng có thể bị hạn chế.'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiStatusNotification;
