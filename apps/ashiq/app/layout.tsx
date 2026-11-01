import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profileRepository } from "@/infrastructure/repositories";
import { MobileNav } from "@/ui/components/mobile-nav";
import { MotionProvider } from "@/ui/components/motion-provider";
import { SiteFooter } from "@/ui/components/site-footer";
import { SiteHeader } from "@/ui/components/site-header";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

// "cover" lets the page reach the phone's rounded corners; the bottom bar keeps clear of the
// home indicator with the safe-area padding. The colour tints the phone's browser bar.
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#07080c",
};

export async function generateMetadata(): Promise<Metadata> {
  const profile = await profileRepository.get();
  return {
    title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
    description: profile.intro,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const profile = await profileRepository.get();

  return (
    <html lang="en" className={`${grotesk.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-brand px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
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
