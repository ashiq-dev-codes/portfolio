import { cache } from "react";
import { sortProjects, type Project } from "@/domain/project/project";
import type { ProjectRepository } from "@/domain/project/project-repository";
import { mapProject, projectProjection, type RawProject } from "@/infrastructure/sanity/project-mapper";
import { inPublishedOrder } from "@/infrastructure/sanity/published-order";
import { sanityClient } from "@/infrastructure/sanity/sanity-client";

type RawProjectList = {
  projects: RawProject[];
  publishedIds: string[] | null;
};

// Projects in Studio order (orderRank), plus the order Sifna last published with "Publish order".
const projectsQuery = `{
  "projects": *[_type == "project"] | order(orderRank asc)${projectProjection},
  "publishedIds": *[_id == "workOrder"][0].workIds
}`;

export class SanityProjectRepository implements ProjectRepository {
  // cache() shares one fetch between the metadata and page of the same render.
  getAll = cache(async (): Promise<Project[]> => {
    const { projects: rawProjects, publishedIds } = await sanityClient.fetch<RawProjectList>(projectsQuery);
    const projects = inPublishedOrder(rawProjects, publishedIds ?? [])
      .map((rawProject, position) => mapProject(rawProject, position))
      .filter((project): project is Project => project !== null);
    return sortProjects(projects);
  });
}
