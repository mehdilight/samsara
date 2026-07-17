import { useState, type ReactNode } from 'react';

/* ── Mini TSX highlighter — good enough for curated snippets ────────── */

const TOKENS =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|(<\/?[A-Za-z][\w.]*|\/?>)|\b(import|from|export|default|const|let|function|return|if|else|new|type|typeof|readonly|true|false|null|undefined|async|await|throw)\b|(\b\d+(?:\.\d+)?\b)/g;

function Highlight({ code }: { code: string }) {
    const nodes: ReactNode[] = [];
    let last = 0;
    let key = 0;

    for (const match of code.matchAll(TOKENS)) {
        const index = match.index ?? 0;
        if (index > last) nodes.push(code.slice(last, index));
        const cls = match[1] ? 'c' : match[2] ? 's' : match[3] ? 't' : match[4] ? 'k' : 'n';
        nodes.push(
            <span key={key++} className={`tok-${cls}`}>
                {match[0]}
            </span>,
        );
        last = index + match[0].length;
    }
    nodes.push(code.slice(last));

    return <>{nodes}</>;
}

/* ── Code block with copy button ────────────────────────────────────── */

export function CodeBlock({ code, standalone }: { code: string; standalone?: boolean }) {
    const [copied, setCopied] = useState(false);

    return (
        <div className={`doc-code ${standalone ? 'standalone' : ''}`}>
            <button
                type="button"
                className="sam-btn ghost sm doc-copy"
                onClick={() => {
                    void navigator.clipboard.writeText(code);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1400);
                }}
            >
                {copied ? 'Copied ✓' : 'Copy'}
            </button>
            <pre>
                <code>
                    <Highlight code={code} />
                </code>
            </pre>
        </div>
    );
}

/* ── Example: live preview with its source attached below ───────────── */

export function Example({
    title,
    note,
    code,
    children,
    column,
    frame,
    height,
}: {
    title?: string;
    note?: ReactNode;
    code: string;
    children: ReactNode;
    /** Stack preview children vertically (forms etc.). */
    column?: boolean;
    /** Edge-to-edge preview for shell/layout demos. */
    frame?: boolean;
    /** Fixed preview height, used with frame. */
    height?: number;
}) {
    const classes = ['doc-preview', column ? 'column' : '', frame ? 'frame' : ''].filter(Boolean).join(' ');

    return (
        <section className="doc-example">
            {title !== undefined && <h2 className="doc-h2">{title}</h2>}
            {note !== undefined && <p className="doc-note">{note}</p>}
            <div className={classes} style={height !== undefined ? { height } : undefined}>
                {children}
            </div>
            <CodeBlock code={code} />
        </section>
    );
}

/* ── Props table ────────────────────────────────────────────────────── */

export type PropRow = { name: string; type: string; def?: string; desc: ReactNode };

export function PropsTable({ rows, title = 'Props' }: { rows: PropRow[]; title?: string }) {
    return (
        <>
            <h2 className="doc-h2">{title}</h2>
            <div className="sam-table-wrap doc-props">
                <table className="sam-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.name}>
                                <td>{row.name}</td>
                                <td>{row.type}</td>
                                <td className={row.def === undefined ? 'null' : ''}>{row.def ?? '—'}</td>
                                <td className="sans">{row.desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
