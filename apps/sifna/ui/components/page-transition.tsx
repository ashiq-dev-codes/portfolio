import { ViewTransition, type ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

/** Tag a link with this type to switch pages without the page fade, like the work filters. */
export const quietTransitionType = "quiet";

// Lives in each page, not the layout: layouts stay mounted, so they never enter or exit.
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition
      enter={{ [quietTransitionType]: "none", default: "page-enter" }}
      exit={{ [quietTransitionType]: "none", default: "page-exit" }}
      default="none"
    >
      <div>{children}</div>
    </ViewTransition>
  );
}
