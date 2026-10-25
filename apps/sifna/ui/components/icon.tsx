export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-right"
  | "mail"
  | "whatsapp"
  | "phone"
  | "map-pin";

type IconProps = {
  name: IconName;
  className?: string;
};

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
    case "phone":
      return (
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
      );
    case "map-pin":
      return (
        <>
          <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      );
  }
}
