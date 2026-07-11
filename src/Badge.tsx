import type { ReactNode } from 'react';

export function Badge({ children, color }: { children: ReactNode; color?: 'green' | 'red' }) {
    return <span className={`sam-badge ${color ?? ''}`}>{children}</span>;
}
