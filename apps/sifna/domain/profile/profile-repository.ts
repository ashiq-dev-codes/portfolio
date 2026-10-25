import type { Profile } from "@/domain/profile/profile";

export interface ProfileRepository {
  /** Sifna's profile. Throws if it was never published, so the build fails instead of going empty. */
  get(): Promise<Profile>;
}
