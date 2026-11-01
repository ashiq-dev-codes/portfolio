import type { Experience } from "@/domain/experience/experience";

// Roles, most recent first. Already in domain shape: there is nothing to convert.
export const experience: Experience[] = [
  {
    role: "Full Stack Mobile Developer",
    company: "MVP Application and Game Design",
    location: "Abu Dhabi, UAE",
    period: "2023 – now",
    points: [
      "Architect and maintain a multi-tenant, white-label Flutter platform shipping 6 branded apps from one codebase.",
      "Built 40+ feature modules with a feature-first architecture, Cubit (flutter_bloc) and get_it.",
      "Integrated Bluetooth Low Energy to stream real-time data from a wearable smart ring.",
      "Wrote native Swift and Kotlin modules to expose BLE and device permissions to Flutter.",
      "Run multi-flavor CI/CD with Codemagic, GitHub Actions and Shorebird across all 6 apps.",
      "Write unit, widget and integration tests, and review code with the team.",
    ],
  },
  {
    role: "React Native Developer",
    company: "Independent",
    location: "Remote",
    period: "2026 – now",
    points: [
      "Building a cross-platform marketplace app with React Native, Expo and TypeScript.",
      "Checkout, order tracking, payments and push notifications, end to end.",
    ],
  },
];
