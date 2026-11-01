import type { SkillGroup } from "@/domain/skill/skill";

// Skill groups, most important first. Already in domain shape: there is nothing to convert.
export const skills: SkillGroup[] = [
  {
    name: "Flutter & Dart",
    skills: ["Flutter", "Dart", "BLoC / Cubit", "Riverpod", "Provider", "Custom UI", "Responsive layouts"],
  },
  {
    name: "Architecture",
    skills: ["Clean Architecture", "Feature-first modules", "MVVM", "Repository pattern", "Multi-tenant apps", "get_it"],
  },
  {
    name: "Integrations",
    skills: ["REST", "GraphQL", "Socket.IO", "Stripe", "Apple Pay", "Firebase", "Google Maps", "Bluetooth LE"],
  },
  {
    name: "Data & offline",
    skills: ["SQLite", "Hive", "SharedPreferences", "JSON"],
  },
  {
    name: "Quality & release",
    skills: ["Unit & widget tests", "Integration tests", "Sentry", "Mixpanel", "Codemagic", "GitHub Actions", "Shorebird"],
  },
  {
    name: "Native & cross-platform",
    skills: ["Swift", "Kotlin", "React Native", "Expo", "TypeScript", "Zustand"],
  },
  {
    name: "AI-assisted development",
    skills: ["Claude Code", "Context engineering", "Task decomposition", "Verifying AI output"],
  },
];
