import * as RadixToast from '@radix-ui/react-toast';
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

type ToastOptions = {
    /** Semantic dot color; omit for neutral. */
    kind?: 'success' | 'danger';
    /** Muted second line under the message. */
    description?: string;
    /** Auto-dismiss delay in ms; defaults to the provider's 4000. */
    duration?: number;
};

type ToastItem = ToastOptions & { id: number; message: string };

type ToastFn = (message: string, options?: ToastOptions) => void;

const ToastContext = createContext<ToastFn | null>(null);

/**
 * Imperative toasts on Radix Toast: aria-live announcement, pause on
 * hover/focus, swipe-to-dismiss and the F8 viewport hotkey come from the
 * primitive. Wrap your app once, then fire from anywhere with useToast().
 */
export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const nextId = useRef(0);

    const toast = useCallback<ToastFn>((message, options) => {
        const id = ++nextId.current;
        setToasts((current) => [...current, { id, message, ...options }]);
    }, []);

    // Radix plays the exit animation before hiding the toast; drop the item
    // from state once that has had time to finish.
    const retire = (id: number) => {
        setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 250);
    };

    return (
        <ToastContext.Provider value={toast}>
            <RadixToast.Provider swipeDirection="right" duration={4000}>
                {children}
                {toasts.map((item) => (
                    <RadixToast.Root
                        key={item.id}
                        className={`sam-toast ${item.kind ?? ''}`}
                        duration={item.duration}
                        onOpenChange={(open) => {
                            if (!open) retire(item.id);
                        }}
                    >
                        <span className="dot" />
                        <div>
                            <RadixToast.Title className="sam-toast-title">{item.message}</RadixToast.Title>
                            {item.description !== undefined && (
                                <RadixToast.Description className="sam-toast-desc">
                                    {item.description}
                                </RadixToast.Description>
                            )}
                        </div>
                        <RadixToast.Close className="sam-toast-close" aria-label="Dismiss">
                            ×
                        </RadixToast.Close>
                    </RadixToast.Root>
                ))}
                <RadixToast.Viewport className="sam-toast-viewport" />
            </RadixToast.Provider>
        </ToastContext.Provider>
    );
}

/** Returns toast(message, { kind, description, duration }). Requires ToastProvider. */
export function useToast(): ToastFn {
    const toast = useContext(ToastContext);
    if (toast === null) throw new Error('useToast requires a <ToastProvider> above it.');

    return toast;
}
