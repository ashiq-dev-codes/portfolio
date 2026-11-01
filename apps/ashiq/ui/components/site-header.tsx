import Link from "next/link";
import { NavLink } from "@/ui/components/nav-link";

// On phones every link, Contact included, lives in the bottom bar (MobileNav), so the header
// only shows the logo there. From md up there is no bottom bar and the links return here.
export function SiteHeader() {
  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 border-b border-line/60 bg-paper/75 backdrop-blur-md"
    >
      <div className="page-container flex h-14 items-center justify-between gap-2 md:h-16">
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex min-h-11 items-center font-mono text-lg font-semibold tracking-tight"
        >
          <span className="text-ink">ashiq</span>
          <span className="text-brand transition-transform duration-200 group-hover:translate-x-0.5">/&gt;</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-3 md:flex">
          <NavLink href="/work" alsoActiveFor={["/projects"]}>
            Work
          </NavLink>
          <NavLink href="/about">About</NavLink>
          <Link
            href="#contact"
            className="ml-1 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium whitespace-nowrap text-paper transition duration-200 hover:-translate-y-0.5 hover:bg-brand active:scale-95"
          >
            Let’s talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
