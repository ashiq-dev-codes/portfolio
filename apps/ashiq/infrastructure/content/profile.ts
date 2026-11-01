import type { RawProfile } from "@/infrastructure/content/profile-mapper";

// Ashiq's profile. Phone numbers are deliberately not printed; WhatsApp shows only as a button.
export const profile: RawProfile = {
  name: "Mohamed Ashiq",
  role: "Flutter Developer",
  tagline: "Flutter developer → AI engineering",
  headline: "I build mobile apps people actually use.",
  intro:
    "3+ years shipping production Flutter apps for Android and iOS, from a six-brand white-label platform to open-source packages on pub.dev. Now bringing AI into how apps are built and what they can do.",
  about: [
    "I’m a Flutter developer with 3+ years of professional experience. At MVP Application and Game Design in Abu Dhabi, I architected a multi-tenant, white-label platform that ships six independently branded apps from one codebase, with 40+ feature modules, Stripe and Apple Pay, real-time chat and English–Arabic support.",
    "I care about structure that lasts: Clean Architecture, feature-first modules, tests, and CI/CD that releases to both stores without drama. I’ve also worked with Bluetooth wearables, native Swift and Kotlin modules, and React Native.",
    "I build with an AI-assisted workflow every day, and I review and verify everything it produces. That’s the direction I’m growing in: AI engineering, and apps that put it to real use.",
  ],
  location: "India · open to remote",
  availability: "Open to new opportunities",
  photo: {
    url: "/images/mohamed-ashiq.webp",
    alt: "Portrait of Mohamed Ashiq in a dark blazer",
    width: 800,
    height: 1000,
  },
  email: "mohamedashiqap@gmail.com",
  whatsApp: "+91 73061 01272",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mohamedashiq11/" },
    { label: "GitHub", url: "https://github.com/ashiq-dev-codes" },
  ],
  // Waiting for a copy of the CV without phone numbers; the download button stays hidden until then.
  cvUrl: null,
  stats: [
    { value: "3+", label: "years shipping apps" },
    { value: "6", label: "production apps, one codebase" },
    { value: "40+", label: "feature modules" },
    { value: "3", label: "packages on pub.dev" },
  ],
  heroTags: ["flutter_bloc", "Stripe", "Bluetooth LE", "Claude Code"],
  education: [
    {
      degree: "B.Sc Computer Science",
      place: "Calicut University, College of Applied Science, Muthuvallur (IHRD)",
      period: "2016 – 2019",
    },
  ],
  languages: ["English", "Malayalam", "Tamil"],
};
