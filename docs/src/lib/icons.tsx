/* Tiny inline icon set (17px stroke icons, sized by .sam-rail-btn svg). */

const strokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
} as const;

export function TableIcon() {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps}>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 10h18M9 10v10" />
        </svg>
    );
}

export function SqlIcon() {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps}>
            <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" />
        </svg>
    );
}

export function AuthIcon() {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
        </svg>
    );
}

export function GearIcon() {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps}>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
        </svg>
    );
}

export function BookIcon() {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps}>
            <path d="M4 5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 0-2 2z" />
            <path d="M4 19a2 2 0 0 1 2-2h14" />
        </svg>
    );
}

export function BoxIcon() {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps}>
            <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
            <path d="M3 8l9 5 9-5M12 13v8" />
        </svg>
    );
}

export function LayoutIcon() {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps}>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M9 4v16M3 9h6" />
        </svg>
    );
}

export function BracketsIcon() {
    return (
        <svg viewBox="0 0 24 24" {...strokeProps}>
            <path d="M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2" />
        </svg>
    );
}

export function GitHubIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2z" />
        </svg>
    );
}
