import { Eyebrow } from "@/ui/components/eyebrow";
import { Reveal } from "@/ui/components/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string | null;
  /** The page's main heading (h1) instead of a section heading (h2). */
  isPageTitle?: boolean;
};

export function SectionHeading({ eyebrow, title, text, isPageTitle = false }: SectionHeadingProps) {
  const Heading = isPageTitle ? "h1" : "h2";
  const titleSize = isPageTitle ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl";

  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading className={`mt-4 font-semibold tracking-tight text-balance ${titleSize}`}>
        {title}
      </Heading>
      {text && <p className="mt-5 max-w-xl text-lg text-pretty text-muted">{text}</p>}
    </Reveal>
  );
}
