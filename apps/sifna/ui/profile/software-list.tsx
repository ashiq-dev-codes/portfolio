import { maxSoftwareLevel, type Software } from "@/domain/profile/profile";

type SoftwareListProps = {
  software: Software[];
};

export function SoftwareList({ software }: SoftwareListProps) {
  if (software.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {software.map((item) => (
        <li
          key={item.name}
          className="flex items-center gap-3 rounded-full border border-line bg-surface py-2 pr-4 pl-4 shadow-card transition duration-200 hover:-translate-y-0.5"
        >
          <span className="font-medium">{item.name}</span>
          <LevelDots level={item.level} />
        </li>
      ))}
    </ul>
  );
}

function LevelDots({ level }: { level: number }) {
  const dots = Array.from({ length: maxSoftwareLevel }, (_, index) => index < level);

  return (
    <span role="img" aria-label={`Level ${level} of ${maxSoftwareLevel}`} className="flex gap-1">
      {dots.map((isFilled, index) => (
        <span
          key={index}
          className={`size-2 rounded-full ${isFilled ? "bg-brand" : "bg-line"}`}
        />
      ))}
    </span>
  );
}
