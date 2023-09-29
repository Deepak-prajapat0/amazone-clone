// components/ToastProvider.tsx
import React, { createContext, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

interface ToastProviderProps {
    children: React.ReactNode;
}

type ToastFunction = (
    title: string,
    description?: string,
    status?: 'info' | 'success' | 'warning' | 'error'
) => void;

interface ToastContextType {
    addToast: ToastFunction;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const toast = useToast();

    const addToast: ToastFunction = (title, description, status = 'success') => {
        toast({
            title,
            description,
            status,
            duration: 4000,
            isClosable: true,
        });
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export function useToastContext() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastProvider');
    }
    return context;
}
