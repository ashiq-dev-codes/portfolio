import { Reveal } from "@/ui/components/reveal";
import { WordReveal } from "@/ui/components/word-reveal";

type SectionTitleProps = {
  /** The small word in the glass chip above the title, e.g. "Selected work". */
  label: string;
  title: string;
  text?: string | null;
  /** The page's main heading (h1) instead of a section heading (h2). */
  isPageTitle?: boolean;
};

/** A centered section heading: glass label chip, a title whose words rise in, optional text. */
export function SectionTitle({ label, title, text, isPageTitle = false }: SectionTitleProps) {
  const Heading = isPageTitle ? "h1" : "h2";
  const titleSize = isPageTitle ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl";

  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium text-ink/90">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gradient-to-br from-accent to-accent-deep" />
          {label}
        </p>
      </Reveal>
      <Heading className={`mt-4 font-semibold tracking-tight text-balance ${titleSize}`}>
        <WordReveal text={title} delay={0.1} accentWordCount={1} />
      </Heading>
      {text && (
        <Reveal delay={0.25}>
          <p className="mt-4 text-base text-pretty text-muted sm:text-lg">{text}</p>
        </Reveal>
      )}
    </div>
  );
}
