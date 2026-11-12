import type { Profile } from "@/domain/profile/profile";
import type { ProfileRepository } from "@/domain/profile/profile-repository";
import { profile } from "@/infrastructure/content/profile";
import { mapProfile } from "@/infrastructure/content/profile-mapper";

export class ContentProfileRepository implements ProfileRepository {
  async get(): Promise<Profile> {
    return mapProfile(profile);
  }
}
