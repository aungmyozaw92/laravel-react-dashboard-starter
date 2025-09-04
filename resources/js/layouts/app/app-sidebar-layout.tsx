import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { ToastContainer } from '@/components/ui/toast-container';
import { ToastProvider, useToast } from '@/contexts/toast-context';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

function AppSidebarLayoutContent({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { toasts, removeToast } = useToast();
    
    // Automatically convert Laravel flash messages to toasts
    useFlashMessages();

    return (
        <>
            <AppShell variant="sidebar">
                <AppSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </AppShell>
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </>
    );
}

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <ToastProvider>
            <AppSidebarLayoutContent breadcrumbs={breadcrumbs}>
                {children}
            </AppSidebarLayoutContent>
        </ToastProvider>
    );
}
