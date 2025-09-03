import { Link } from "@inertiajs/react";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}

export function Pagination({ links }: PaginationProps) {
    return(
        <div className="flex flex-wrap items-center space-x-1 mt-4">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    preserveScroll
                    className={`px-3 py-1 text-sm rounded border 
                        ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} 
                        ${!link.url ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-100'}`}
                />
            ))}
        </div>
    );
}