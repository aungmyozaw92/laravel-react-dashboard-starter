// Example: How to use the reusable delete confirmation for other modules

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import { DeleteConfirmation } from '@/components/delete-confirmation';

export default function ProductsIndex({ products }) {
    // 🎯 Step 1: Use the reusable hook
    const {
        isModalOpen,
        itemToDelete,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
        getItemDisplayName
    } = useDeleteConfirmation({
        onSuccess: () => {
            // Optional: Custom success handling
            console.log('Product deleted successfully!');
        },
        onError: (error) => {
            // Optional: Custom error handling
            console.error('Error deleting product:', error);
        }
    });

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Products" />
            <div>
                <div className="p-3">
                    {/* Products table */}
                    <table className="w-full text-sm text-left text-gray-700">
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>
                                        {/* 🎯 Step 2: Use openDeleteModal on delete button */}
                                        <button
                                            onClick={() => openDeleteModal(product)}
                                            className="px-3 py-2 text-xs font-medium text-white bg-red-700 rounded-lg hover:bg-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🎯 Step 3: Use the reusable DeleteConfirmation component */}
            <DeleteConfirmation
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={() => confirmDelete(`/admin/products/${itemToDelete?.id}`)}
                itemName={getItemDisplayName()}
                title="Delete Product"
                confirmText="Delete Product"
                moduleType="product"
            />
        </AppLayout>
    );
}

// 🚀 Alternative: Even simpler with the higher-order component
export function ProductsIndexWithHOC({ products }) {
    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Products" />
            <WithDeleteConfirmation
                deleteUrl="/admin/products"
                itemName="Product"
                title="Delete Product"
                moduleType="product"
            >
                {({ openDeleteModal, DeleteModal }) => (
                    <>
                        <div>
                            <table>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>
                                                <button onClick={() => openDeleteModal(product)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <DeleteModal />
                    </>
                )}
            </WithDeleteConfirmation>
        </AppLayout>
    );
}
