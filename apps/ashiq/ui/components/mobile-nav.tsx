"use client";

import { useState, type MouseEvent, type PointerEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, type Transition } from "motion/react";
import { Icon } from "@/ui/components/icon";
import { activePageHref, contactNavItem, contactSectionId, pageNavItems, type NavItem } from "@/ui/components/nav-items";
import { useSectionInView } from "@/ui/components/use-section-in-view";

const navItems = [...pageNavItems, contactNavItem];
const pillSpring: Transition = { type: "spring", stiffness: 520, damping: 38 };
const draggingScale = 1.15;
const tickVibrationMs = 8;

/**
 * Phones only: a floating liquid-glass tab bar. Tap a tab, or press and slide along the bar like
 * iOS: a clear glass lens follows your finger, swelling while you drag, and the tab under it
 * opens when you lift.
 */
export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isContactInView = useSectionInView(contactSectionId);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const activeHref = isContactInView ? contactNavItem.href : activePageHref(pathname);
  const restingIndex = navItems.findIndex((item) => item.href === activeHref);
  const highlightIndex = dragIndex ?? restingIndex;
  const isDragging = dragIndex !== null;

  function handlePointerDown(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    // Capture keeps the moves coming to the bar even when the finger leaves the tab it started on.
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragIndex(indexAtPointer(event));
  }

  function handlePointerMove(event: PointerEvent<HTMLUListElement>) {
    if (dragIndex === null) return;
    const index = indexAtPointer(event);
    if (index === dragIndex) return;
    setDragIndex(index);
    navigator.vibrate?.(tickVibrationMs);
  }

  function handlePointerUp(event: PointerEvent<HTMLUListElement>) {
    if (dragIndex === null) return;
    setDragIndex(null);
    const item = navItems[indexAtPointer(event)];
    if (item) openItem(item, (href) => router.push(href));
  }

  // Taps and drags are handled by the pointer events above. A click with detail 0 comes from the
  // keyboard (Enter), which still works as a normal link.
  function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.detail > 0) event.preventDefault();
  }

  return (
    <motion.nav
      aria-label="Main"
      initial={{ y: 96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, ...pillSpring }}
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      {/* The transition name sits on the glass itself; on a parent it hides the page from the blur. */}
      <ul
        style={{ viewTransitionName: "mobile-nav" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setDragIndex(null)}
        className="liquid-glass glass-thick mx-auto flex max-w-sm touch-none rounded-full p-1.5 select-none"
      >
        {navItems.map((item, index) => (
          <li key={item.href} className="flex-1">
            <TabLink
              item={item}
              isHighlighted={index === highlightIndex}
              isCurrent={item.href === activeHref}
              isDragging={isDragging}
              onClick={handleLinkClick}
            />
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

type TabLinkProps = {
  item: NavItem;
  isHighlighted: boolean;
  isCurrent: boolean;
  isDragging: boolean;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function TabLink({ item, isHighlighted, isCurrent, isDragging, onClick }: TabLinkProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      draggable={false}
      aria-current={isCurrent ? "page" : undefined}
      className={`relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-medium transition-colors duration-200 ${isHighlighted ? "text-accent" : "text-ink/75"}`}
    >
      {isHighlighted && (
        <motion.span
          layoutId="mobile-nav-lens"
          transition={pillSpring}
          animate={{ scale: isDragging ? draggingScale : 1 }}
          className="absolute inset-0 rounded-full border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1px_1px_rgb(255_255_255/0.1),0_8px_20px_-8px_rgb(0_0_0/0.7)]"
        />
      )}
      <Icon name={item.icon} className="relative size-5" />
      <span className="relative">{item.label}</span>
    </Link>
  );
}

// Which tab is under the finger, from its position across the bar.
function indexAtPointer(event: PointerEvent<HTMLUListElement>): number {
  const bounds = event.currentTarget.getBoundingClientRect();
  const ratio = (event.clientX - bounds.left) / bounds.width;
  return Math.min(navItems.length - 1, Math.max(0, Math.floor(ratio * navItems.length)));
}

// Pages open through the router (keeping page transitions); Contact scrolls to the footer.
function openItem(item: NavItem, push: (href: string) => void) {
  if (!item.href.startsWith("#")) {
    push(item.href);
    return;
  }
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(contactSectionId)?.scrollIntoView({ behavior: isReducedMotion ? "auto" : "smooth" });
}
