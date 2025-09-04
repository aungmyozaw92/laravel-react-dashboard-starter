import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
}

interface ToastProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

const toastIcons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const toastStyles = {
    success: 'bg-gradient-to-r from-emerald-50 to-white border-l-4 border-l-emerald-500 shadow-xl text-gray-900',
    error: 'bg-gradient-to-r from-red-50 to-white border-l-4 border-l-red-500 shadow-xl text-gray-900',
    warning: 'bg-gradient-to-r from-amber-50 to-white border-l-4 border-l-amber-500 shadow-xl text-gray-900',
    info: 'bg-gradient-to-r from-blue-50 to-white border-l-4 border-l-blue-500 shadow-xl text-gray-900',
};

const iconStyles = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
};

export function ToastComponent({ toast, onRemove }: ToastProps) {
    const Icon = toastIcons[toast.type];
    const iconStyle = iconStyles[toast.type];
    const toastStyle = toastStyles[toast.type];

    React.useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(toast.id);
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onRemove]);

    return (
        <div className={`w-96 max-w-lg border rounded-xl shadow-2xl pointer-events-auto backdrop-blur-sm ${toastStyle} animate-in slide-in-from-right-full duration-300`}>
            <div className="p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <div className={`p-2.5 rounded-full ${iconStyle.replace('text-', 'bg-')} bg-opacity-20 ring-2 ring-opacity-20 ${iconStyle.replace('text-', 'ring-')}`}>
                            <Icon className={`h-5 w-5 ${iconStyle}`} />
                        </div>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{toast.title}</p>
                        {toast.message && (
                            <p className="mt-1 text-sm text-gray-600 leading-relaxed break-words">{toast.message}</p>
                        )}
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
                            onClick={() => onRemove(toast.id)}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
