import { sortProjects, type Project } from "@/domain/project/project";
import type { ProjectRepository } from "@/domain/project/project-repository";
import { mapProject } from "@/infrastructure/content/project-mapper";
import { projects } from "@/infrastructure/content/projects";

export class ContentProjectRepository implements ProjectRepository {
  async getAll(): Promise<Project[]> {
    return sortProjects(projects.map((rawProject, order) => mapProject(rawProject, order)));
  }
}
