type TechMarqueeProps = {
  /** Tool names, shown in a slowly scrolling strip. */
  items: string[];
};

// The list is drawn twice and slides by half its width, so the loop never shows a gap.
// It pauses on hover and stops for visitors who prefer less motion.
export function TechMarquee({ items }: TechMarqueeProps) {
  if (items.length === 0) return null;
  const loop = [...items, ...items];

  return (
    <section
      aria-label="Tools I work with"
      className="relative mt-12 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] sm:mt-16"
    >
      <ul className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= items.length || undefined}
            className="font-mono text-sm whitespace-nowrap text-muted transition-colors hover:text-ink"
          >
            <span className="text-brand">◆</span> {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
