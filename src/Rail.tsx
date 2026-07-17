import { Slot } from '@radix-ui/react-slot';
import React, { useState, type ReactNode } from 'react';

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

/**
 * Collapsible submenu inside the rail. While the rail is collapsed it shows
 * as a plain icon; expanded, it gains a caret and toggles its children
 * inline. Mark it `active` when one of its children is the current route so
 * the collapsed icon still shows where you are.
 */
export function RailGroup({
    icon,
    label,
    active,
    defaultOpen,
    children,
}: {
    icon: ReactNode;
    label: ReactNode;
    active?: boolean;
    defaultOpen?: boolean;
    children: ReactNode;
}) {
    const [open, setOpen] = useState(defaultOpen === true);

    return (
        <div className={`sam-rail-group ${open ? 'open' : ''}`}>
            <button
                type="button"
                className={`sam-rail-btn ${active ? 'active' : ''}`}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
            >
                <span className="sam-rail-icon">{icon}</span>
                <span className="sam-rail-label">{label}</span>
                <span className="sam-rail-caret" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6l6 6-6 6" />
                    </svg>
                </span>
            </button>
            <div className="sam-rail-sub">
                <div className="sam-rail-sub-inner">{children}</div>
            </div>
        </div>
    );
}

export function RailSubItem({
    active,
    asChild,
    className,
    ...props
}: React.HTMLAttributes<HTMLElement> & { active?: boolean; asChild?: boolean }) {
    const classes = ['sam-rail-subitem', active ? 'active' : '', className ?? ''].filter(Boolean).join(' ');

    if (asChild) {
        return <Slot className={classes} {...props} />;
    }

    return <button type="button" className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)} />;
}

export function RailSeparator() {
    return <div className="sam-rail-sep" />;
}

/** Pushes everything after it to the bottom of the rail. */
export function RailSpacer() {
    return <div className="sam-rail-spacer" />;
}
