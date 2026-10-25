import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/** The small bracketed label above headings, in Sifna's pixel font. */
export function Eyebrow({ children, className = "text-brand" }: EyebrowProps) {
  return (
    <p className={`font-mono text-xs tracking-[0.14em] uppercase sm:text-sm sm:tracking-[0.18em] ${className}`}>
      {/* Non-breaking spaces keep each bracket on the same line as the words. */}
      <span aria-hidden="true">[&nbsp;</span>
      {children}
      <span aria-hidden="true">&nbsp;]</span>
    </p>
  );
}
