type AvailabilityBadgeProps = {
  text: string;
};

/** "● Open to new opportunities", with a softly pulsing green dot. */
export function AvailabilityBadge({ text }: AvailabilityBadgeProps) {
  if (!text) return null;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-online/30 bg-online/10 px-3 py-1.5 text-sm text-online">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-online opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-online" />
      </span>
      {text}
    </span>
  );
}
