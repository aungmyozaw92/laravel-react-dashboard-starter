import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit2, Shield } from 'lucide-react';
import { can } from '@/lib/can';
import { route } from 'ziggy-js';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    permission: Permission;
}

export default function Show({ permission }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Permissions',
            href: route('admin.permissions.index'),
        },
        {
            title: permission.name,
            href: route('admin.permissions.show', permission.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission: ${permission.name}`} />
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('admin.permissions.index')}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Permissions
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                        {can('permission-edit') && (
                            <Link
                                href={route('admin.permissions.edit', permission.id)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors shadow-sm"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit Permission
                            </Link>
                        )}
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{permission.name}</h1>
                                <p className="text-sm text-gray-600">Permission Details</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-6">
                        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Permission ID</dt>
                                <dd className="mt-1 text-sm text-gray-900">{permission.id}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Permission Name</dt>
                                <dd className="mt-1">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
                                        {permission.name}
                                    </span>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Guard Name</dt>
                                <dd className="mt-1">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-full">
                                        {permission.guard_name}
                                    </span>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {new Date(permission.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Updated At</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {new Date(permission.updated_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
