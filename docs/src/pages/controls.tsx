import { useState } from 'react';
import { Badge, Button, Chip, Segmented, Switch } from 'samsara';
import { Example, PropsTable } from '../lib/blocks';
import type { Page } from './types';

/* ── Button ─────────────────────────────────────────────────────────── */

export const button: Page = {
    slug: 'button',
    title: 'Button',
    sub: 'One element, four variants. All native button props pass through.',
    body: (
        <>
            <Example
                title="Variants"
                code={`<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Ghost</Button>`}
            >
                <Button>Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="danger">Delete</Button>
                <Button variant="ghost">Ghost</Button>
            </Example>

            <Example
                title="Small"
                code={`<Button size="sm">Run query</Button>
<Button variant="primary" size="sm">Save</Button>`}
            >
                <Button size="sm">Run query</Button>
                <Button variant="primary" size="sm">
                    Save
                </Button>
            </Example>

            <Example
                title="Disabled & full width"
                note={
                    <>
                        Native props pass through — <code>disabled</code>, <code>onClick</code>, <code>className</code>.
                        The <code>block</code> class stretches a button to its container.
                    </>
                }
                code={`<Button disabled>Deploying…</Button>
<Button variant="primary" className="block">New table</Button>`}
                column
            >
                <div>
                    <Button disabled>Deploying…</Button>
                </div>
                <div style={{ width: 240 }}>
                    <Button variant="primary" className="block">
                        New table
                    </Button>
                </div>
            </Example>

            <PropsTable
                rows={[
                    { name: 'variant', type: "'default' | 'primary' | 'danger' | 'ghost'", def: "'default'", desc: 'Visual style. Primary is the solid brand fill; danger is outline until hovered.' },
                    { name: 'size', type: "'sm'", desc: 'Compact 26px height for toolbars.' },
                    { name: '…props', type: 'ButtonHTMLAttributes', desc: <>Everything a native <code>button</code> takes. <code>type</code> defaults to <code>"button"</code>.</> },
                ]}
            />
        </>
    ),
};

/* ── Badge ──────────────────────────────────────────────────────────── */

export const badge: Page = {
    slug: 'badge',
    title: 'Badge',
    sub: 'Status pills. Neutral by default, four semantic colors, optional status dot.',
    body: (
        <>
            <Example
                title="Colors"
                code={`<Badge>draft</Badge>
<Badge color="green">active</Badge>
<Badge color="red">failed</Badge>
<Badge color="amber">pending</Badge>
<Badge color="blue">preview</Badge>`}
            >
                <Badge>draft</Badge>
                <Badge color="green">active</Badge>
                <Badge color="red">failed</Badge>
                <Badge color="amber">pending</Badge>
                <Badge color="blue">preview</Badge>
            </Example>

            <Example
                title="Status dot"
                code={`<Badge color="green" dot>Healthy</Badge>
<Badge color="red" dot>Down</Badge>
<Badge dot>Unknown</Badge>`}
            >
                <Badge color="green" dot>
                    Healthy
                </Badge>
                <Badge color="red" dot>
                    Down
                </Badge>
                <Badge dot>Unknown</Badge>
            </Example>

            <PropsTable
                rows={[
                    { name: 'color', type: "'green' | 'red' | 'amber' | 'blue'", desc: 'Semantic tint; omit for the neutral badge.' },
                    { name: 'dot', type: 'boolean', def: 'false', desc: 'Leading status dot in the badge color.' },
                ]}
            />
        </>
    ),
};

/* ── Chip ───────────────────────────────────────────────────────────── */

const chipCode = `const [status, setStatus] = useState('all');

<Chip active={status === 'all'} onClick={() => setStatus('all')}>All</Chip>
<Chip active={status === 'running'} dotColor="var(--success)"
      onClick={() => setStatus('running')}>Running</Chip>
<Chip active={status === 'failed'} dotColor="var(--danger)"
      onClick={() => setStatus('failed')}>Failed</Chip>`;

function ChipDemo() {
    const [status, setStatus] = useState('all');
    return (
        <>
            <Chip active={status === 'all'} onClick={() => setStatus('all')}>
                All
            </Chip>
            <Chip active={status === 'running'} dotColor="var(--success)" onClick={() => setStatus('running')}>
                Running
            </Chip>
            <Chip active={status === 'failed'} dotColor="var(--danger)" onClick={() => setStatus('failed')}>
                Failed
            </Chip>
        </>
    );
}

export const chip: Page = {
    slug: 'chip',
    title: 'Chip',
    sub: 'Filter pill with an optional colored status dot. A plain button underneath — you own the state.',
    body: (
        <>
            <Example title="Filter row" code={chipCode}>
                <ChipDemo />
            </Example>

            <PropsTable
                rows={[
                    { name: 'active', type: 'boolean', def: 'false', desc: 'Selected styling.' },
                    { name: 'dotColor', type: 'string', desc: <>Any CSS color for the leading dot, e.g. <code>var(--success)</code>.</> },
                    { name: '…props', type: 'ButtonHTMLAttributes', desc: 'Native button props — wire selection with onClick.' },
                ]}
            />
        </>
    ),
};

/* ── Switch ─────────────────────────────────────────────────────────── */

const switchCode = `const [enabled, setEnabled] = useState(true);

<Switch checked={enabled} onCheckedChange={setEnabled}
        aria-label="Enable realtime" />
<Switch checked={false} onCheckedChange={() => {}} disabled
        aria-label="Locked setting" />`;

function SwitchDemo() {
    const [enabled, setEnabled] = useState(true);
    return (
        <>
            <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Enable realtime" />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                Realtime {enabled ? 'on' : 'off'}
            </span>
            <Switch checked={false} onCheckedChange={() => {}} disabled aria-label="Locked setting" />
            <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>disabled</span>
        </>
    );
}

export const switchPage: Page = {
    slug: 'switch',
    title: 'Switch',
    sub: 'Accessible on/off toggle (role="switch"). Controlled only — pass checked and onCheckedChange.',
    body: (
        <>
            <Example title="Controlled" code={switchCode}>
                <SwitchDemo />
            </Example>

            <PropsTable
                rows={[
                    { name: 'checked', type: 'boolean', desc: 'Current state (required).' },
                    { name: 'onCheckedChange', type: '(checked: boolean) => void', desc: 'Called with the next state (required).' },
                    { name: 'disabled', type: 'boolean', def: 'false', desc: 'Disables interaction.' },
                    { name: 'aria-label', type: 'string', desc: 'Label the switch when there is no visible label element.' },
                ]}
            />
        </>
    ),
};

/* ── Segmented ──────────────────────────────────────────────────────── */

const segmentedCode = `const [tab, setTab] = useState<'data' | 'definition' | 'policies'>('data');

<Segmented
    value={tab}
    onChange={setTab}
    options={['data', 'definition', 'policies'] as const}
    labels={{ data: 'Data', definition: 'Definition', policies: 'Policies' }}
/>`;

function SegmentedDemo() {
    const [tab, setTab] = useState<'data' | 'definition' | 'policies'>('data');
    return (
        <Segmented
            value={tab}
            onChange={setTab}
            options={['data', 'definition', 'policies'] as const}
            labels={{ data: 'Data', definition: 'Definition', policies: 'Policies' }}
        />
    );
}

export const segmented: Page = {
    slug: 'segmented',
    title: 'Segmented',
    sub: 'One active option out of a small fixed set. Generic over the option type, so values stay typed.',
    body: (
        <>
            <Example
                title="Controlled"
                note={
                    <>
                        Without <code>labels</code> the raw option values are displayed. For a tab strip attached to a
                        content edge, see the <code>sam-tabs</code> CSS classes instead.
                    </>
                }
                code={segmentedCode}
            >
                <SegmentedDemo />
            </Example>

            <PropsTable
                rows={[
                    { name: 'value', type: 'T extends string', desc: 'The active option (required).' },
                    { name: 'onChange', type: '(value: T) => void', desc: 'Called with the clicked option (required).' },
                    { name: 'options', type: 'readonly T[]', desc: 'The fixed set, in display order (required).' },
                    { name: 'labels', type: 'Partial<Record<T, string>>', desc: 'Optional display labels keyed by option value.' },
                ]}
            />
        </>
    ),
};
