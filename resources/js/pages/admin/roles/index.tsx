import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useDeleteConfirmation } from '@/hooks/use-delete-confirmation';
import { DeleteConfirmation } from '@/components/delete-confirmation';
import { Plus, Eye, Edit2, Trash2, ShieldX } from 'lucide-react';
import { can } from '@/lib/can';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/search-input';
import { SortableHeader } from '@/components/sortable-header';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Role List',
        href: '/admin/roles',
    },
];

interface Role {
    id: number;
    name: string;
    permissions: Array<{
        id: number;
        name: string;
    }>;
}

interface PaginatedRoles {
    data: Role[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    roles: PaginatedRoles;
    filters: {
        search: string;
        sort_by: string;
        sort_direction: string;
    };
}

export default function Index({ roles, filters }: Props) {
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
            <Head title="Role" />
            <div>
                <div className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <ShieldX className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Roles Management</h1>
                                <p className="text-sm text-gray-600">Manage and organize your roles</p>
                            </div>
                        </div>
                        {can('role-create') && (
                        <Link 
                            href="/admin/roles/create"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors shadow-sm">
                            <Plus className="w-4 h-4" />
                            Add Role
                        </Link>
                        )}
                    </div>

                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <h3 className="text-lg font-medium text-gray-900">All Roles</h3>
                            <div className="w-full sm:w-64">
                                    <SearchInput 
                                        value={filters.search}
                                        placeholder="Search roles..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-700">
                                <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        <SortableHeader 
                                            label="ID" 
                                            sortKey="id" 
                                            currentSort={filters.sort_by}
                                            currentDirection={filters.sort_direction}
                                        />
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <SortableHeader 
                                            label="Name" 
                                            sortKey="name" 
                                            currentSort={filters.sort_by}
                                            currentDirection={filters.sort_direction}
                                        />
                                    </th>
                                    <th scope="col" className="px-6 py-3">Permissions</th>
                                    <th scope="col" className="px-6 py-3 w-70">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {roles.data.map((role) => (
                                <tr key={role.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                                    <td className="px-6 py-4 font-medium text-gray-900">{role.id}</td>
                                    <td className="px-6 py-4 text-gray-700">{role.name}</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        <div className="flex items-center space-x-2">
                                            <div className="relative group">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-200 rounded-full cursor-help">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                    {role.permissions.length} {role.permissions.length === 1 ? 'Permission' : 'Permissions'}
                                                </span>
                                                
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 min-w-max max-w-sm">
                                                    <div className="font-medium text-gray-200 mb-1 text-center">Permissions</div>
                                                    <div className="max-h-40 overflow-y-auto space-y-1">
                                                        {role.permissions.length > 0 ? (
                                                            role.permissions.map((permission, index) => (
                                                                <div key={permission.id || index} className="flex items-center gap-2 py-1 px-2 bg-gray-700 rounded text-gray-100 text-xs">
                                                                    <span className="w-1 h-1 bg-green-400 rounded-full flex-shrink-0"></span>
                                                                    <span className="capitalize">
                                                                        {(permission.name || permission).replace(/[-_]/g, ' ')}
                                                                    </span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-gray-400 text-center py-2">No permissions assigned</div>
                                                        )}
                                                    </div>
                                                    {/* Tooltip arrow */}
                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 -mt-1"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <Link 
                                                href={`/admin/roles/${role.id}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm">
                                                <Eye className="w-3.5 h-3.5" />
                                                View
                                            </Link>
                                            {can('role-edit') && (
                                            <Link 
                                                href={`/admin/roles/${role.id}/edit`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all shadow-sm">
                                                <Edit2 className="w-3.5 h-3.5" />
                                                Edit
                                            </Link>
                                            )}
                                            {can('role-delete') && (
                                            <button
                                                onClick={() => openDeleteModal(role)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all shadow-sm"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Delete
                                            </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                            </table>

                             {/* Pagination */}
                             <div className="px-6 py-4 border-t border-gray-200">
                                <Pagination links={roles.links} />
                            </div>

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
