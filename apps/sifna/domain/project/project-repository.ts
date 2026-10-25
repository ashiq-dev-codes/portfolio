import type { Project } from "@/domain/project/project";

export interface ProjectRepository {
  /** All projects that are ready to show, in display order. */
  getAll(): Promise<Project[]>;
}
