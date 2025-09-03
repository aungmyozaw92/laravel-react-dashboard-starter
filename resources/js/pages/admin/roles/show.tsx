import { DeleteConfirmation } from '@/components/delete-confirmation';
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import AppLayout from '@/layouts/app-layout';
import { can } from '@/lib/can';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Edit2, Eye, Shield, Trash2 } from 'lucide-react';

interface Role {
    id: number;
    name: string;
    permissions: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/admin/roles',
    },
    {
        title: 'Role Details',
        href: '#',
    },
];

interface Props {
    rolePermissions: string[];
    role: Role;
}

export default function Show({ rolePermissions, role }: Props) {

    const {
        isModalOpen,
        itemToDelete,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
        getItemDisplayName
    } = useDeleteConfirmation();

    // Group permissions dynamically
    const groupPermissions = (permissions: string[]) => {
        const groups: { [key: string]: string[] } = {};
        
        permissions.forEach(permission => {
            // Extract prefix from permission name
            let prefix = 'other';
            
            // Try dot notation first (e.g., "user.create" -> "user")
            const parts = permission.split('.');
            if (parts.length > 1) {
                prefix = parts[0].toLowerCase();
            } else {
                // Try dash notation (e.g., "user-create" -> "user")
                const dashParts = permission.split('-');
                if (dashParts.length > 1) {
                    prefix = dashParts[0].toLowerCase();
                } else {
                    // Try underscore notation (e.g., "user_create" -> "user")
                    const underscoreParts = permission.split('_');
                    if (underscoreParts.length > 1) {
                        prefix = underscoreParts[0].toLowerCase();
                    } else {
                        // Use the whole permission name as prefix if no separators found
                        prefix = permission.toLowerCase();
                    }
                }
            }
            
            if (!groups[prefix]) {
                groups[prefix] = [];
            }
            groups[prefix].push(permission);
        });
        
        return groups;
    };



    const groupedPermissions = groupPermissions(rolePermissions);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Role Details" />
            
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link 
                                href="/admin/roles"
                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Roles
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Role Details</h1>
                                    <p className="text-sm text-gray-600">View {role.name} role information</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {can('role-edit') && (
                            <Link
                                href={`/admin/roles/${role.id}/edit`}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors shadow-sm"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit Role
                            </Link>
                            )}
                            {can('role-delete') && (
                            <button
                                onClick={() => openDeleteModal(role)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Role
                            </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Role Information Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Eye className="w-5 h-5" />
                                Role Information
                            </h3>
                        </div>
                        <div className="p-6">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Role ID</dt>
                                    <dd className="text-sm text-gray-900 font-semibold">#{role.id}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Role Name</dt>
                                    <dd className="text-sm text-gray-900 font-semibold capitalize">{role.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Total Permissions</dt>
                                    <dd className="text-sm text-gray-900 font-semibold">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-200 rounded-full">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            {rolePermissions.length} {rolePermissions.length === 1 ? 'Permission' : 'Permissions'}
                                        </span>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Permission Groups</dt>
                                    <dd className="text-sm text-gray-900 font-semibold">{Object.keys(groupedPermissions).length} Groups</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Permissions Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Assigned Permissions
                            </h3>
                        </div>
                        <div className="p-6">
                            {rolePermissions.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {Object.entries(groupedPermissions).map(([groupName, groupPermissions]) => (
                                        <div key={groupName} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            {/* Group Header */}
                                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-300">
                                                <h4 className="text-sm font-semibold text-gray-800 capitalize">
                                                    {groupName}
                                                </h4>
                                                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                                                    {groupPermissions.length}
                                                </span>
                                            </div>
                                            
                                            {/* Vertical Permission List */}
                                            <div className="space-y-2">
                                                {groupPermissions.map((permission) => (
                                                    <div 
                                                        key={permission} 
                                                        className="flex items-center space-x-2 text-xs"
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                                                        <span className="text-gray-700 capitalize">
                                                            {permission.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Shield className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Permissions Assigned</h3>
                                    <p className="text-gray-600 mb-4">This role doesn't have any permissions assigned yet.</p>
                                    {can('role-edit') && (
                                    <Link 
                                        href={`/admin/roles/${role.id}/edit`}
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                        Assign Permissions
                                    </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmation
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={() => confirmDelete(`/admin/roles/${itemToDelete?.id}`)}
                itemName={getItemDisplayName()}
                title="Delete Role"
                confirmText="Delete"
                moduleType="role"
            />
            </AppLayout>
    );
}
