import { Head, Link } from '@inertiajs/react';
import { ShieldX, ArrowLeft, Home } from 'lucide-react';

export default function Error403() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
            <Head title="403 - Access Denied" />
            
            <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="mb-8">
                    <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <ShieldX className="w-10 h-10 text-red-600" />
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Access Denied</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Sorry, you don't have permission to access this page. 
                        Please contact your administrator if you believe this is an error.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    
                    <Link 
                        href="/dashboard"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Go to Dashboard
                    </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                        If you need access to this area, please contact your system administrator.
                    </p>
                </div>
            </div>
        </div>
    );
}
