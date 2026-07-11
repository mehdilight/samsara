/** Accessible on/off switch. Controlled: pass checked + onCheckedChange. */
export function Switch({
    checked,
    onCheckedChange,
    disabled,
    'aria-label': ariaLabel,
}: {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    'aria-label'?: string;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            disabled={disabled}
            className={`sam-switch ${checked ? 'on' : ''}`}
            onClick={() => onCheckedChange(!checked)}
        />
    );
}
