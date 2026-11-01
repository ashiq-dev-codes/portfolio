import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/** The small terminal-style label above headings: "// selected work". */
export function Eyebrow({ children, className = "text-brand" }: EyebrowProps) {
  return (
    <p className={`font-mono text-xs tracking-wide sm:text-sm ${className}`}>
      <span aria-hidden="true" className="opacity-60">
        {"// "}
      </span>
      {children}
    </p>
  );
}
