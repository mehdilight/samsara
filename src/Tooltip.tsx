import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

/**
 * Accessible tooltip on Radix: keyboard focus support and aria wiring.
 * Note: Radix Slot merges string classNames only — resolve dynamic class
 * logic (e.g. router active states) before passing a child element.
 */
export function Tooltip({
    label,
    side = 'top',
    children,
}: {
    label: string;
    side?: 'top' | 'right' | 'bottom' | 'left';
    children: ReactNode;
}) {
    return (
        <RadixTooltip.Root>
            <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
            <RadixTooltip.Portal>
                <RadixTooltip.Content className="sam-tooltip" side={side} sideOffset={6}>
                    {label}
                    <RadixTooltip.Arrow className="sam-tooltip-arrow" />
                </RadixTooltip.Content>
            </RadixTooltip.Portal>
        </RadixTooltip.Root>
    );
}

/** Wrap your app once; required by Tooltip. */
export function TooltipProvider({ children }: { children: ReactNode }) {
    return <RadixTooltip.Provider delayDuration={300}>{children}</RadixTooltip.Provider>;
}
