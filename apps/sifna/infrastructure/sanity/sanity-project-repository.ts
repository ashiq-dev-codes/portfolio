import { sortProjects, type Project } from "@/domain/project/project";
import type { ProjectRepository } from "@/domain/project/project-repository";
import { mapProject, projectProjection, type RawProject } from "@/infrastructure/sanity/project-mapper";
import { sanityClient } from "@/infrastructure/sanity/sanity-client";

const projectsQuery = `*[_type == "project"]${projectProjection}`;

export class SanityProjectRepository implements ProjectRepository {
  async getAll(): Promise<Project[]> {
    const rawProjects = await sanityClient.fetch<RawProject[]>(projectsQuery);
    const projects = rawProjects
      .map(mapProject)
      .filter((project): project is Project => project !== null);
    return sortProjects(projects);
  }
}
