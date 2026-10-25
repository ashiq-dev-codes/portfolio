import type { Profile } from "@/domain/profile/profile";
import type { ProfileRepository } from "@/domain/profile/profile-repository";
import { mapProfile, profileProjection, type RawProfile } from "@/infrastructure/sanity/profile-mapper";
import { sanityClient } from "@/infrastructure/sanity/sanity-client";

const profileQuery = `*[_id == "profile"][0]${profileProjection}`;

export class SanityProfileRepository implements ProfileRepository {
  async get(): Promise<Profile> {
    const rawProfile = await sanityClient.fetch<RawProfile | null>(profileQuery);
    if (!rawProfile) throw new Error("The profile is missing in Sanity. Publish it in Studio.");
    return mapProfile(rawProfile);
  }
}
