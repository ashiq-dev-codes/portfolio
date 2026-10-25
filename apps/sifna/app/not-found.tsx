import type { Metadata } from "next";
import { ButtonLink } from "@/ui/components/button-link";
import { Eyebrow } from "@/ui/components/eyebrow";
import { Reveal } from "@/ui/components/reveal";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="page-container grid min-h-[70svh] place-items-center py-20 text-center">
      <Reveal>
        <p className="font-mono text-8xl text-brand sm:text-9xl">404</p>
        <Eyebrow className="mt-6 text-muted">Page not found</Eyebrow>
        <h1 className="mx-auto mt-4 max-w-lg text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          This page wandered off, but the work is still here.
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/work" icon="arrow-right">
            View my work
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back home
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
