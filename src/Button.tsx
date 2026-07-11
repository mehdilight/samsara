import React from 'react';

export function Button({
    children,
    variant = 'default',
    size,
    type = 'button',
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'primary' | 'danger' | 'ghost';
    size?: 'sm';
}) {
    const classes = ['sam-btn', variant !== 'default' ? variant : '', size ?? '', className ?? '']
        .filter(Boolean)
        .join(' ');

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    );
}
