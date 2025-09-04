import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/contexts/toast-context';

interface FlashMessages {
    successMessage?: string;
    errorMessage?: string;
    warningMessage?: string;
    infoMessage?: string;
    // Legacy support
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
}

export function useFlashMessages() {
    const { addToast } = useToast();
    const { props } = usePage<{ flash: FlashMessages }>();

    useEffect(() => {
        const flash = props.flash;

        if (flash?.successMessage || flash?.success) {
            console.log('Flash message detected:', flash.successMessage || flash.success);
            addToast({
                type: 'success',
                title: 'Success',
                message: flash.successMessage || flash.success,
            });
        }

        if (flash?.errorMessage || flash?.error) {
            addToast({
                type: 'error',
                title: 'Error',
                message: flash.errorMessage || flash.error,
            });
        }

        if (flash?.warningMessage || flash?.warning) {
            addToast({
                type: 'warning',
                title: 'Warning',
                message: flash.warningMessage || flash.warning,
            });
        }

        if (flash?.infoMessage || flash?.info) {
            addToast({
                type: 'info',
                title: 'Info',
                message: flash.infoMessage || flash.info,
            });
        }
    }, [props.flash, addToast]);
}
