import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';

/**
 * Accessible modal on Radix Dialog: focus trap, Esc/overlay dismissal,
 * aria-labelledby wiring and scroll lock come from the primitive.
 */
export function Modal({
    title,
    children,
    footer,
    onClose,
    wide,
}: {
    title: string;
    children: ReactNode;
    footer: ReactNode;
    onClose: () => void;
    wide?: boolean;
}) {
    return (
        <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="sam-modal-backdrop" />
                <Dialog.Content className={`sam-modal ${wide ? 'wide' : ''}`}>
                    <Dialog.Title className="sam-modal-header">{title}</Dialog.Title>
                    <div className="sam-modal-body">{children}</div>
                    <div className="sam-modal-footer">{footer}</div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
