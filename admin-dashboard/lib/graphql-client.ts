import { gql, request } from "graphql-request";
import { About, GetAboutResponse } from "@/shared/types/about";
import { GetProjectResponse, Project } from "@/shared/types/project";
import {
  GetSkillResponse,
  CreateSkillInput,
  Skill,
} from "@/shared/types/skill";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

// =============================================
// ✅ ABOUT SECTION - QUERIES & MUTATIONS
// =============================================

// ✅ Get all About entries
export const getAbout = async (): Promise<About[]> => {
  const query = gql`
    query GetAbout {
      getAbout {
        id
        paragraph
      }
    }
  `;

  try {
    const data = await request<GetAboutResponse>(endpoint, query);
    return data.getAbout;
  } catch (error) {
    console.error("Error fetching about entries:", error);
    throw error;
  }
};

// ✅ Create new About entry
export const createAbout = async (data: {
  paragraph: string;
}): Promise<About> => {
  const mutation = gql`
    mutation CreateAbout($paragraph: String!) {
      createAbout(paragraph: $paragraph) {
        id
        paragraph
      }
    }
  `;

  try {
    const res = await request<{ createAbout: About }>(endpoint, mutation, data);
    return res.createAbout;
  } catch (error) {
    console.error("Error creating about entry:", error);
    throw error;
  }
};

// ✅ Update About entry
export const updateAbout = async (
  id: string,
  data: { paragraph: string } // ✅ Only paragraph, no heading or imageUrl
): Promise<About> => {
  const mutation = gql`
    mutation UpdateAbout($id: ID!, $paragraph: String!) {
      updateAbout(id: $id, paragraph: $paragraph) {
        id
        paragraph
      }
    }
  `;

  const variables = { id, paragraph: data.paragraph };

  try {
    const res = await request<{ updateAbout: About }>(
      endpoint,
      mutation,
      variables
    );
    return res.updateAbout;
  } catch (error) {
    console.error("Error updating about entry:", error);
    throw error;
  }
};

// ✅ Delete About entry
export const deleteAbout = async (id: string): Promise<void> => {
  const mutation = gql`
    mutation DeleteAbout($id: ID!) {
      deleteAbout(id: $id) {
        id
      }
    }
  `;

  try {
    await request<{ deleteAbout: { id: string } }>(endpoint, mutation, { id });
  } catch (error) {
    console.error("Error deleting about entry:", error);
    throw error;
  }
};

// =============================================
// ✅ PROJECT SECTION - QUERIES & MUTATIONS
// =============================================

// ✅ Get all Project Entries
export const getProjects = async () => {
  const query = gql`
    query {
      getProjects {
        id
        title
        description
        imageUrls
        techStack
        githubUrl
        liveUrl
      }
    }
  `;
  const res = await request<GetProjectResponse>(endpoint, query);
  return res.getProjects;
};

// ✅ Create new Project entry
export const createProject = async (
  data: Omit<Project, "id">
): Promise<Project> => {
  const mutation = gql`
    mutation CreateProject(
      $title: String!
      $description: String!
      $imageUrls: [String!]!
      $techStack: [String!]!
      $githubUrl: String!
      $liveUrl: String!
    ) {
      createProject(
        title: $title
        description: $description
        imageUrls: $imageUrls
        techStack: $techStack
        githubUrl: $githubUrl
        liveUrl: $liveUrl
      ) {
        id
        title
        description
        imageUrls
        techStack
        githubUrl
        liveUrl
      }
    }
  `;

  const res = await request<{ createProject: Project }>(
    endpoint,
    mutation,
    data
  );
  return res.createProject;
};

// ✅ Update Project entry
export const updateProject = async (
  id: string,
  data: Omit<Project, "id">
): Promise<Project> => {
  const mutation = gql`
    mutation UpdateProject(
      $id: ID!
      $title: String!
      $description: String!
      $imageUrls: [String!]!
      $techStack: [String!]!
      $githubUrl: String!
      $liveUrl: String!
    ) {
      updateProject(
        id: $id
        title: $title
        description: $description
        imageUrls: $imageUrls
        techStack: $techStack
        githubUrl: $githubUrl
        liveUrl: $liveUrl
      ) {
        id
        title
        description
        imageUrls
        techStack
        githubUrl
        liveUrl
      }
    }
  `;

  const variables = { id, ...data };
  const res = await request<{ updateProject: Project }>(
    endpoint,
    mutation,
    variables
  );
  return res.updateProject;
};

// ✅ Delete Project entry
export const deleteProject = async (id: string): Promise<void> => {
  const mutation = gql`
    mutation DeleteProject($id: ID!) {
      deleteProject(id: $id) {
        id
      }
    }
  `;

  try {
    await request<{ deleteProject: { id: string } }>(endpoint, mutation, {
      id,
    });
  } catch (error) {
    console.error("Error deleting project entry:", error);
    throw error;
  }
};

// =============================================
// ✅ SKILLS SECTION - QUERIES & MUTATIONS
// =============================================

// ✅ Get all Skills
export const getSkills = async (): Promise<Skill[]> => {
  const query = gql`
    query GetSkills {
      getSkills {
        id
        name
        imageUrl
      }
    }
  `;

  try {
    const data = await request<GetSkillResponse>(endpoint, query);
    return data.getSkills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
};

// ✅ Create new Skill
export const createSkill = async (data: CreateSkillInput): Promise<Skill> => {
  const mutation = gql`
    mutation CreateSkill($name: String!, $imageUrl: String!) {
      createSkill(name: $name, imageUrl: $imageUrl) {
        id
        name
        imageUrl
      }
    }
  `;

  try {
    const res = await request<{ createSkill: Skill }>(endpoint, mutation, data);
    return res.createSkill;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
};

// ✅ Update Skill
export const updateSkill = async (
  id: string,
  data: { name: string; imageUrl: string }
): Promise<Skill> => {
  const mutation = gql`
    mutation UpdateSkill($id: ID!, $name: String!, $imageUrl: String!) {
      updateSkill(id: $id, name: $name, imageUrl: $imageUrl) {
        id
        name
        imageUrl
      }
    }
  `;

  const variables = { id, ...data };

  try {
    const res = await request<{ updateSkill: Skill }>(
      endpoint,
      mutation,
      variables
    );
    return res.updateSkill;
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
};

// ✅ Delete Skill
export const deleteSkill = async (id: string): Promise<void> => {
  const mutation = gql`
    mutation DeleteSkill($id: ID!) {
      deleteSkill(id: $id) {
        id
      }
    }
  `;

  try {
    await request<{ deleteSkill: { id: string } }>(endpoint, mutation, { id });
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
};
