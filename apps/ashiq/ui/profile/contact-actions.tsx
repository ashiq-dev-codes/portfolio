import { emailUrl, whatsAppUrl, type Profile } from "@/domain/profile/profile";
import { ButtonLink } from "@/ui/components/button-link";

type ContactActionsProps = {
  profile: Profile;
};

// On phones: email across the full width, then WhatsApp and the CV side by side
// (WhatsApp takes the full width while there's no CV to download).
export function ContactActions({ profile }: ContactActionsProps) {
  const { email, whatsApp, cvUrl } = profile;

  return (
    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
      <div className="col-span-2 grid sm:block">
        <ButtonLink href={emailUrl(email)} icon="arrow-up-right">
          Email me
        </ButtonLink>
      </div>
      {whatsApp && (
        <div className={`grid sm:block ${cvUrl ? "" : "col-span-2"}`}>
          <ButtonLink href={whatsAppUrl(whatsApp)} variant="secondary" icon="whatsapp">
            WhatsApp
          </ButtonLink>
        </div>
      )}
      {cvUrl && (
        <div className="grid sm:block">
          <ButtonLink href={cvUrl} variant="secondary" icon="download" isDownload>
            CV
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
