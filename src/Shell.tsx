import React, { type ReactNode } from 'react';

/** Contextual sidebar for a section: title header + scrollable body. */
export function SectionPanel({ title, children }: { title: ReactNode; children: ReactNode }) {
    return (
        <div className="sam-section-panel">
            <div className="sam-section-title">{title}</div>
            <div className="sam-section-body">{children}</div>
        </div>
    );
}

/** Content header bar; pair with <div className="spacer" /> to right-align. */
export function Toolbar({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="sam-toolbar" {...props}>
            {children}
        </div>
    );
}

/** Bottom status/pagination bar. */
export function FooterBar({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="sam-footerbar" {...props}>
            {children}
        </div>
    );
}

/**
 * Right-anchored detail drawer. Offset below your app header with the
 * --drawer-top custom property (defaults to 48px).
 */
export function Drawer({
    label,
    header,
    children,
    footer,
}: {
    label: string;
    header: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
}) {
    return (
        <div className="sam-drawer" role="dialog" aria-label={label}>
            <div className="sam-drawer-header">{header}</div>
            <div className="sam-drawer-body">{children}</div>
            {footer !== undefined && <div className="sam-drawer-footer">{footer}</div>}
        </div>
    );
}
