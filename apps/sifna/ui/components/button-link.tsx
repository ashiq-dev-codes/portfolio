import type { ReactNode } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/ui/components/icon";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Shown after the label; it nudges forward on hover. */
  icon?: IconName;
};

const baseClass =
  "group/button inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-medium " +
  "transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function ButtonLink({ href, children, variant = "primary", icon }: ButtonLinkProps) {
  const className = `${baseClass} ${variantClass(variant)}`;
  const content = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          className="size-5 transition-transform duration-200 group-hover/button:translate-x-1"
        />
      )}
    </>
  );

  if (isInternal(href)) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...newTabProps(href)}>
      {content}
    </a>
  );
}

function variantClass(variant: ButtonVariant): string {
  switch (variant) {
    case "primary":
      return "bg-brand text-surface shadow-card hover:bg-brand-deep hover:shadow-lift";
    case "secondary":
      return "border border-line bg-surface text-ink shadow-card hover:shadow-lift";
    case "outline":
      return "border border-current/30 text-current hover:border-current hover:bg-current/10";
  }
}

function isInternal(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

// Web links open in a new tab so the portfolio stays open; mailto: and tel: open an app instead.
function newTabProps(href: string) {
  if (!href.startsWith("http")) return {};
  return { target: "_blank", rel: "noreferrer" };
}
