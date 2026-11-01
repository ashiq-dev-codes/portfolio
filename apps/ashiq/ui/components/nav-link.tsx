"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  /** Other paths that belong to this link, e.g. project pages belong to Work. */
  alsoActiveFor?: string[];
  children: ReactNode;
};

export function NavLink({ href, alsoActiveFor = [], children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = [href, ...alsoActiveFor].some((path) => pathname === path || pathname.startsWith(`${path}/`));

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`underline-slide inline-flex min-h-11 items-center px-3 font-medium transition-colors hover:text-ink ${isActive ? "text-ink" : "text-muted"}`}
    >
      {children}
    </Link>
  );
}
