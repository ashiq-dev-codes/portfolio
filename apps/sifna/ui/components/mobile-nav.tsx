"use client";

import { useEffect, useState } from "react";
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

const contactSectionId = "contact";

const pageItems: NavItem[] = [
  { href: "/", label: "Home", icon: "home", activePaths: ["/"] },
  { href: "/work", label: "Work", icon: "grid", activePaths: ["/work", "/projects"] },
  { href: "/about", label: "About", icon: "user", activePaths: ["/about"] },
];

const contactItem: NavItem = {
  href: `#${contactSectionId}`,
  label: "Contact",
  icon: "mail",
  activePaths: [],
};

const navItems = [...pageItems, contactItem];

const pillSpring: Transition = { type: "spring", stiffness: 500, damping: 40 };

// Phones only: the main links sit at the bottom, where the thumb already is. Contact is a
// section of every page, not a page, so it lights up while that section is on screen.
export function MobileNav() {
  const pathname = usePathname();
  const isContactInView = useIsSectionInView(contactSectionId);
  const activeHref = isContactInView ? contactItem.href : activePageHref(pathname);

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
            <MobileNavLink item={item} isActive={item.href === activeHref} />
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
      className={`relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-medium transition-colors duration-300 active:scale-95 ${isActive ? "text-surface" : "text-muted"}`}
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

/** True while the section's top has scrolled into the upper 60% of the screen. */
function useIsSectionInView(sectionId: string): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry?.isIntersecting ?? false),
      { rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return isInView;
}

function activePageHref(pathname: string): string | null {
  const item = pageItems.find((pageItem) =>
    pageItem.activePaths.some((path) =>
      path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`),
    ),
  );
  return item?.href ?? null;
}
