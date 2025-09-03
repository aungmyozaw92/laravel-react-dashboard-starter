import React from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';

interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    title?: string;
    message?: string;
    confirmText?: string;
    moduleType?: string;
}

export function DeleteConfirmation({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    title = 'Delete Item',
    message,
    confirmText = 'Delete',
    moduleType = 'item'
}: DeleteConfirmationProps) {
    const defaultMessage = message || 
        `Are you sure you want to delete "${itemName}"? This action cannot be undone and will permanently remove all ${moduleType} data.`;

    return (
        <ConfirmDialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title={title}
            message={defaultMessage}
            confirmText={confirmText}
            cancelText="Cancel"
            variant="danger"
        />
    );
}

// Higher-order component pattern for even easier usage
interface WithDeleteConfirmationProps {
    deleteUrl: string;
    itemName: string;
    title?: string;
    message?: string;
    confirmText?: string;
    moduleType?: string;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    children: (props: {
        openDeleteModal: (item: any) => void;
        DeleteModal: React.ComponentType;
    }) => React.ReactNode;
}

export function WithDeleteConfirmation({
    deleteUrl,
    itemName,
    title,
    message,
    confirmText,
    moduleType,
    onSuccess,
    onError,
    children
}: WithDeleteConfirmationProps) {
    const {
        isModalOpen,
        itemToDelete,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
        getItemDisplayName
    } = useDeleteConfirmation({ onSuccess, onError });

    const DeleteModal = () => (
        <DeleteConfirmation
            isOpen={isModalOpen}
            onClose={closeDeleteModal}
            onConfirm={() => confirmDelete(deleteUrl)}
            itemName={getItemDisplayName()}
            title={title}
            message={message}
            confirmText={confirmText}
            moduleType={moduleType}
        />
    );

    return (
        <>
            {children({ openDeleteModal, DeleteModal })}
        </>
    );
}
