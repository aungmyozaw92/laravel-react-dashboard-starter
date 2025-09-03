import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, User, Mail, Lock, UserPlus, ChevronDown, X } from 'lucide-react';
import React from 'react';

interface Props {
    roles: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
    },
    {
        title: 'User Create',
        href: '#',
    },
];

export default function Create({ roles }: Props) {
    
    const {data, setData, errors, post} = useForm<{
        name: string;
        email: string;
        password: string;
        roles: string[];
    }>({
        name: '',
        email: '',
        password: '',
        roles: [],
    });

    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = React.useState(false);

    const toggleRole = (role: string) => {
        if (data.roles.includes(role)) {
            setData('roles', data.roles.filter(r => r !== role));
        } else {
            setData('roles', [...data.roles, role]);
        }
    };

    const removeRole = (role: string) => {
        setData('roles', data.roles.filter(r => r !== role));
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('[data-role-dropdown]')) {
                setIsRoleDropdownOpen(false);
            }
        };

        if (isRoleDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isRoleDropdownOpen]);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        
        // Client-side validation for roles
        if (data.roles.length === 0) {
            // pls add client-side error handling here if needed
            // For now, let the server validation handle it
        }
        
        post('/admin/users', {
            onSuccess: () => {
                console.log('User created successfully');
            },
            onError: (errors) => {
                console.log('Validation errors:', errors);
                // Close dropdown on validation error
                setIsRoleDropdownOpen(false);
            }
        });
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New User" />
            
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
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                    <UserPlus className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
                                    <p className="text-sm text-gray-600">Add a new user to the system</p>
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
                                <User className="w-5 h-5" />
                                User Information
                            </h3>
                        </div>
                        
                        <form onSubmit={submit} className="p-6">
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400 transition-colors"
                                            placeholder="Enter the user's full name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="roles" className="block text-sm font-medium text-gray-700 mb-2">
                                        Roles <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative" data-role-dropdown>
                                        <div 
                                            className={`min-h-[48px] w-full pl-10 pr-10 py-2 border rounded-lg focus-within:ring-2 bg-white cursor-pointer transition-colors ${
                                                errors.roles 
                                                    ? 'border-red-300 focus-within:ring-red-500 focus-within:border-red-500' 
                                                    : 'border-gray-300 focus-within:ring-blue-500 focus-within:border-blue-500'
                                            }`}
                                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                                        >
                                            {/* Icon */}
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-4 w-4 text-gray-400" />
                                            </div>
                                            
                                            {/* Selected roles as chips */}
                                            <div className="flex flex-wrap gap-1.5 pr-8">
                                                {data.roles.length > 0 ? (
                                                    data.roles.map((role) => (
                                                        <span 
                                                            key={role}
                                                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-md"
                                                        >
                                                            {role.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeRole(role);
                                                                }}
                                                                className="inline-flex items-center justify-center w-3.5 h-3.5 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full transition-colors"
                                                            >
                                                                <X className="w-2.5 h-2.5" />
                                                            </button>
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 text-sm py-1">Select roles...</span>
                                                )}
                                            </div>
                                            
                                            {/* Dropdown arrow */}
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>
                                        
                                        {/* Dropdown menu */}
                                        {isRoleDropdownOpen && (
                                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                {roles.map((role) => (
                                                    <div 
                                                        key={role}
                                                        className={`px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-gray-50 flex items-center justify-between ${
                                                            data.roles.includes(role) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                                        }`}
                                                        onClick={() => toggleRole(role)}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <User className="h-4 w-4 text-gray-400" />
                                                            {role.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                        </span>
                                                        {data.roles.includes(role) && (
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        )}
                                                    </div>
                                                ))}
                                                {roles.length === 0 && (
                                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                                        No roles available
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {errors.roles && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                                            {errors.roles}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400 transition-colors"
                                            placeholder="Enter the user's email address"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
            <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400 transition-colors"
                                            placeholder="Enter a secure password"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="mt-8 flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                    <Link 
                                    href="/admin/users"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                                >
                                    Cancel
                    </Link>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors shadow-sm"
                                >
                                    <Save className="w-4 h-4" />
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
