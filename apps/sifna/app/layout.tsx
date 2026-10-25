import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Kode_Mono } from "next/font/google";
import { profileRepository } from "@/infrastructure/repositories";
import { MobileNav } from "@/ui/components/mobile-nav";
import { MotionProvider } from "@/ui/components/motion-provider";
import { SiteFooter } from "@/ui/components/site-footer";
import { SiteHeader } from "@/ui/components/site-header";
import "./globals.css";

// "cover" lets the page reach the phone's rounded corners; the bottom bar keeps clear of the
// home indicator with the safe-area padding. The colour tints the phone's browser bar.
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#f5f3ee",
};

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await profileRepository.get();
  return {
    title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
    description: profile.headline,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const profile = await profileRepository.get();

  return (
    <html lang="en" className={`${bricolage.variable} ${kodeMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-surface focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter profile={profile} />
          <MobileNav />
        </MotionProvider>
      </body>
    </html>
  );
}
