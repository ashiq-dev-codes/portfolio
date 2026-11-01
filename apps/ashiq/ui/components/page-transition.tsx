import { ViewTransition, type ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

// Lives in each page, not the layout: layouts stay mounted, so they never enter or exit.
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
