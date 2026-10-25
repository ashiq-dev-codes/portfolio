import type { Metadata } from "next";
import { profileRepository } from "@/infrastructure/repositories";
import { PageTransition } from "@/ui/components/page-transition";
import { Reveal } from "@/ui/components/reveal";
import { AboutIntro } from "@/ui/profile/about-intro";
import { MilestoneList } from "@/ui/profile/milestone-list";
import { SoftwareList } from "@/ui/profile/software-list";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const profile = await profileRepository.get();

  return (
    <PageTransition>
      <AboutIntro profile={profile} />
      <section className="page-container grid gap-14 pt-24 md:grid-cols-2">
        <MilestoneList title="Experience" milestones={profile.experience} />
        <MilestoneList title="Education" milestones={profile.education} />
      </section>
      {profile.software.length > 0 && (
        <section className="page-container pt-20">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight">Tools I design with</h2>
            <div className="mt-6">
              <SoftwareList software={profile.software} />
            </div>
          </Reveal>
        </section>
      )}
    </PageTransition>
  );
}
