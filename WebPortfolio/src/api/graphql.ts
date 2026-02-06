// // import { gql, request } from "graphql-request";
// // import { About, GetAboutResponse } from "../../../shared/types/about";
// // import { GetProjectResponse, Project } from "../../../shared/types/project";


// // // const endpoint = "https://zippy-vibrancy-production.up.railway.app/graphql";
// // const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

// // // Only read operation needed on client
// // export const getAbout = async (): Promise<About[]> => {
// //   const query = gql`
// //     query GetAbout {
// //       getAbout {
// //         id
// //         heading
// //         paragraph
// //         imageUrl
// //       }
// //     }
// //   `;
// //   const data = await request<GetAboutResponse>(endpoint, query);
// //   return data.getAbout;
// // };

// // export const getProject = async (): Promise<Project[]> => {
// //   const query = gql`
// //     query GetProjects {
// //       getProjects {
// //         id
// //         title
// //         description
// //         imageUrls
// //         techStack
// //         githubUrl
// //         liveUrl
// //       }
// //     }
// //   `;
// //   const data = await request<GetProjectResponse>(endpoint, query);
// //   return data.getProjects; // ✅ matches schema
// // };

// // export type { About, Project };

// import { About, GetAboutResponse } from "@/shared/types/about";
// import { GetProjectResponse, Project } from "@/shared/types/project";
// import { gql, request } from "graphql-request";

// // const endpoint = "https://zippy-vibrancy-production.up.railway.app/graphql";
// const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

// // Only read operation needed on client
// export const getAbout = async (): Promise<About[]> => {
//   const query = gql`
//     query GetAbout {
//       getAbout {
//         id
//         heading
//         paragraph
//         imageUrl
//       }
//     }
//   `;
//   const data = await request<GetAboutResponse>(endpoint, query);
//   return data.getAbout;
// };

// export const getProject = async (): Promise<Project[]> => {
//   const query = gql`
//     query GetProjects {
//       getProjects {
//         id
//         title
//         description
//         imageUrls
//         techStack
//         githubUrl
//         liveUrl
//       }
//     }
//   `;
//   const data = await request<GetProjectResponse>(endpoint, query);
//   return data.getProjects; // ✅ matches schema
// };

// export type { About, Project };
