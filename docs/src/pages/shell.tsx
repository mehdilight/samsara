import { useState, type MouseEvent, type ReactNode } from 'react';
import {
    Badge,
    Button,
    Drawer,
    FooterBar,
    Rail,
    RailGroup,
    RailIcon,
    RailItem,
    RailLabel,
    RailSeparator,
    RailSpacer,
    RailSubItem,
    SectionPanel,
    Toolbar,
} from 'samsara';
import { Example, PropsTable } from '../lib/blocks';
import { AuthIcon, DbIcon, GearIcon, SqlIcon, TableIcon } from '../lib/icons';
import type { Page } from './types';

/* ── Rail ───────────────────────────────────────────────────────────── */

const railCode = `<Rail aria-label="Sections">
    <RailItem asChild active={pathname === '/tables'}>
        <Link to="/tables" onClick={(e) => e.currentTarget.blur()}>
            <RailIcon><TableIcon /></RailIcon>
            <RailLabel>Table editor</RailLabel>
        </Link>
    </RailItem>
    <RailItem asChild active={pathname === '/sql'}>
        <Link to="/sql" onClick={(e) => e.currentTarget.blur()}>
            <RailIcon><SqlIcon /></RailIcon>
            <RailLabel>SQL editor</RailLabel>
        </Link>
    </RailItem>
    <RailSeparator />
    <RailItem>          {/* no asChild → plain button */}
        <RailIcon><AuthIcon /></RailIcon>
        <RailLabel>Authentication</RailLabel>
    </RailItem>
    <RailSpacer />      {/* pushes the rest to the bottom */}
    <RailItem>
        <RailIcon><GearIcon /></RailIcon>
        <RailLabel>Settings</RailLabel>
    </RailItem>
</Rail>`;

function RailDemo() {
    const [active, setActive] = useState('tables');

    const item = (id: string, icon: ReactNode, label: string) => (
        <RailItem
            active={active === id}
            onClick={(event: MouseEvent<HTMLElement>) => {
                setActive(id);
                event.currentTarget.blur();
            }}
        >
            <RailIcon>{icon}</RailIcon>
            <RailLabel>{label}</RailLabel>
        </RailItem>
    );

    return (
        <div style={{ display: 'flex', width: '100%', position: 'relative', overflow: 'hidden' }}>
            <Rail aria-label="Demo sections">
                {item('tables', <TableIcon />, 'Table editor')}
                {item('sql', <SqlIcon />, 'SQL editor')}
                <RailSeparator />
                {item('auth', <AuthIcon />, 'Authentication')}
                <RailSpacer />
                {item('settings', <GearIcon />, 'Settings')}
            </Rail>
            <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: 'var(--text-faint)', fontSize: 13 }}>
                Hover (or Tab into) the rail — it expands over this content.
            </div>
        </div>
    );
}

const railGroupCode = `<RailGroup icon={<DbIcon />} label="Database" defaultOpen
           active={route.startsWith('/database')}>
    <RailSubItem active={route === '/database/tables'}
                 onClick={() => go('/database/tables')}>Tables</RailSubItem>
    <RailSubItem onClick={() => go('/database/functions')}>Functions</RailSubItem>
    <RailSubItem asChild>          {/* router links work here too */}
        <Link to="/database/roles">Roles</Link>
    </RailSubItem>
</RailGroup>`;

function RailGroupDemo() {
    const [route, setRoute] = useState('db:tables');

    const sub = (id: string, label: string) => (
        <RailSubItem active={route === id} onClick={() => setRoute(id)}>
            {label}
        </RailSubItem>
    );

    return (
        <div style={{ display: 'flex', width: '100%', position: 'relative', overflow: 'hidden' }}>
            <Rail aria-label="Demo sections with submenus">
                <RailItem active={route === 'editor'} onClick={() => setRoute('editor')}>
                    <RailIcon>
                        <TableIcon />
                    </RailIcon>
                    <RailLabel>Table editor</RailLabel>
                </RailItem>
                <RailGroup icon={<DbIcon />} label="Database" defaultOpen active={route.startsWith('db:')}>
                    {sub('db:tables', 'Tables')}
                    {sub('db:functions', 'Functions')}
                    {sub('db:extensions', 'Extensions')}
                </RailGroup>
                <RailGroup icon={<AuthIcon />} label="Authentication" active={route.startsWith('auth:')}>
                    {sub('auth:users', 'Users')}
                    {sub('auth:policies', 'Policies')}
                </RailGroup>
                <RailSpacer />
                <RailItem active={route === 'settings'} onClick={() => setRoute('settings')}>
                    <RailIcon>
                        <GearIcon />
                    </RailIcon>
                    <RailLabel>Settings</RailLabel>
                </RailItem>
            </Rail>
            <div style={{ flex: 1, display: 'grid', placeItems: 'center', color: 'var(--text-faint)', fontSize: 13 }}>
                Hover the rail — Database starts open, Authentication closed.
            </div>
        </div>
    );
}

export const rail: Page = {
    slug: 'rail',
    title: 'Rail',
    sub: 'The expanding icon rail: collapsed to icons, expands over the content on hover or keyboard focus.',
    body: (
        <>
            <Example
                title="Expanding navigation"
                note={
                    <>
                        The wrap keeps a fixed 56px slot in the layout so nothing shifts when it expands. The docs
                        sidebar you are using right now is this component. Blur the item on click
                        (<code>e.currentTarget.blur()</code>) so choosing an item lets the rail collapse again.
                    </>
                }
                code={railCode}
                frame
                height={320}
            >
                <RailDemo />
            </Example>

            <p className="doc-note">
                Router-agnostic: with <code>asChild</code>, RailItem slots its styling onto your own element — a React
                Router <code>Link</code>, a Next.js <code>Link</code>, an <code>a</code>. Without it you get a plain
                button, right for actions like sign-out.
            </p>

            <Example
                title="Submenus"
                note={
                    <>
                        <code>RailGroup</code> nests <code>RailSubItem</code>s under a toggleable row: collapsed, the
                        rail shows just the group icon (still highlighted via <code>active</code> when a child route
                        is current); expanded, a caret appears and the submenu slides open along a guide line.
                        Sub-items take <code>asChild</code> just like RailItem.
                    </>
                }
                code={railGroupCode}
                frame
                height={360}
            >
                <RailGroupDemo />
            </Example>

            <PropsTable
                rows={[
                    { name: 'RailItem active', type: 'boolean', def: 'false', desc: 'Selected styling for the current section.' },
                    { name: 'RailItem asChild', type: 'boolean', def: 'false', desc: 'Render your own element (e.g. a router Link) instead of a button.' },
                    { name: 'RailIcon / RailLabel', type: 'children', desc: 'Fixed 40px icon slot; label revealed on expansion.' },
                    { name: 'RailSeparator / RailSpacer', type: '—', desc: 'Hairline divider; spacer pushes what follows to the bottom.' },
                    { name: 'RailGroup icon / label', type: 'ReactNode', desc: 'Icon shown while collapsed; label while expanded (required).' },
                    { name: 'RailGroup active', type: 'boolean', def: 'false', desc: 'Highlight the group row, e.g. when a child is the active route.' },
                    { name: 'RailGroup defaultOpen', type: 'boolean', def: 'false', desc: 'Start with the submenu open.' },
                    { name: 'RailSubItem active / asChild', type: 'boolean', def: 'false', desc: 'Same contract as RailItem, styled as an indented submenu row.' },
                ]}
            />
        </>
    ),
};

/* ── Panels & bars ──────────────────────────────────────────────────── */

const panelsCode = `<SectionPanel title="Table editor">
    <div className="sam-group-label">Schemas</div>
    <button className="sam-list-item active">
        public <span className="count">12</span>
    </button>
    <button className="sam-list-item">auth</button>
</SectionPanel>

<div className="sam-content-area">
    <Toolbar>
        <span className="title">users</span>
        <Badge color="green">RLS on</Badge>
        <div className="spacer" />
        <Button size="sm">Insert row</Button>
    </Toolbar>
    <div className="sam-content-scroll">…content…</div>
    <FooterBar>
        128 rows
        <div className="spacer" />
        <Button variant="ghost" size="sm">Prev</Button>
        <Button variant="ghost" size="sm">Next</Button>
    </FooterBar>
</div>`;

function PanelsDemo() {
    const [schema, setSchema] = useState('public');

    return (
        <div style={{ display: 'flex', width: '100%', minHeight: 0 }}>
            <SectionPanel title="Table editor">
                <div className="sam-group-label">Schemas</div>
                <button type="button" className={`sam-list-item ${schema === 'public' ? 'active' : ''}`} onClick={() => setSchema('public')}>
                    public <span className="count">12</span>
                </button>
                <button type="button" className={`sam-list-item ${schema === 'auth' ? 'active' : ''}`} onClick={() => setSchema('auth')}>
                    auth <span className="count">4</span>
                </button>
            </SectionPanel>
            <div className="sam-content-area">
                <Toolbar>
                    <span className="title">users</span>
                    <Badge color="green">RLS on</Badge>
                    <div className="spacer" />
                    <Button size="sm">Insert row</Button>
                </Toolbar>
                <div className="sam-content-scroll" style={{ color: 'var(--text-faint)', fontSize: 13 }}>
                    Content scrolls here.
                </div>
                <FooterBar>
                    128 rows
                    <div className="spacer" />
                    <Button variant="ghost" size="sm">
                        Prev
                    </Button>
                    <Button variant="ghost" size="sm">
                        Next
                    </Button>
                </FooterBar>
            </div>
        </div>
    );
}

export const panels: Page = {
    slug: 'panels',
    title: 'Panels & bars',
    sub: 'SectionPanel (contextual sidebar), Toolbar (header row) and FooterBar (status/pagination) compose a section.',
    body: (
        <>
            <Example
                title="A section, assembled"
                note={
                    <>
                        Lay them out in a flex row: SectionPanel keeps a fixed 256px, <code>sam-content-area</code>{' '}
                        takes the rest. Inside Toolbar and FooterBar, <code>.spacer</code> pushes what follows to the
                        right and <code>.title</code> bolds a heading.
                    </>
                }
                code={panelsCode}
                frame
                height={300}
            >
                <PanelsDemo />
            </Example>

            <PropsTable
                rows={[
                    { name: 'SectionPanel title', type: 'ReactNode', desc: 'Header of the sidebar; body scrolls below it (required).' },
                    { name: 'SectionPanel children', type: 'ReactNode', desc: <>Typically <code>sam-group-label</code> and <code>sam-list-item</code> elements.</> },
                    { name: 'Toolbar / FooterBar …props', type: 'HTMLAttributes<HTMLDivElement>', desc: 'Plain flex rows; children flow left to right.' },
                ]}
            />
        </>
    ),
};

/* ── Drawer ─────────────────────────────────────────────────────────── */

const drawerCode = `const [user, setUser] = useState<User | null>(null);

{user && (
    <Drawer
        label="User details"
        onClose={() => setUser(null)}      // omit onClose → inline panel, no scrim
        header={<><strong>{user.email}</strong><Badge color="green">active</Badge></>}
        footer={<Button variant="danger" size="sm">Delete user</Button>}
    >
        <Field label="User ID">
            <div className="sam-copyrow">a1b2c3d4-…</div>
        </Field>
    </Drawer>
)}`;

function DrawerDemo() {
    const [mode, setMode] = useState<'closed' | 'inline' | 'slide-over'>('closed');

    return (
        <>
            <Button onClick={() => setMode('slide-over')}>Open slide-over</Button>
            <Button variant="ghost" onClick={() => setMode(mode === 'inline' ? 'closed' : 'inline')}>
                {mode === 'inline' ? 'Close inline panel' : 'Open inline panel'}
            </Button>
            {mode !== 'closed' && (
                <Drawer
                    label="User details"
                    onClose={mode === 'slide-over' ? () => setMode('closed') : undefined}
                    header={
                        <>
                            <strong>ada@lovelace.dev</strong>
                            <Badge color="green" dot>
                                active
                            </Badge>
                        </>
                    }
                    footer={
                        <>
                            <Button variant="danger" size="sm">
                                Delete user
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setMode('closed')}>
                                Close
                            </Button>
                        </>
                    }
                >
                    <div>
                        <div className="sam-label">User ID</div>
                        <div className="sam-copyrow">a1b2c3d4-e5f6-7890</div>
                    </div>
                    <div>
                        <div className="sam-label">Last sign in</div>
                        <div style={{ fontSize: 13 }}>2 hours ago</div>
                    </div>
                </Drawer>
            )}
        </>
    );
}

export const drawer: Page = {
    slug: 'drawer',
    title: 'Drawer',
    sub: 'Right-anchored detail panel. With onClose it becomes a modal slide-over with a blurred scrim.',
    body: (
        <>
            <Example
                title="Slide-over"
                note={
                    <>
                        With <code>onClose</code> you get the full-height modal slide-over with a blurred scrim; width
                        via <code>--drawer-width</code>. Without it, the drawer is a plain inline panel anchored below
                        your app header via <code>--drawer-top</code> (default 48px — this docs header is exactly
                        that, watch it align) — no scrim, no dismissal, you own its lifecycle.
                    </>
                }
                code={drawerCode}
            >
                <DrawerDemo />
            </Example>

            <PropsTable
                rows={[
                    { name: 'label', type: 'string', desc: 'Accessible name for the dialog (required).' },
                    { name: 'header', type: 'ReactNode', desc: 'Header row content (required).' },
                    { name: 'children', type: 'ReactNode', desc: 'Scrollable body, stacked with a 14px gap (required).' },
                    { name: 'footer', type: 'ReactNode', desc: 'Optional action row pinned to the bottom.' },
                    { name: 'onClose', type: '() => void', desc: 'Provide it to get the modal slide-over with scrim; clicking the scrim calls it.' },
                ]}
            />
        </>
    ),
};
