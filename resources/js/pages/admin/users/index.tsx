import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { Plus, Users, Eye, Edit2, Trash2 } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    roles: Array<{
        id: number;
        name: string;
    }>;
}

interface Props {
    users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User List',
        href: '/admin/users',
    },
];

export default function Index({ users }: Props) {
    const {
        isModalOpen,
        itemToDelete,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
        getItemDisplayName
    } = useDeleteConfirmation();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div>
                <div className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                                <p className="text-sm text-gray-600">Manage and organize your users</p>
                            </div>
                        </div>
                        <Link 
                            href="/admin/users/create"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors shadow-sm">
                            <Plus className="w-4 h-4" />
                            Add User
                        </Link>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">All Users</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-700">
                                <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Roles</th>
                                    <th scope="col" className="px-6 py-3 w-70">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                <tr key={user.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 text-gray-700">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            {user.roles && user.roles.length > 0 ? (
                                                user.roles.map((role) => (
                                                    <Link 
                                                        key={role.id || role.name}
                                                        href={`/admin/roles/${role.id}`}
                                                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-200 rounded-full hover:bg-green-200 hover:text-green-800 transition-colors"
                                                    >
                                                        {role.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                                    </Link>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-sm italic">No roles assigned</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Link 
                                                href={`/admin/users/${user.id}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm">
                                                <Eye className="w-3.5 h-3.5" />
                                                View
                                            </Link>
                                            <Link 
                                                href={`/admin/users/${user.id}/edit`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all shadow-sm">
                                                <Edit2 className="w-3.5 h-3.5" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => openDeleteModal(user)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all shadow-sm"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmation
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={() => confirmDelete(`/admin/users/${itemToDelete?.id}`)}
                itemName={getItemDisplayName()}
                title="Delete User"
                confirmText="Delete"
                moduleType="user"
            />
        </AppLayout>
    );
}
