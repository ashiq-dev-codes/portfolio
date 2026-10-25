import { emailUrl, phoneUrl, whatsAppUrl, type Profile } from "@/domain/profile/profile";
import { ButtonLink } from "@/ui/components/button-link";

type ContactActionsProps = {
  profile: Profile;
  /** Lighter buttons for dark backgrounds, like the footer. */
  isOnDark?: boolean;
};

export function ContactActions({ profile, isOnDark = false }: ContactActionsProps) {
  const { email, phone } = profile;
  const otherVariant = isOnDark ? "outline" : "secondary";

  return (
    <div className="flex flex-wrap gap-3">
      {email && (
        <ButtonLink href={emailUrl(email)} variant={isOnDark ? "secondary" : "primary"} icon="arrow-up-right">
          Email me
        </ButtonLink>
      )}
      {phone && (
        <ButtonLink href={whatsAppUrl(phone)} variant={otherVariant} icon="whatsapp">
          WhatsApp
        </ButtonLink>
      )}
      {phone && (
        <ButtonLink href={phoneUrl(phone)} variant={otherVariant} icon="phone">
          Call
        </ButtonLink>
      )}
    </div>
  );
}
