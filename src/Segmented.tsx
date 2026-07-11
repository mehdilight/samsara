/** Segmented control: one active option out of a small fixed set. */
export function Segmented<T extends string>({
    value,
    onChange,
    options,
    labels,
}: {
    value: T;
    onChange: (value: T) => void;
    options: readonly T[];
    /** Optional display labels keyed by option value. */
    labels?: Partial<Record<T, string>>;
}) {
    return (
        <div className="sam-segmented" role="group">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    className={value === option ? 'active' : ''}
                    aria-pressed={value === option}
                    onClick={() => onChange(option)}
                >
                    {labels?.[option] ?? option}
                </button>
            ))}
        </div>
    );
}
