/**
 * Renders any thrown value as an error panel. If the error carries a
 * string `hint` property (duck-typed — no class dependency), it is shown
 * as secondary guidance.
 */
export function ErrorNote({ error }: { error: unknown }) {
    if (!error) return null;

    const message = error instanceof Error ? error.message : String(error);
    const hint = typeof (error as { hint?: unknown }).hint === 'string' ? (error as { hint: string }).hint : undefined;

    return (
        <div className="sam-error">
            <div>{message}</div>
            {hint && <div className="hint">{hint}</div>}
        </div>
    );
}
