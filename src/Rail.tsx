import { Slot } from '@radix-ui/react-slot';
import React, { type ReactNode } from 'react';

/**
 * The expanding icon rail: collapsed to icons, expands over the content on
 * hover (or keyboard focus), revealing labels. The wrap keeps a fixed slot
 * in the layout so nothing shifts.
 *
 * Router-agnostic: use `asChild` on RailItem and pass your own <Link>.
 * Tip: blur the element on click (onClick={(e) => e.currentTarget.blur()})
 * so choosing an item collapses the rail when the mouse leaves.
 */
export function Rail({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
    return (
        <div className="sam-rail-wrap">
            <nav className="sam-rail" {...props}>
                {children}
            </nav>
        </div>
    );
}

export function RailItem({
    active,
    asChild,
    className,
    ...props
}: React.HTMLAttributes<HTMLElement> & { active?: boolean; asChild?: boolean }) {
    const classes = ['sam-rail-btn', active ? 'active' : '', className ?? ''].filter(Boolean).join(' ');

    if (asChild) {
        return <Slot className={classes} {...props} />;
    }

    return <button type="button" className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} />;
}

export function RailIcon({ children }: { children: ReactNode }) {
    return <span className="sam-rail-icon">{children}</span>;
}

export function RailLabel({ children }: { children: ReactNode }) {
    return <span className="sam-rail-label">{children}</span>;
}

export function RailSeparator() {
    return <div className="sam-rail-sep" />;
}

/** Pushes everything after it to the bottom of the rail. */
export function RailSpacer() {
    return <div className="sam-rail-spacer" />;
}
