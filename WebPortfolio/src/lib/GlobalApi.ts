import { request, gql } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;
console.log("GRAPHQL ENDPOINT:", endpoint);

const getAbout = async () => {
  const query = gql`
    query GetAbout {
      getAbout {
        id
        paragraph
      }
    }
  `;
  const result = await request(endpoint, query);
  return result;
};

// const getPdf = async () => {
//   const query = gql`
//     query GetPdf {
//       pdfs {
//         pdfLink
//       }
//     }
//   `;
//   const result = await request(endpoint, query);
//   return result;
// };

const getProject = async () => {
  const query = gql`
    query GetProjects {
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
  const result = await request(endpoint, query);
  return result;
};

const getMobile = async () => {
  const query = gql`
    query GetMobile {
      mobiles {
        id
        github
        demoLink
        projectName
        image {
          url
        }
        tools {
          markdown
        }
        createdAt
        updatedAt
      }
    }
  `;
  const result = await request(endpoint, query);
  return result;
};

const getSkill = async () => {
  const query = gql`
    query GetSkills {
      getSkills {
        id
        name
        imageUrl
      }
    }
  `;
  const result = await request(endpoint, query);
  return result;
};
const GlobalApi = {
  getAbout,
  getProject,
  getMobile,
  getSkill,
  // getPdf,
};

export default GlobalApi;
