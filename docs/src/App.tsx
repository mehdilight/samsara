import { useEffect, useState, type MouseEvent } from 'react';
import {
    Badge,
    Rail,
    RailIcon,
    RailItem,
    RailLabel,
    RailSpacer,
    SectionPanel,
    ToastProvider,
    TooltipProvider,
} from 'samsara';
import { BookIcon, BoxIcon, BracketsIcon, GitHubIcon, LayoutIcon } from './lib/icons';
import { findPage, groups } from './pages';

const GROUP_ICONS = [<BookIcon />, <BoxIcon />, <LayoutIcon />, <BracketsIcon />];

function useHashRoute() {
    const read = () => window.location.hash.replace(/^#\/?/, '');
    const [slug, setSlug] = useState(read);

    useEffect(() => {
        const onChange = () => setSlug(read());
        window.addEventListener('hashchange', onChange);
        return () => window.removeEventListener('hashchange', onChange);
    }, []);

    return slug;
}

export function App() {
    const page = findPage(useHashRoute());

    return (
        <TooltipProvider>
            <ToastProvider>
                <div className="doc-app">
                    <header className="doc-header">
                        <span className="wordmark">Samsara</span>
                        <Badge>v0.1.0</Badge>
                        <div className="spacer" />
                        <a href="https://github.com/mehdilight/samsara">GitHub</a>
                    </header>

                    <div className="doc-main">
                        <Rail aria-label="Doc sections">
                            {groups.map((group, index) => (
                                <RailItem
                                    key={group.label}
                                    active={group.pages.some((p) => p.slug === page.slug)}
                                    onClick={(event: MouseEvent<HTMLElement>) => {
                                        window.location.hash = `/${group.pages[0].slug}`;
                                        event.currentTarget.blur();
                                    }}
                                >
                                    <RailIcon>{GROUP_ICONS[index]}</RailIcon>
                                    <RailLabel>{group.label}</RailLabel>
                                </RailItem>
                            ))}
                            <RailSpacer />
                            <RailItem asChild>
                                <a href="https://github.com/mehdilight/samsara">
                                    <RailIcon>
                                        <GitHubIcon />
                                    </RailIcon>
                                    <RailLabel>GitHub</RailLabel>
                                </a>
                            </RailItem>
                        </Rail>

                        <SectionPanel title="Components">
                            {groups.map((group) => (
                                <div key={group.label} style={{ display: 'contents' }}>
                                    <div className="sam-group-label">{group.label}</div>
                                    {group.pages.map((p) => (
                                        <a
                                            key={p.slug}
                                            className={`sam-list-item ${p.slug === page.slug ? 'active' : ''}`}
                                            href={`#/${p.slug}`}
                                        >
                                            {p.title}
                                        </a>
                                    ))}
                                </div>
                            ))}
                        </SectionPanel>

                        <main className="sam-content-area">
                            <div className="sam-content-scroll" key={page.slug}>
                                <div className="doc-page">
                                    <h1 className="sam-page-title">{page.title}</h1>
                                    <p className="sam-page-sub">{page.sub}</p>
                                    {page.body}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </ToastProvider>
        </TooltipProvider>
    );
}
