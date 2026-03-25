'use client';

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Toast() {
  const toasts = useCartStore((state) => state.toasts);
  const removeToast = useCartStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-success';
      case 'error':
        return 'bg-red-50 border-error';
      default:
        return 'bg-blue-50 border-primary';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-slide-up ${getBgColor(toast.type)}`}
        >
          {getIcon(toast.type)}
          <span className="font-medium text-secondary">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

