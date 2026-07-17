import { card, cellValue, errorNote, field, modal, tooltip } from './content';
import { badge, button, chip, segmented, switchPage } from './controls';
import { misc, tables } from './css';
import { gettingStarted, theming } from './overview';
import { drawer, panels, rail } from './shell';
import type { Group, Page } from './types';

export type { Group, Page };

export const groups: Group[] = [
    { label: 'Overview', pages: [gettingStarted, theming] },
    { label: 'Primitives', pages: [button, badge, chip, switchPage, segmented, field, card, tooltip, modal, errorNote, cellValue] },
    { label: 'App shell', pages: [rail, panels, drawer] },
    { label: 'CSS classes', pages: [tables, misc] },
];

export const allPages: Page[] = groups.flatMap((group) => group.pages);

export function findPage(slug: string): Page {
    return allPages.find((page) => page.slug === slug) ?? allPages[0];
}
