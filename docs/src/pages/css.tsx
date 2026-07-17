import { useState } from 'react';
import { Button, CellValue } from 'samsara';
import { CodeBlock, Example } from '../lib/blocks';
import type { Page } from './types';

/* ── Tables ─────────────────────────────────────────────────────────── */

const tableCode = `<div className="sam-table-wrap">
    <table className="sam-table">
        <thead>
            <tr>
                <th className="check-col"><input type="checkbox" className="sam-check" /></th>
                <th>id<span className="type">int8</span></th>
                <th>email<span className="type">text</span></th>
                <th>plan<span className="type">jsonb</span></th>
            </tr>
        </thead>
        <tbody>
            <tr className={selected ? 'selected' : ''}>
                <td className="check-col"><input type="checkbox" className="sam-check" /></td>
                <td><CellValue value={row.id} /></td>
                <td><CellValue value={row.email} /></td>
                <td className={row.plan === null ? 'null' : ''}>
                    <CellValue value={row.plan} />
                </td>
            </tr>
        </tbody>
    </table>
</div>`;

const TABLE_ROWS = [
    { id: 1, email: 'ada@lovelace.dev', plan: { tier: 'pro' } as unknown },
    { id: 2, email: 'grace@hopper.dev', plan: null as unknown },
    { id: 3, email: 'alan@turing.dev', plan: { tier: 'free' } as unknown },
];

function TableDemo() {
    const [selected, setSelected] = useState<number[]>([2]);

    const toggle = (id: number) =>
        setSelected((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

    return (
        <div className="sam-table-wrap" style={{ border: 'none', borderRadius: 0, width: '100%' }}>
            <table className="sam-table">
                <thead>
                    <tr>
                        <th className="check-col" />
                        <th>
                            id<span className="type">int8</span>
                        </th>
                        <th>
                            email<span className="type">text</span>
                        </th>
                        <th>
                            plan<span className="type">jsonb</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS.map((row) => (
                        <tr key={row.id} className={selected.includes(row.id) ? 'selected' : ''}>
                            <td className="check-col">
                                <input
                                    type="checkbox"
                                    className="sam-check"
                                    checked={selected.includes(row.id)}
                                    onChange={() => toggle(row.id)}
                                />
                            </td>
                            <td>
                                <CellValue value={row.id} />
                            </td>
                            <td>
                                <CellValue value={row.email} />
                            </td>
                            <td className={row.plan === null ? 'null' : ''}>
                                <CellValue value={row.plan} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export const tables: Page = {
    slug: 'tables',
    title: 'Tables',
    sub: 'Data-grid styling for plain table markup: sticky headers, hover rows, selection tint, typed column labels.',
    body: (
        <>
            <Example
                title="Data grid"
                note={
                    <>
                        <code>sam-table-wrap</code> gives the border, radius and scroll; inside{' '}
                        <code>sam-grid-scroll</code> drop the wrap and the table borders collapse into the frame.
                        Cells are monospace by default — add <code>sans</code> to a <code>td</code> for prose,{' '}
                        <code>null</code> for the faint italic NULL, <code>selected</code> on a row for the brand tint.
                    </>
                }
                code={tableCode}
                frame
            >
                <TableDemo />
            </Example>
        </>
    ),
};

/* ── Tabs & misc ────────────────────────────────────────────────────── */

const tabsCode = `<div className="sam-tabs">
    <button className="sam-tab active">Results</button>
    <button className="sam-tab">Chart</button>
</div>`;

const miscCode = `<span className="sam-kbd">⌘⏎</span>

<div className="sam-copyrow">
    postgres://user:•••@db.host:5432
    <Button variant="ghost" size="sm">Copy</Button>
</div>

<div className="sam-empty">
    <div className="title">No results</div>
    Run a query to see rows here.
</div>`;

function TabsDemo() {
    const [tab, setTab] = useState('results');
    return (
        <div className="sam-tabs" style={{ borderBottom: '1px solid var(--border)', width: '100%' }}>
            {['results', 'chart', 'explain'].map((id) => (
                <button key={id} type="button" className={`sam-tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
                    {id[0].toUpperCase() + id.slice(1)}
                </button>
            ))}
        </div>
    );
}

export const misc: Page = {
    slug: 'misc',
    title: 'Tabs & misc',
    sub: 'The remaining sam-* classes: tabs, kbd hints, copy rows, empty states, panels.',
    body: (
        <>
            <Example title="Tabs" note="Underline tabs for content edges; use Segmented for standalone pickers." code={tabsCode}>
                <TabsDemo />
            </Example>

            <Example title="Kbd, copy row, empty state" code={miscCode} column>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    Run with <span className="sam-kbd">⌘⏎</span>
                </div>
                <div className="sam-copyrow" style={{ maxWidth: 420 }}>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        postgres://user:•••@db.host:5432
                    </span>
                    <Button variant="ghost" size="sm">
                        Copy
                    </Button>
                </div>
                <div className="sam-empty" style={{ border: '1px dashed var(--border-strong)', borderRadius: 8 }}>
                    <div className="title">No results</div>
                    Run a query to see rows here.
                </div>
            </Example>

            <h2 className="doc-h2">Panels</h2>
            <p className="doc-note">
                <code>sam-panel</code> is a bordered surface with padding; <code>sam-card-dashed</code> the dashed
                variant for drop zones and empty slots. <code>sam-mono</code> switches any element to the mono stack.
            </p>
            <CodeBlock
                standalone
                code={`<div className="sam-panel">…</div>
<div className="sam-card-dashed">…</div>
<span className="sam-mono">SELECT 1</span>`}
            />
        </>
    ),
};
