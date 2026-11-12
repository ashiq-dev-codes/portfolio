import type { IconName } from "@/ui/components/icon";

export type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  /** Pages that make this item active; a project page belongs to Work. */
  activePaths: string[];
};

/** The contact section is on every page (the footer), so it's an anchor, not a page. */
export const contactSectionId = "contact";

export const pageNavItems: NavItem[] = [
  { href: "/", label: "Home", icon: "home", activePaths: ["/"] },
  { href: "/work", label: "Work", icon: "grid", activePaths: ["/work", "/projects"] },
  { href: "/about", label: "About", icon: "user", activePaths: ["/about"] },
];

export const contactNavItem: NavItem = {
  href: `#${contactSectionId}`,
  label: "Contact",
  icon: "mail",
  activePaths: [],
};

/** The page item whose section of the site this path is in, or null. */
export function activePageHref(pathname: string): string | null {
  const item = pageNavItems.find((navItem) =>
    navItem.activePaths.some((path) =>
      path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`),
    ),
  );
  return item?.href ?? null;
}
