import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { ArrowLeft, EditIcon, TvIcon } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
    },
    {
        title: 'User Details',
        href: '#',
    },
];

export default function Show({ user }: Props) {
    const {
        isModalOpen,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete
    } = useDeleteConfirmation();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />
            <div>
                {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link 
                                href="/admin/users"
                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Users
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <TvIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
                                    <p className="text-sm text-gray-600">Detail {user.name}'s information</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <div className="p-6">

                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">User Information</h3>
                        </div>
                        <div className="px-6 py-4">
                            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Roles</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
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
                                    </dd>
                                </div>
                               
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email Verified</dt>
                                    <dd className="mt-1 text-sm">
                                        {user.email_verified_at ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Not Verified
                                            </span>
                                        )}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(user.created_at).toLocaleString()}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Updated At</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {new Date(user.updated_at).toLocaleString()}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmation
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={() => confirmDelete(`/admin/users/${user.id}`)}
                itemName={user.name}
                title="Delete User"
                confirmText="Delete User"
                moduleType="user"
            />
        </AppLayout>
    );
}