"use client";

import { useState, type FocusEvent, type PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Transition } from "motion/react";
import type { ImageAsset } from "@/domain/image/image-asset";
import { activePageHref, contactSectionId, pageNavItems, type NavItem } from "@/ui/components/nav-items";

type DynamicIslandProps = {
  name: string;
  photo: ImageAsset;
};

const islandSpring: Transition = { type: "spring", stiffness: 380, damping: 30 };
const collapseAfterPx = 80;
const islandLinks = pageNavItems.filter((item) => item.href !== "/");

/**
 * The header, moving like the iPhone's Dynamic Island, with no background. Open with links at the
 * top of the page, it shrinks to the photo and name as you scroll and springs open again on hover
 * or keyboard focus. Phones keep it small; their links live in the bottom bar (MobileNav).
 */
export function DynamicIsland({ name, photo }: DynamicIslandProps) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const isOpen = isAtTop || isHovered || hasFocus;
  const activeHref = activePageHref(pathname);

  useMotionValueEvent(scrollY, "change", (y) => setIsAtTop(y < collapseAfterPx));

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") setIsHovered(true);
  }

  // Stays open while keyboard focus moves between its own links.
  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
  }

  return (
    <motion.div
      layout
      transition={islandSpring}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={handleBlur}
      style={{ viewTransitionName: "site-header" }}
      className="pointer-events-auto flex h-12 items-center p-1.5"
    >
      <motion.div layout="position" transition={islandSpring}>
        <Link href="/" className="group flex min-h-9 items-center gap-2.5 rounded-full pr-3 pl-0.5">
          <Image
            src={photo.url}
            alt=""
            width={photo.width}
            height={photo.height}
            className="size-8 rounded-full object-cover object-top ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-sm font-semibold tracking-tight">{name}</span>
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-online motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-online" />
          </span>
        </Link>
      </motion.div>
      <AnimatePresence initial={false} mode="popLayout">
        {isOpen && (
          <motion.nav
            key="island-links"
            aria-label="Main"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={islandSpring}
            className="hidden items-center gap-1 border-l border-white/10 pl-1.5 md:flex"
          >
            {islandLinks.map((item) => (
              <IslandLink key={item.href} item={item} isActive={item.href === activeHref} />
            ))}
            <Link
              href={`#${contactSectionId}`}
              className="ml-1 inline-flex min-h-9 items-center rounded-full bg-accent/15 px-4 text-sm font-medium text-accent ring-1 ring-accent/30 transition duration-200 hover:bg-accent hover:text-paper active:scale-95"
            >
              Contact
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function IslandLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`relative inline-flex min-h-9 items-center rounded-full px-4 text-sm font-medium transition-colors hover:text-ink ${isActive ? "text-ink" : "text-muted"}`}
    >
      {isActive && (
        <motion.span
          layoutId="island-lens"
          transition={islandSpring}
          className="absolute inset-0 rounded-full bg-white/10 shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]"
        />
      )}
      <span className="relative">{item.label}</span>
    </Link>
  );
}
