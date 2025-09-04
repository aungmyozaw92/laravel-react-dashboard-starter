import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Shield, ShieldPlus } from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/admin/permissions',
    },
    {
        title: 'Create Permission',
        href: '#',
    },
];

export default function Create() {
    const { data, setData, errors, post } = useForm<{
        name: string;
    }>({
        name: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        
        post(route('admin.permissions.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Permission" />
            
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link 
                                href={route('admin.permissions.index')}
                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Permissions
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                    <ShieldPlus className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Create New Permission</h1>
                                    <p className="text-sm text-gray-600">Add a new permission to the system</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Permission Information
                            </h3>
                        </div>
                        
                        <form onSubmit={submit} className="p-6">
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Permission Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Shield className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400 transition-colors"
                                            placeholder="e.g., user-create, post-edit, admin-delete"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                                            {errors.name}
                                        </p>
                                    )}
                                    <p className="mt-1 text-sm text-gray-500">
                                        Use kebab-case format (e.g., user-create, post-edit)
                                    </p>
                                </div>

                            </div>

                            {/* Form Actions */}
                            <div className="mt-8 flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                <Link 
                                    href={route('admin.permissions.index')}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors shadow-sm"
                                >
                                    <Save className="w-4 h-4" />
                                    Create Permission
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
