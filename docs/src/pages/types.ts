import type { ReactNode } from 'react';

export type Page = {
    slug: string;
    title: string;
    sub: string;
    body: ReactNode;
};

export type Group = {
    label: string;
    pages: Page[];
};
