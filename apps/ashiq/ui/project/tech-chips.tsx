type TechChipsProps = {
  items: string[];
  /** Show only this many, then "+N". */
  max?: number;
};

export function TechChips({ items, max }: TechChipsProps) {
  const shown = max === undefined ? items : items.slice(0, max);
  const hiddenCount = items.length - shown.length;

  return (
    <ul className="flex flex-wrap gap-2">
      {shown.map((item) => (
        <li key={item} className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
          {item}
        </li>
      ))}
      {hiddenCount > 0 && (
        <li className="rounded-full px-2 py-1 font-mono text-xs text-muted">+{hiddenCount}</li>
      )}
    </ul>
  );
}
