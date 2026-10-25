import { createClient } from "@sanity/client";

// The dataset is public, so no token. The CDN is off so a rebuild right after Sifna publishes
// never picks up a cached, older copy of her work.
export const sanityClient = createClient({
  projectId: "dfjdl2zn",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});
