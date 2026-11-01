export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-right"
  | "mail"
  | "whatsapp"
  | "map-pin"
  | "home"
  | "grid"
  | "user"
  | "github"
  | "linkedin"
  | "download"
  | "check";

type IconProps = {
  name: IconName;
  className?: string;
};

// One outline style for every icon, drawn inline so there's no icon package to load.
export function Icon({ name, className = "size-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <IconPath name={name} />
    </svg>
  );
}

function IconPath({ name }: { name: IconName }) {
  switch (name) {
    case "arrow-right":
      return <path d="M5 12h14M13 6l6 6-6 6" />;
    case "arrow-left":
      return <path d="M19 12H5M11 6l-6 6 6 6" />;
    case "arrow-up-right":
      return <path d="M7 17 17 7M8 7h9v9" />;
    case "mail":
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </>
      );
    case "whatsapp":
      return (
        <>
          <path d="M3.5 20.5 4.9 16a8.5 8.5 0 1 1 3.3 3.2z" />
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z" />
        </>
      );
    case "map-pin":
      return (
        <>
          <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      );
    case "home":
      return <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />;
    case "grid":
      return (
        <>
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
        </>
      );
    case "user":
      return (
        <>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.2-3.5 3.8-5.5 7-5.5s5.8 2 7 5.5" />
        </>
      );
    case "github":
      return (
        <path d="M9 19c-4 1.3-4-2-6-2.5m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.6 2.1 5.6 2.4 5.6 2.4a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 8.8c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" />
      );
    case "linkedin":
      return (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
        </>
      );
    case "download":
      return <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />;
    case "check":
      return <path d="m5 12 4.5 4.5L19 7" />;
  }
}
