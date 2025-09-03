import { useState } from 'react';
import { router } from '@inertiajs/react';

interface UseDeleteConfirmationOptions {
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

interface DeleteItem {
    id: number | string;
    name?: string;
    title?: string;
    [key: string]: any;
}

export function useDeleteConfirmation(options: UseDeleteConfirmationOptions = {}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<DeleteItem | null>(null);

    const openDeleteModal = (item: DeleteItem) => {
        setItemToDelete(item);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    const confirmDelete = (deleteUrl: string) => {
        if (itemToDelete) {
            router.delete(deleteUrl, {
                onSuccess: () => {
                    closeDeleteModal();
                    options.onSuccess?.();
                },
                onError: (error) => {
                    closeDeleteModal();
                    options.onError?.(error);
                }
            });
        }
    };

    const getItemDisplayName = () => {
        if (!itemToDelete) return '';
        return itemToDelete.name || itemToDelete.title || `Item #${itemToDelete.id}`;
    };

    return {
        isModalOpen,
        itemToDelete,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
        getItemDisplayName,
        // Helper methods for common patterns
        handleDeleteClick: openDeleteModal,
        handleDeleteCancel: closeDeleteModal,
        handleDeleteConfirm: (deleteUrl: string) => confirmDelete(deleteUrl),
    };
}
