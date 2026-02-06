// shared/types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface GetProjectResponse {
    getProjects: Project[];
    
}
