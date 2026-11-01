import type { Metadata } from "next";
import { ButtonLink } from "@/ui/components/button-link";
import { Reveal } from "@/ui/components/reveal";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="page-container relative grid min-h-[70svh] place-items-center py-20 text-center">
      <div aria-hidden="true" className="grid-backdrop absolute inset-0" />
      <Reveal className="relative">
        <p className="font-mono text-sm text-muted">
          <span className="text-brand">$</span> GET {"<this page>"}
        </p>
        <p className="mt-3 font-mono text-7xl font-semibold text-gradient sm:text-9xl">404</p>
        <h1 className="mx-auto mt-6 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          This route doesn’t exist, but the work does.
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/work" icon="arrow-right">
            See my work
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back home
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
