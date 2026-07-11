import React, { type ReactNode } from 'react';

/** Surface card, optionally with a bordered header row. */
export function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`sam-card ${className ?? ''}`} {...props}>
            {children}
        </div>
    );
}

export function CardHead({ title, children }: { title?: ReactNode; children?: ReactNode }) {
    return (
        <div className="sam-card-head">
            {title !== undefined && <div className="sam-card-title">{title}</div>}
            {children}
        </div>
    );
}
