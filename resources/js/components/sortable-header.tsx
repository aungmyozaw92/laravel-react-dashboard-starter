import { Link } from '@inertiajs/react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface SortableHeaderProps {
    label: string;
    sortKey: string;
    currentSort?: string;
    currentDirection?: string;
    className?: string;
}

export function SortableHeader({ 
    label, 
    sortKey, 
    currentSort, 
    currentDirection = 'asc',
    className = ''
}: SortableHeaderProps) {
    const isActive = currentSort === sortKey;
    const newDirection = isActive && currentDirection === 'asc' ? 'desc' : 'asc';
    
    // Get current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('sort_by', sortKey);
    urlParams.set('sort_direction', newDirection);
    
    const getSortIcon = () => {
        if (!isActive) {
            return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
        }
        
        return currentDirection === 'asc' 
            ? <ChevronUp className="w-4 h-4 text-blue-600" />
            : <ChevronDown className="w-4 h-4 text-blue-600" />;
    };

    return (
        <Link
            href={`${window.location.pathname}?${urlParams.toString()}`}
            className={`flex items-center gap-1 hover:text-blue-600 transition-colors ${className} ${
                isActive ? 'text-blue-600 font-medium' : 'text-gray-700'
            }`}
            preserveState
            preserveScroll
        >
            <span>{label}</span>
            {getSortIcon()}
        </Link>
    );
}
