"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`underline-slide inline-flex min-h-11 items-center px-3 font-medium transition-colors hover:text-brand ${isActive ? "text-brand" : "text-ink"}`}
    >
      {children}
    </Link>
  );
}
