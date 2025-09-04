import React from 'react';
import { ToastComponent, Toast } from './toast';

interface ToastContainerProps {
    toasts: Toast[];
    onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-6 right-6 z-50 space-y-3">
            {toasts.map((toast, index) => (
                <div
                    key={toast.id}
                    className="transform transition-all duration-300 ease-in-out"
                    style={{
                        transform: `translateY(${index * 8}px)`,
                        zIndex: 1000 - index,
                    }}
                >
                    <ToastComponent
                        toast={toast}
                        onRemove={onRemove}
                    />
                </div>
            ))}
        </div>
    );
}
