import type { ReactNode } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/ui/components/icon";

type ButtonVariant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Shown after the label; it nudges forward on hover. */
  icon?: IconName;
  /** Saves the file instead of opening it, for the CV. */
  isDownload?: boolean;
};

// Rounded-square buttons (not pills), so they read differently from Sifna's site.
const baseClass =
  "group/button relative isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden " +
  "rounded-xl px-4 font-medium whitespace-nowrap sm:px-6 " +
  "transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ButtonLink({ href, children, variant = "primary", icon, isDownload = false }: ButtonLinkProps) {
  const className = `${baseClass} ${variantClass(variant)}`;
  const content = (
    <>
      {/* A band of light that sweeps across on hover, like a reflection sliding over glass. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 -z-10 w-1/3 -translate-x-full -skew-x-12 bg-accent/30 transition-transform duration-700 ease-out group-hover/button:translate-x-[400%] motion-reduce:hidden"
      />
      {children}
      {icon && (
        <Icon name={icon} className="size-5 transition-transform duration-200 group-hover/button:translate-x-0.5" />
      )}
    </>
  );

  if (isInternal(href) && !isDownload) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={className} download={isDownload || undefined} {...newTabProps(href)}>
      {content}
    </a>
  );
}

function variantClass(variant: ButtonVariant): string {
  switch (variant) {
    case "primary":
      return "bg-gradient-to-b from-white to-silver text-paper shadow-glow";
    case "secondary":
      return "glass text-ink hover:border-white/25";
  }
}

function isInternal(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

// Web links open in a new tab so the portfolio stays open; mailto: opens the mail app instead.
function newTabProps(href: string) {
  if (!href.startsWith("http")) return {};
  return { target: "_blank", rel: "noreferrer" };
}
