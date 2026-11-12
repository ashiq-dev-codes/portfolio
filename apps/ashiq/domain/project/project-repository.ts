import type { Project } from "@/domain/project/project";

export interface ProjectRepository {
  /** All projects, in display order. */
  getAll(): Promise<Project[]>;
}
