import { emailUrl, phoneUrl, whatsAppUrl, type Profile } from "@/domain/profile/profile";
import { ButtonLink } from "@/ui/components/button-link";

type ContactActionsProps = {
  profile: Profile;
  /** Lighter buttons for dark backgrounds, like the footer. */
  isOnDark?: boolean;
};

// On phones: email across the full width, WhatsApp and Call side by side, all easy to tap.
export function ContactActions({ profile, isOnDark = false }: ContactActionsProps) {
  const { email, phone } = profile;
  const otherVariant = isOnDark ? "outline" : "secondary";

  return (
    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
      {email && (
        <div className="col-span-2 grid sm:block">
          <ButtonLink href={emailUrl(email)} variant={isOnDark ? "secondary" : "primary"} icon="arrow-up-right">
            Email me
          </ButtonLink>
        </div>
      )}
      {phone && (
        <div className="grid sm:block">
          <ButtonLink href={whatsAppUrl(phone)} variant={otherVariant} icon="whatsapp">
            WhatsApp
          </ButtonLink>
        </div>
      )}
      {phone && (
        <div className="grid sm:block">
          <ButtonLink href={phoneUrl(phone)} variant={otherVariant} icon="phone">
            Call
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
