import type { CSSProperties } from 'react';
import { Badge, Button, Field } from 'samsara';
import { CodeBlock, Example } from '../lib/blocks';
import type { Page } from './types';

const useCode = `import 'samsara/styles.css';                    // once, before your own styles
import { Badge, Button, Field, TooltipProvider } from 'samsara';

export function App() {
    return (
        <TooltipProvider>                       {/* once, at the app root */}
            <Button variant="primary" size="sm">Save</Button>
            <Badge color="green" dot>active</Badge>
            <Field label="Email">
                <input className="sam-input" placeholder="you@example.com" />
            </Field>
        </TooltipProvider>
    );
}`;

export const gettingStarted: Page = {
    slug: 'getting-started',
    title: 'Getting started',
    sub: 'Dark, token-driven React primitives and an app shell, with Radix accessibility underneath.',
    body: (
        <>
            <h2 className="doc-h2">Install</h2>
            <p className="doc-note">
                React ≥18 and the three Radix packages are peer dependencies. The package ships TypeScript source, so
                your bundler must handle TS in dependencies — Vite does out of the box.
            </p>
            <CodeBlock standalone code="npm install samsara @radix-ui/react-dialog @radix-ui/react-tooltip @radix-ui/react-toast" />

            <Example
                title="Use"
                note={
                    <>
                        Import the stylesheet once, wrap the app in <code>TooltipProvider</code>, and compose. Everything
                        below is live.
                    </>
                }
                code={useCode}
            >
                <Button variant="primary" size="sm">
                    Save
                </Button>
                <Badge color="green" dot>
                    active
                </Badge>
                <div style={{ width: 220 }}>
                    <Field label="Email">
                        <input className="sam-input" placeholder="you@example.com" />
                    </Field>
                </div>
            </Example>

            <h2 className="doc-h2">What's inside</h2>
            <p className="doc-p">
                <strong>Primitives</strong> — Button, Badge, Chip, Switch, Segmented, Card, Field, Tooltip, Modal,
                Toast, ErrorNote, CellValue. <strong>App shell</strong> — an expanding icon Rail, SectionPanel, Toolbar,
                FooterBar and a right-anchored Drawer. Plus plain <code>sam-*</code> CSS classes (inputs, tables, tabs,
                …) for markup you write yourself. Browse the sidebar — every page shows a live preview with its source.
            </p>
        </>
    ),
};

/* ── Theming ────────────────────────────────────────────────────────── */

const themeCode = `/* after the samsara/styles.css import */
:root {
    --brand: hsl(153 60% 45%);        /* prefer green? go green */
    --brand-hover: hsl(153 60% 40%);
    --brand-tint: hsl(153 60% 45% / 0.12);
    --radius: 4px;
}`;

const greenScope: CSSProperties = {
    '--brand': 'hsl(153 60% 45%)',
    '--brand-hover': 'hsl(153 60% 40%)',
    '--brand-tint': 'hsl(153 60% 45% / 0.12)',
    '--radius': '4px',
} as CSSProperties;

function Swatch({ name, text }: { name: string; text?: boolean }) {
    return (
        <div className="doc-swatch">
            <span
                className="sw"
                style={text ? { color: `var(${name})`, background: 'var(--bg)' } : { background: `var(${name})` }}
            >
                {text ? 'Aa' : ''}
            </span>
            <code>{name}</code>
        </div>
    );
}

const SURFACES = ['--bg-deep', '--bg', '--bg-surface', '--bg-surface-2', '--bg-surface-3', '--bg-hover', '--bg-selection', '--border', '--border-strong'];
const TEXT = ['--text', '--text-secondary', '--text-muted', '--text-faint'];
const ACCENTS = ['--brand', '--brand-hover', '--brand-tint', '--brand-deep', '--success', '--success-tint', '--danger', '--danger-tint', '--warning'];

export const theming: Page = {
    slug: 'theming',
    title: 'Theming',
    sub: 'Everything themes through CSS custom properties — override them after the stylesheet import.',
    body: (
        <>
            <Example
                title="Override the tokens"
                note={
                    <>
                        Custom properties inherit, so a scoped override works too — this preview just wraps the buttons
                        in a <code>div</code> carrying the green theme. Set <code>--brand-contrast</code> when your
                        brand color is light.
                    </>
                }
                code={themeCode}
            >
                <Button variant="primary">Default brand</Button>
                <div style={greenScope}>
                    <Button variant="primary">Green brand</Button>
                </div>
            </Example>

            <h2 className="doc-h2">Surfaces &amp; borders</h2>
            <div className="doc-swatches">
                {SURFACES.map((name) => (
                    <Swatch key={name} name={name} />
                ))}
            </div>

            <h2 className="doc-h2">Text ramp</h2>
            <div className="doc-swatches">
                {TEXT.map((name) => (
                    <Swatch key={name} name={name} text />
                ))}
            </div>

            <h2 className="doc-h2">Brand &amp; semantic</h2>
            <p className="doc-note">Success is for status badges only, never actions — actions stay on the brand red.</p>
            <div className="doc-swatches">
                {ACCENTS.map((name) => (
                    <Swatch key={name} name={name} />
                ))}
            </div>

            <h2 className="doc-h2">Layout &amp; type tokens</h2>
            <p className="doc-p">
                <code>--radius</code> / <code>--radius-sm</code>, <code>--font-sans</code> / <code>--font-mono</code>,
                and the shell tokens: <code>--panel-header-h</code> (52px header rows), <code>--drawer-top</code>{' '}
                (offset of the Drawer below your app header, default 48px) and <code>--drawer-width</code>.
            </p>
        </>
    ),
};
