import React from 'react';

/** Filter pill; optionally shows a colored status dot. */
export function Chip({
    active,
    dotColor,
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; dotColor?: string }) {
    return (
        <button
            type="button"
            className={`sam-chip ${active ? 'active' : ''} ${className ?? ''}`}
            {...props}
        >
            {dotColor !== undefined && <span className="dot" style={{ background: dotColor }} />}
            {children}
        </button>
    );
}
