import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/** The small bracketed label above headings, in Sifna's pixel font. */
export function Eyebrow({ children, className = "text-brand" }: EyebrowProps) {
  return (
    <p className={`font-mono text-xs tracking-[0.18em] uppercase sm:text-sm ${className}`}>
      <span aria-hidden="true">[ </span>
      {children}
      <span aria-hidden="true"> ]</span>
    </p>
  );
}
