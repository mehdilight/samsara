import { useState } from 'react';
import { Badge, Button, Card, CardHead, CellValue, ErrorNote, Field, Modal, Tooltip } from 'samsara';
import { Example, PropsTable } from '../lib/blocks';
import type { Page } from './types';

/* ── Field & inputs ─────────────────────────────────────────────────── */

const fieldCode = `<Field label="Table name">
    <input className="sam-input" placeholder="users" />
</Field>

<Field label="Role">
    <select className="sam-select">
        <option>Admin</option>
        <option>Member</option>
    </select>
</Field>

<Field label="Check constraint">
    <textarea className="sam-textarea" rows={3}
              defaultValue="char_length(name) > 2" />
</Field>

<label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <input type="checkbox" className="sam-check" defaultChecked />
    Enable row-level security
</label>`;

export const field: Page = {
    slug: 'field',
    title: 'Field & inputs',
    sub: 'Field renders a muted label above any control. The controls themselves are plain elements with sam-* classes.',
    body: (
        <>
            <Example
                title="Form controls"
                note={
                    <>
                        <code>sam-input</code>, <code>sam-select</code> and <code>sam-textarea</code> style native
                        elements (add <code>sm</code> for the 28px compact size). <code>sam-check</code> replaces the
                        native checkbox with a token-matched one. The textarea is monospace by design — it grew up
                        holding SQL.
                    </>
                }
                code={fieldCode}
                column
            >
                <div style={{ maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Field label="Table name">
                        <input className="sam-input" placeholder="users" />
                    </Field>
                    <Field label="Role">
                        <select className="sam-select">
                            <option>Admin</option>
                            <option>Member</option>
                        </select>
                    </Field>
                    <Field label="Check constraint">
                        <textarea className="sam-textarea" rows={3} defaultValue="char_length(name) > 2" />
                    </Field>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                        <input type="checkbox" className="sam-check" defaultChecked />
                        Enable row-level security
                    </label>
                </div>
            </Example>

            <PropsTable
                rows={[
                    { name: 'label', type: 'string', desc: 'Muted label rendered above the control (required).' },
                    { name: 'children', type: 'ReactNode', desc: 'Any control — typically a sam-input / sam-select / sam-textarea.' },
                ]}
            />
        </>
    ),
};

/* ── Card ───────────────────────────────────────────────────────────── */

const cardCode = `<Card>
    <CardHead title="Connection info">
        <Badge color="green" dot>Healthy</Badge>
    </CardHead>
    <div style={{ padding: 16 }}>…card body…</div>
</Card>

<div className="sam-card-dashed">Drop a CSV here to import</div>`;

export const card: Page = {
    slug: 'card',
    title: 'Card',
    sub: 'Surface card, optionally with a bordered header row. CardHead spreads title left, extras right.',
    body: (
        <>
            <Example title="With header" code={cardCode} column>
                <Card style={{ maxWidth: 420 }}>
                    <CardHead title="Connection info">
                        <Badge color="green" dot>
                            Healthy
                        </Badge>
                    </CardHead>
                    <div style={{ padding: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
                        Pooler connections are encrypted end to end. Rotate credentials from the settings panel.
                    </div>
                </Card>
                <div className="sam-card-dashed" style={{ maxWidth: 420, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                    Drop a CSV here to import
                </div>
            </Example>

            <PropsTable
                rows={[
                    { name: 'Card …props', type: 'HTMLAttributes<HTMLDivElement>', desc: 'Plain div with the sam-card surface; style/className pass through.' },
                    { name: 'CardHead title', type: 'ReactNode', desc: 'Left-aligned heading in the bordered header row.' },
                    { name: 'CardHead children', type: 'ReactNode', desc: 'Right-aligned extras — badges, buttons.' },
                ]}
            />
        </>
    ),
};

/* ── Tooltip ────────────────────────────────────────────────────────── */

const tooltipCode = `<TooltipProvider>   {/* once, at the app root */}
    <Tooltip label="Run query (⌘⏎)">
        <Button size="sm">Run</Button>
    </Tooltip>
    <Tooltip label="Format SQL" side="bottom">
        <Button variant="ghost" size="sm">Format</Button>
    </Tooltip>
</TooltipProvider>`;

export const tooltip: Page = {
    slug: 'tooltip',
    title: 'Tooltip',
    sub: 'Radix underneath: keyboard focus support and aria wiring for free. Requires TooltipProvider at the root.',
    body: (
        <>
            <Example
                title="Sides"
                note="Hover or keyboard-focus the buttons. These docs already wrap the app in TooltipProvider — you do the same, once."
                code={tooltipCode}
            >
                <Tooltip label="Run query (⌘⏎)">
                    <Button size="sm">Run</Button>
                </Tooltip>
                <Tooltip label="Format SQL" side="bottom">
                    <Button variant="ghost" size="sm">
                        Format
                    </Button>
                </Tooltip>
                <Tooltip label="Danger zone" side="right">
                    <Button variant="danger" size="sm">
                        Drop table
                    </Button>
                </Tooltip>
            </Example>

            <p className="doc-note">
                The trigger is slotted onto your child element, and Radix Slot merges string classNames only — resolve
                dynamic class logic (e.g. router active states) before passing the child.
            </p>

            <PropsTable
                rows={[
                    { name: 'label', type: 'string', desc: 'Tooltip text (required).' },
                    { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", def: "'top'", desc: 'Placement relative to the trigger.' },
                    { name: 'children', type: 'ReactNode', desc: 'The trigger element.' },
                ]}
            />
        </>
    ),
};

/* ── Modal ──────────────────────────────────────────────────────────── */

const modalCode = `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Rename table</Button>

{open && (
    <Modal
        title="Rename table"
        onClose={() => setOpen(false)}
        footer={
            <>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
            </>
        }
    >
        <Field label="Name">
            <input className="sam-input" defaultValue="users" />
        </Field>
    </Modal>
)}`;

function ModalDemo() {
    const [open, setOpen] = useState(false);
    const [wide, setWide] = useState(false);

    return (
        <>
            <Button
                onClick={() => {
                    setWide(false);
                    setOpen(true);
                }}
            >
                Rename table
            </Button>
            <Button
                variant="ghost"
                onClick={() => {
                    setWide(true);
                    setOpen(true);
                }}
            >
                Open wide modal
            </Button>
            {open && (
                <Modal
                    title="Rename table"
                    wide={wide}
                    onClose={() => setOpen(false)}
                    footer={
                        <>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="primary" onClick={() => setOpen(false)}>
                                Save
                            </Button>
                        </>
                    }
                >
                    <Field label="Name">
                        <input className="sam-input" defaultValue="users" />
                    </Field>
                </Modal>
            )}
        </>
    );
}

export const modal: Page = {
    slug: 'modal',
    title: 'Modal',
    sub: 'Radix Dialog underneath: focus trap, Esc/overlay dismissal, aria wiring and scroll lock come from the primitive.',
    body: (
        <>
            <Example
                title="Controlled by mount"
                note="The modal is always open while mounted — render it conditionally and unmount in onClose."
                code={modalCode}
            >
                <ModalDemo />
            </Example>

            <PropsTable
                rows={[
                    { name: 'title', type: 'string', desc: 'Header text, wired as the dialog label (required).' },
                    { name: 'children', type: 'ReactNode', desc: 'Body content, stacked with a 12px gap (required).' },
                    { name: 'footer', type: 'ReactNode', desc: 'Right-aligned footer actions (required).' },
                    { name: 'onClose', type: '() => void', desc: 'Called on Esc, overlay click, or programmatic close (required).' },
                    { name: 'wide', type: 'boolean', def: 'false', desc: '640px instead of 480px.' },
                ]}
            />
        </>
    ),
};

/* ── ErrorNote ──────────────────────────────────────────────────────── */

const errorCode = `try {
    await runQuery(sql);
} catch (error) {
    setError(error);            // whatever was thrown
}

<ErrorNote error={error} />     // renders nothing when error is falsy`;

const hintedError = Object.assign(new Error('permission denied for table users'), {
    hint: 'Check your row-level security policies for the anon role.',
});

export const errorNote: Page = {
    slug: 'error-note',
    title: 'ErrorNote',
    sub: 'Renders any thrown value as an error panel. Duck-types a string hint property as secondary guidance.',
    body: (
        <>
            <Example title="From a thrown value" code={errorCode} column>
                <ErrorNote error={new Error('relation "userss" does not exist')} />
                <ErrorNote error={hintedError} />
                <ErrorNote error="Plain strings work too" />
            </Example>

            <PropsTable
                rows={[
                    { name: 'error', type: 'unknown', desc: <>Anything. <code>Error</code> shows its message; other values are stringified; falsy renders nothing. A string <code>hint</code> property becomes the muted second line — no class dependency.</> },
                ]}
            />
        </>
    ),
};

/* ── CellValue ──────────────────────────────────────────────────────── */

const cellCode = `<td><CellValue value={row.email} /></td>

// null / undefined  →  styled NULL
// objects & arrays  →  JSON.stringify
// everything else   →  String(value)`;

const CELL_ROWS: { label: string; value: unknown }[] = [
    { label: 'string', value: 'ada@lovelace.dev' },
    { label: 'number', value: 42 },
    { label: 'boolean', value: false },
    { label: 'null', value: null },
    { label: 'jsonb', value: { plan: 'pro', seats: 3 } },
    { label: 'array', value: [1, 2, 3] },
];

export const cellValue: Page = {
    slug: 'cell-value',
    title: 'CellValue',
    sub: 'Data-grid cell renderer: NULL styling, objects as JSON, everything else stringified.',
    body: (
        <>
            <Example title="One renderer for every column type" code={cellCode} frame>
                <div className="sam-table-wrap" style={{ border: 'none', borderRadius: 0, width: '100%' }}>
                    <table className="sam-table">
                        <thead>
                            <tr>
                                <th>
                                    column<span className="type">type</span>
                                </th>
                                <th>rendered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CELL_ROWS.map((row) => (
                                <tr key={row.label}>
                                    <td className="sans">{row.label}</td>
                                    <td className={row.value === null ? 'null' : ''}>
                                        <CellValue value={row.value} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Example>

            <PropsTable
                rows={[
                    { name: 'value', type: 'unknown', desc: <>Any cell value. Pair with the <code>null</code> class on the <code>td</code> for the italic faint styling.</> },
                ]}
            />
        </>
    ),
};
