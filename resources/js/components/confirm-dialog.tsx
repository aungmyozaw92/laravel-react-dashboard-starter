import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger'
}: ConfirmDialogProps) {
    const getVariantStyles = () => {
        switch (variant) {
            case 'danger':
                return {
                    icon: 'text-red-600',
                    confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
                    iconBg: 'bg-red-100'
                };
            case 'warning':
                return {
                    icon: 'text-yellow-600',
                    confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
                    iconBg: 'bg-yellow-100'
                };
            default:
                return {
                    icon: 'text-blue-600',
                    confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
                    iconBg: 'bg-blue-100'
                };
        }
    };

    const styles = getVariantStyles();

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center`}>
                            <AlertTriangle className={`w-5 h-5 ${styles.icon}`} />
                        </div>
                        <DialogTitle className="text-lg font-medium text-gray-900">
                            {title}
                        </DialogTitle>
                    </div>
                </DialogHeader>
                
                <div className="mt-4">
                    <p className="text-sm text-gray-600 leading-6">
                        {message}
                    </p>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${styles.confirmButton}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
