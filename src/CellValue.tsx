/** Data-grid cell renderer: NULL styling, objects as JSON, rest stringified. */
export function CellValue({ value }: { value: unknown }) {
    if (value === null || value === undefined) return <span className="null">NULL</span>;
    if (typeof value === 'object') return <>{JSON.stringify(value)}</>;

    return <>{String(value)}</>;
}
