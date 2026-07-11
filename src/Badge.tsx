import type { ReactNode } from 'react';

export function Badge({
    children,
    color,
    dot,
}: {
    children: ReactNode;
    color?: 'green' | 'red' | 'amber' | 'blue';
    dot?: boolean;
}) {
    return (
        <span className={`sam-badge ${color ?? ''}`}>
            {dot === true && <span className="dot" />}
            {children}
        </span>
    );
}
