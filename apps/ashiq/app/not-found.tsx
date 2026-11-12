import type { Metadata } from "next";
import { ButtonLink } from "@/ui/components/button-link";
import { Reveal } from "@/ui/components/reveal";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="page-container grid min-h-[70svh] place-items-center py-20 text-center">
      <Reveal>
        <p className="text-gradient animate-float text-8xl font-semibold tracking-tight motion-reduce:animate-none sm:text-9xl">
          404
        </p>
        <h1 className="mx-auto mt-6 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          This page doesn’t exist, but the work does.
        </h1>
        <div className="mx-auto mt-10 grid max-w-sm grid-cols-2 gap-3 sm:flex sm:max-w-none sm:justify-center">
          <ButtonLink href="/work" icon="arrow-right">
            View work
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Back home
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
