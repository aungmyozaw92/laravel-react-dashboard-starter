import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
    value: string;
    placeholder?: string;
    className?: string;
}

export function SearchInput({ 
    value: initialValue, 
    placeholder = "Search...", 
    className = "" 
}: SearchInputProps) {
    const [value, setValue] = useState(initialValue);

    // Update internal state when prop changes (e.g., page refresh)
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    // Debounce search
    useEffect(() => {
        // Don't trigger search on initial load if value matches initialValue
        if (value === initialValue) return;
        
        const timer = setTimeout(() => {
            // Get current URL parameters
            const currentParams = new URLSearchParams(window.location.search);
            
            // Update or remove search parameter
            if (value) {
                currentParams.set('search', value);
            } else {
                currentParams.delete('search');
            }
            
            // Reset to page 1 when searching (only when search changes)
            currentParams.delete('page');
            
            // Convert back to object for Inertia
            const params = Object.fromEntries(currentParams.entries());
            
            router.get(window.location.pathname, params, { 
                preserveState: true, 
                preserveScroll: true,
                replace: true 
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [value]);

    const clearSearch = () => {
        setValue('');
    };

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
            </div>
            
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            {value && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
