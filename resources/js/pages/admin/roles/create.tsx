import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, User, Mail, Lock, UserPlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/admin/roles',
    },
    {
        title: 'Role Create',
        href: '#',
    },
];

interface Props {
    permissions: string[];
}

export default function Create({ permissions }: Props) {
    
    const {data, setData, errors, post} = useForm<{
        name: string;
        permissions: string[];
    }>({
        name: '',
        permissions: []
    });



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



    const groupedPermissions = groupPermissions(permissions);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/roles', {
            onSuccess: () => {
                console.log('Role created successfully');
            }
        });
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Role" />
            
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
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                    <UserPlus className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Create New Role</h1>
                                    <p className="text-sm text-gray-600">Add a new role to the system</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                    Role Information
                            </h3>
                        </div>
                        
                        <form onSubmit={submit} className="p-6">
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Role Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400 transition-colors"
                                        placeholder="Enter the role's name"
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                {/* Permissions Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Permissions
                                    </label>
                                    
                                    <div className="space-y-6">
                                        {Object.entries(groupedPermissions).map(([groupName, groupPermissions]) => (
                                            <div key={groupName} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                {/* Group Header */}
                                                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-300">
                                                    <h4 className="text-sm font-semibold text-gray-800 capitalize">
                                                        {groupName}
                                                    </h4>
                                                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                                        {groupPermissions.length}
                                                    </span>
                                                </div>
                                                
                                                {/* Horizontal Permission List */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                                    {groupPermissions.map((permission) => (
                                                        <label 
                                                            key={permission} 
                                                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-white hover:shadow-sm transition-all cursor-pointer border border-transparent hover:border-gray-200"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 border-gray-300"
                                                                value={permission}
                                                                checked={data.permissions.includes(permission)}
                                                                onChange={(e) => {
                                                                    const permissionName = e.target.value;
                                                                    const currentPermissions = data.permissions;
                                                                    
                                                                    if (e.target.checked) {
                                                                        // Add permission
                                                                        setData('permissions', [...currentPermissions, permissionName]);
                                                                    } else {
                                                                        // Remove permission
                                                                        setData('permissions', currentPermissions.filter(name => name !== permissionName));
                                                                    }
                                                                }}
                                                            />
                                                            <span className="text-sm text-gray-700 capitalize flex-1">
                                                                {permission.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                                
                                                {/* Select All/None for this group */}
                                                <div className="mt-3 pt-2 border-t border-gray-300 flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const currentPermissions = data.permissions;
                                                            const newPermissions = [...new Set([...currentPermissions, ...groupPermissions])];
                                                            setData('permissions', newPermissions);
                                                        }}
                                                        className="text-xs px-2 py-1 text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        Select All
                                                    </button>
                                                    <span className="text-xs text-gray-400">|</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const currentPermissions = data.permissions;
                                                            const newPermissions = currentPermissions.filter(name => !groupPermissions.includes(name));
                                                            setData('permissions', newPermissions);
                                                        }}
                                                        className="text-xs px-2 py-1 text-red-600 hover:text-red-800 transition-colors"
                                                    >
                                                        Select None
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {errors.permissions && (
                                        <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
                                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                                            {errors.permissions}
                                        </p>
                                    )}
                                </div>
                                
                            </div>

                            {/* Form Actions */}
                            <div className="mt-8 flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                <Link
                                    href="/admin/roles"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors shadow-sm"
                                >
                                    <Save className="w-4 h-4" />
                                    Create Role
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
