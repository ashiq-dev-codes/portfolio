import { createClient } from "@sanity/client";

// The dataset is public, so no token. Builds skip the CDN so a rebuild right after Sifna
// publishes never gets a cached, older copy; `next dev` uses it because it answers faster.
export const sanityClient = createClient({
  projectId: "dfjdl2zn",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: process.env.NODE_ENV === "development",
});
