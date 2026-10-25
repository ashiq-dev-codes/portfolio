"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Transition } from "motion/react";
import { Icon, type IconName } from "@/ui/components/icon";

type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  /** Pages that light this item up; a project page belongs to Work. */
  activePaths: string[];
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: "home", activePaths: ["/"] },
  { href: "/work", label: "Work", icon: "grid", activePaths: ["/work", "/projects"] },
  { href: "/about", label: "About", icon: "user", activePaths: ["/about"] },
  { href: "#contact", label: "Contact", icon: "mail", activePaths: [] },
];

const pillSpring: Transition = { type: "spring", stiffness: 500, damping: 40 };

// Phones only: the main links sit at the bottom, where the thumb already is.
export function MobileNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      aria-label="Main"
      initial={{ y: 96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, ...pillSpring }}
      style={{ viewTransitionName: "mobile-nav" }}
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <ul className="mx-auto flex max-w-sm rounded-full border border-line/80 bg-surface/85 p-1.5 shadow-lift backdrop-blur-md">
        {navItems.map((item) => (
          <li key={item.href} className="flex-1">
            <MobileNavLink item={item} isActive={isActivePath(pathname, item.activePaths)} />
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

function MobileNavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-medium transition-colors active:scale-95 ${isActive ? "text-surface" : "text-muted"}`}
    >
      {isActive && (
        <motion.span
          layoutId="mobile-nav-pill"
          transition={pillSpring}
          className="absolute inset-0 rounded-full bg-ink"
        />
      )}
      <Icon name={item.icon} className="relative size-5" />
      <span className="relative">{item.label}</span>
    </Link>
  );
}

function isActivePath(pathname: string, activePaths: string[]): boolean {
  return activePaths.some((path) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`),
  );
}
