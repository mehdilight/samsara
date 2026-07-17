# Samsara

Dark, token-driven React UI primitives and an app shell — red primaries on warm neutral surfaces, with Radix accessibility underneath (focus traps, aria wiring, keyboard support). Everything themes through CSS custom properties.

## Install

```bash
npm install samsara @radix-ui/react-dialog @radix-ui/react-tooltip
```

React ≥18 and the two Radix packages are peer dependencies. The package ships TypeScript source; your bundler must handle TS in dependencies — Vite does out of the box.

## Use

```tsx
import 'samsara/styles.css';                    // once, before your own styles
import { Badge, Button, Field, Modal, Tooltip, TooltipProvider } from 'samsara';

<TooltipProvider>                               {/* once, at the app root */}
    <Button variant="primary" size="sm">Save</Button>
    <Badge color="green">active</Badge>
    <Field label="Email"><input className="sam-input" /></Field>
</TooltipProvider>
```

## What's inside

**Primitives:** `Button` (default/primary/danger/ghost, `sm`), `Badge` (neutral/green/red/amber/blue, optional status `dot`), `Switch`, `Segmented`, `Chip` (filter pill), `Card` + `CardHead`, `Field`, `ErrorNote` (renders any thrown value; shows a `hint` string property when present), `Modal` (Radix Dialog), `Tooltip` + `TooltipProvider` (Radix), `CellValue` (data-grid cell renderer).

**App shell:** `Rail` + `RailItem`/`RailIcon`/`RailLabel`/`RailSeparator`/`RailSpacer` — an icon rail that expands over the content on hover, revealing labels. Router-agnostic via `asChild` (Radix Slot):

```tsx
<Rail aria-label="Sections">
    <RailItem asChild active={pathname === '/tables'}>
        <Link to="/tables" onClick={(e) => e.currentTarget.blur()}>
            <RailIcon><TableIcon /></RailIcon>
            <RailLabel>Table Editor</RailLabel>
        </Link>
    </RailItem>
    <RailSpacer />
    <RailItem onClick={signOut}>…</RailItem>   {/* plain button */}
</Rail>
```

Plus `SectionPanel` (title + scrollable body), `Toolbar`, `FooterBar`, and `Drawer` — right-anchored detail panel (offset under your header with `--drawer-top`), or pass `onClose` to get a modal slide-over with a blurred scrim (`--drawer-width`).

**CSS classes** (`sam-` prefix) for markup you write yourself: `sam-input`, `sam-select`, `sam-textarea`, `sam-check` (custom checkbox), `sam-table` (+ `sam-table-wrap`), `sam-tabs`/`sam-tab`, `sam-panel`, `sam-card-dashed`, `sam-badge`, `sam-error`, `sam-empty`, `sam-label`, `sam-mono`, `sam-kbd`, `sam-copyrow`, `sam-section-panel/-title/-body`, `sam-group-label`, `sam-list-item`, `sam-toolbar`, `sam-footerbar`, `sam-content-area`, `sam-content-scroll`, `sam-grid-scroll`, `sam-page-title`, `sam-page-sub`.

## Theming

Override the custom properties after the stylesheet import:

```css
:root {
    --brand: hsl(153 60% 53%);        /* prefer green? go green */
    --radius: 4px;
    --font-sans: 'Inter', sans-serif;
}
```

Token groups: `--brand-contrast` (text rendered on the brand color — set it when your brand is light), surfaces (`--bg`, `--bg-surface`…`--bg-selection`), borders, text ramp (`--text`…`--text-faint`), `--brand*`, semantic `--success*`/`--danger*`/`--warning`, radii, font stacks, and shell layout (`--panel-header-h`, `--drawer-top`).

## Docs

A browsable component gallery — live previews, copyable snippets and props tables for every component — lives in `docs/` (and is itself built out of samsara):

```bash
cd docs && npm install && npm run dev
```

It imports the library straight from `src/`, so component edits hot-reload in the docs.

## License

MIT
