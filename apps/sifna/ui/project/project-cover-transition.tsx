import { ViewTransition, type ReactNode } from "react";

type ProjectCoverTransitionProps = {
  projectSlug: string;
  children: ReactNode;
};

/**
 * Wrap a project's cover with this on both the card and the project page, and the browser morphs
 * one into the other. Only one per project may be on screen at a time.
 */
export function ProjectCoverTransition({ projectSlug, children }: ProjectCoverTransitionProps) {
  return (
    <ViewTransition name={`project-cover-${projectSlug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
