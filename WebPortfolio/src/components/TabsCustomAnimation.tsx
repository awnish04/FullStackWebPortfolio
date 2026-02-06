// "use client";

// import React, { useEffect, useState, ChangeEvent } from "react";
// import GlobalApi from "../lib/GlobalApi";

// import { motion } from "framer-motion";
// import { transition1 } from "../lib/transitions";
// import Lottie from "lottie-react";
// import animationData from "../images/notfoundAnimation.json";
// import { Github, View } from "lucide-react";
// import Image from "next/image";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Input } from "./ui/input";

// interface ProjectItem {
//   projectName: string;
//   image?: { url: string };
//   demoLink?: string;
//   github?: string;
//   tools?: { markdown?: string };
//   createdAt?: string;
//   updatedAt?: string;
//   type?: "project" | "mobile";
// }

// export default function TabsCustomAnimation() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [projects, setProjects] = useState<ProjectItem[]>([]);
//   const [mobiles, setMobiles] = useState<ProjectItem[]>([]);
//   const [selectedFilter, setSelectedFilter] = useState<
//     "all" | "projects" | "mobile"
//   >("all");
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const projectResult = await GlobalApi.getProject();
//         const mobileResult = await GlobalApi.getMobile();

//         const projects: ProjectItem[] = projectResult.projects
//           .map((project: ProjectItem) => ({
//             ...project,
//             type: "project",
//           }))
//           .sort(
//             (a: ProjectItem, b: ProjectItem) =>
//               new Date(b.updatedAt || b.createdAt || "").getTime() -
//               new Date(a.updatedAt || a.createdAt || "").getTime()
//           );

//         const mobiles: ProjectItem[] = mobileResult.mobiles
//           .map((mobile: ProjectItem) => ({
//             ...mobile,
//             type: "mobile",
//           }))
//           .sort(
//             (a: ProjectItem, b: ProjectItem) =>
//               new Date(b.updatedAt || b.createdAt || "").getTime() -
//               new Date(a.updatedAt || a.createdAt || "").getTime()
//           );

//         setProjects(projects);
//         setMobiles(mobiles);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleFilterChange = (filter: "all" | "projects" | "mobile") => {
//     setSelectedFilter(filter);
//   };

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredItems: ProjectItem[] =
//     selectedFilter === "projects"
//       ? projects.filter((project) =>
//           project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       : selectedFilter === "mobile"
//       ? mobiles.filter((mobile) =>
//           mobile.projectName.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       : [...projects, ...mobiles]
//           .sort(
//             (a, b) =>
//               new Date(b.updatedAt || b.createdAt || "").getTime() -
//               new Date(a.updatedAt || a.createdAt || "").getTime()
//           )
//           .filter((item) =>
//             item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
//           );

//   return (
//     <div>
//       {/* Filter + Search */}
//       <motion.div
//         initial={{ opacity: 0, y: "70%" }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: "40%" }}
//         transition={{ ...transition1, duration: 0.5 }}
//         className="justify-between items-center flex gap-4 pb-5"
//       >
//         {/* Filter dropdown (shadcn) */}
//         <div className="relative flex space-x-6 font-secondary">
//           <Select
//             value={selectedFilter}
//             onValueChange={(value: "all" | "projects" | "mobile") =>
//               handleFilterChange(value)
//             }
//           >
//             <SelectTrigger className="w-[180px] bg-white text-gray-900 border border-gray-300">
//               <SelectValue placeholder="Filter Projects" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup className="font-secondary">
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="projects">Web</SelectItem>
//                 <SelectItem value="mobile">Mobile</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Search bar (shadcn input) */}
//         <div className="w-full max-w-xs">
//           <Input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="bg-white text-gray-900 border border-gray-300 font-secondary"
//           />
//         </div>
//       </motion.div>

//       {/* Content */}
//       <div>
//         {loading ? (
//           <div className="flex justify-center items-center h-screen">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
//           </div>
//         ) : filteredItems.length === 0 ? (
//           <div className="flex flex-col justify-center items-center h-full">
//             <Lottie
//               animationData={animationData}
//               loop={true}
//               autoplay={true}
//               className="mx-auto w-60 opacity-35 lg:opacity-100"
//             />
//             <p className="font-secondary text-white font-semibold">
//               No results found.
//             </p>
//           </div>
//         ) : (
//           <motion.div
//             key={selectedFilter}
//             initial={{ opacity: 0, y: "70%" }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: "40%" }}
//             transition={{ ...transition1, duration: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
//           >
//             {filteredItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-[#1c2342] shadow-sm hover:shadow-[#1c2342] group cursor-pointer rounded-lg p-4 space-y-4"
//               >
//                 <div className="rounded-lg relative">
//                   {item.image?.url && (
//                     <Image
//                       width={500}
//                       height={500}
//                       className="h-full w-full lg:h-44 rounded-lg"
//                       src={item.image.url}
//                       alt={`project-${index}`}
//                     />
//                   )}
//                   <div className="opacity-0 group-hover:opacity-100 transition-all absolute w-full px-6 -bottom-10 group-hover:bottom-5">
//                     <div className="flex gap-x-6 justify-center">
//                       {item.demoLink && (
//                         <a
//                           href={item.demoLink}
//                           className="rounded-full flex items-center justify-center bg-[#EC565A] shadow-sm p-2 hover:scale-110 transition"
//                         >
//                           <View className="w-6 h-6 text-white" />
//                         </a>
//                       )}
//                       {item.github && (
//                         <a
//                           href={item.github}
//                           className="rounded-full flex items-center justify-center bg-[#EC565A] shadow-sm p-2 hover:scale-110 transition"
//                         >
//                           <Github className="w-6 h-6 text-white" />
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="font-secondary font-semibold text-lg text-white">
//                     {item.projectName}
//                   </p>
//                   <ul className="flex flex-wrap font-medium">
//                     {item?.tools?.markdown
//                       ?.split("\n")
//                       .filter((tool) => tool.trim() !== "")
//                       .map((tool, toolIndex) => (
//                         <li
//                           key={toolIndex}
//                           className="font-secondary flex items-center text-xs lg:text-xs uppercase text-white relative mr-2 my-1"
//                         >
//                           <span className="bg-[#101630] px-2 rounded-lg inline-block">
//                             {tool.trim()}
//                           </span>
//                         </li>
//                       ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useState, ChangeEvent } from "react";
// import { motion } from "framer-motion";
// import { transition1 } from "../lib/transitions";
// import Lottie from "lottie-react";
// import animationData from "../images/notfoundAnimation.json";
// import { Github, View } from "lucide-react";
// import Image from "next/image";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Input } from "./ui/input";

// import {
//   getProject as fetchProjects,
//   Project as GraphQLProject,
// } from "@/api/graphql";

// interface ProjectItem {
//   projectName: string;
//   image?: { url: string };
//   demoLink?: string;
//   github?: string;
//   tools?: { markdown?: string };
//   createdAt?: string;
//   updatedAt?: string;
//   type?: "project" | "mobile";
// }

// export default function TabsCustomAnimation() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const [projects, setProjects] = useState<ProjectItem[]>([]);
//   const [mobiles, setMobiles] = useState<ProjectItem[]>([]);
//   const [selectedFilter, setSelectedFilter] = useState<
//     "all" | "projects" | "mobile"
//   >("all");
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const projectResult: GraphQLProject[] = await fetchProjects();

//         const mappedProjects: ProjectItem[] = projectResult.map((p) => ({
//           projectName: p.title,
//           image:
//             p.imageUrls && p.imageUrls.length > 0
//               ? { url: p.imageUrls[0] }
//               : undefined,
//           demoLink: p.liveUrl,
//           github: p.githubUrl,
//           tools: p.techStack ? { markdown: p.techStack.join("\n") } : undefined,
//           type: "project",
//         }));

//         const mappedMobiles: ProjectItem[] = mappedProjects
//           .filter((p) => p.projectName.toLowerCase().includes("mobile"))
//           .map((p) => ({ ...p, type: "mobile" }));

//         setProjects(mappedProjects);
//         setMobiles(mappedMobiles);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);


//   const handleFilterChange = (filter: "all" | "projects" | "mobile") => {
//     setSelectedFilter(filter);
//   };

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredItems: ProjectItem[] =
//     selectedFilter === "projects"
//       ? projects.filter((project) =>
//           project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       : selectedFilter === "mobile"
//       ? mobiles.filter((mobile) =>
//           mobile.projectName.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       : [...projects, ...mobiles].filter((item) =>
//           item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
//         );

//   return (
//     <div>
//       {/* Filter + Search */}
//       <motion.div
//         initial={{ opacity: 0, y: "70%" }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: "40%" }}
//         transition={{ ...transition1, duration: 0.5 }}
//         className="justify-between items-center flex gap-4 pb-5"
//       >
//         {/* Filter dropdown (shadcn) */}
//         <div className="relative flex space-x-6 font-secondary">
//           <Select
//             value={selectedFilter}
//             onValueChange={(value: "all" | "projects" | "mobile") =>
//               handleFilterChange(value)
//             }
//           >
//             <SelectTrigger className="w-[180px] bg-white text-gray-900 border border-gray-300">
//               <SelectValue placeholder="Filter Projects" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup className="font-secondary">
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="projects">Web</SelectItem>
//                 <SelectItem value="mobile">Mobile</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Search bar (shadcn input) */}
//         <div className="w-full max-w-xs">
//           <Input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="bg-white text-gray-900 border border-gray-300 font-secondary"
//           />
//         </div>
//       </motion.div>

//       {/* Content */}
//       <div>
//         {loading ? (
//           <div className="flex justify-center items-center h-screen">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
//           </div>
//         ) : filteredItems.length === 0 ? (
//           <div className="flex flex-col justify-center items-center h-full">
//             <Lottie
//               animationData={animationData}
//               loop={true}
//               autoplay={true}
//               className="mx-auto w-60 opacity-35 lg:opacity-100"
//             />
//             <p className="font-secondary text-white font-semibold">
//               No results found.
//             </p>
//           </div>
//         ) : (
//           <motion.div
//             key={selectedFilter}
//             initial={{ opacity: 0, y: "70%" }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: "40%" }}
//             transition={{ ...transition1, duration: 0.5 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
//           >
//             {filteredItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-[#1c2342] shadow-sm hover:shadow-[#1c2342] group cursor-pointer rounded-lg p-4 space-y-4"
//               >
//                 <div className="rounded-lg relative">
//                   {item.image?.url && (
//                     <Image
//                       width={500}
//                       height={500}
//                       className="h-full w-full lg:h-44 rounded-lg"
//                       src={item.image.url}
//                       alt={`project-${index}`}
//                     />
//                   )}
//                   <div className="opacity-0 group-hover:opacity-100 transition-all absolute w-full px-6 -bottom-10 group-hover:bottom-5">
//                     <div className="flex gap-x-6 justify-center">
//                       {item.demoLink && (
//                         <a
//                           href={item.demoLink}
//                           className="rounded-full flex items-center justify-center bg-[#EC565A] shadow-sm p-2 hover:scale-110 transition"
//                         >
//                           <View className="w-6 h-6 text-white" />
//                         </a>
//                       )}
//                       {item.github && (
//                         <a
//                           href={item.github}
//                           className="rounded-full flex items-center justify-center bg-[#EC565A] shadow-sm p-2 hover:scale-110 transition"
//                         >
//                           <Github className="w-6 h-6 text-white" />
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="font-secondary font-semibold text-lg text-white">
//                     {item.projectName}
//                   </p>
//                   <ul className="flex flex-wrap font-medium">
//                     {item?.tools?.markdown
//                       ?.split("\n")
//                       .filter((tool) => tool.trim() !== "")
//                       .map((tool, toolIndex) => (
//                         <li
//                           key={toolIndex}
//                           className="font-secondary flex items-center text-xs lg:text-xs uppercase text-white relative mr-2 my-1"
//                         >
//                           <span className="bg-[#101630] px-2 rounded-lg inline-block">
//                             {tool.trim()}
//                           </span>
//                         </li>
//                       ))}
//                   </ul>
//                 </div>
//               </div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { transition1 } from "../lib/transitions";
import Lottie from "lottie-react";
import animationData from "../images/notfoundAnimation.json";
import { Github, View } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import GlobalApi from "@/lib/GlobalApi";

interface ProjectItem {
  projectName: string;
  image?: { url: string };
  demoLink?: string;
  github?: string;
  tools?: { markdown?: string };
  createdAt?: string;
  updatedAt?: string;
  type?: "project" | "mobile";
}

// Define the local project type to match your GraphQL schema
interface LocalProject {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

export default function TabsCustomAnimation() {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [mobiles, setMobiles] = useState<ProjectItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "projects" | "mobile"
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Use GlobalApi instead of the deleted graphql.ts file
        const response = await GlobalApi.getProject();

        // Response structure: { getProjects: [...] }
        const projectResult: LocalProject[] = response?.getProjects ?? [];

        const mappedProjects: ProjectItem[] = projectResult.map((p) => ({
          projectName: p.title,
          image:
            p.imageUrls && p.imageUrls.length > 0
              ? { url: p.imageUrls[0] }
              : undefined,
          demoLink: p.liveUrl,
          github: p.githubUrl,
          tools: p.techStack ? { markdown: p.techStack.join(", ") } : undefined,
          type: "project",
        }));

        const mappedMobiles: ProjectItem[] = mappedProjects
          .filter((p) => p.projectName.toLowerCase().includes("mobile"))
          .map((p) => ({ ...p, type: "mobile" }));

        setProjects(mappedProjects);
        setMobiles(mappedMobiles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filter: "all" | "projects" | "mobile") => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems: ProjectItem[] =
    selectedFilter === "projects"
      ? projects.filter((project) =>
          project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : selectedFilter === "mobile"
      ? mobiles.filter((mobile) =>
          mobile.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [...projects, ...mobiles].filter((item) =>
          item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <div>
      {/* Filter + Search */}
      <motion.div
        initial={{ opacity: 0, y: "70%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "40%" }}
        transition={{ ...transition1, duration: 0.5 }}
        className="justify-between items-center flex gap-4 pb-5"
      >
        {/* Filter dropdown (shadcn) */}
        <div className="relative flex space-x-6 font-secondary">
          <Select
            value={selectedFilter}
            onValueChange={(value: "all" | "projects" | "mobile") =>
              handleFilterChange(value)
            }
          >
            <SelectTrigger className="w-[180px] bg-white text-gray-900 border border-gray-300">
              <SelectValue placeholder="Filter Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="font-secondary">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="projects">Web</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Search bar (shadcn input) */}
        <div className="w-full max-w-xs">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-white text-gray-900 border border-gray-300 font-secondary"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              className="mx-auto w-60 opacity-35 lg:opacity-100"
            />
            <p className="font-secondary text-white font-semibold">
              No results found.
            </p>
          </div>
        ) : (
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: "70%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "40%" }}
            transition={{ ...transition1, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#1c2342] shadow-sm hover:shadow-[#1c2342] group cursor-pointer rounded-lg p-4 space-y-4"
              >
                <div className="rounded-lg relative">
                  {item.image?.url && (
                    <Image
                      width={500}
                      height={500}
                      className="h-full w-full lg:h-44 rounded-lg"
                      src={item.image.url}
                      alt={`project-${index}`}
                    />
                  )}
                  <div className="opacity-0 group-hover:opacity-100 transition-all absolute w-full px-6 -bottom-10 group-hover:bottom-5">
                    <div className="flex gap-x-6 justify-center">
                      {item.demoLink && (
                        <a
                          href={item.demoLink}
                          className="rounded-full flex items-center justify-center bg-[#EC565A] shadow-sm p-2 hover:scale-110 transition"
                        >
                          <View className="w-6 h-6 text-white" />
                        </a>
                      )}
                      {item.github && (
                        <a
                          href={item.github}
                          className="rounded-full flex items-center justify-center bg-[#EC565A] shadow-sm p-2 hover:scale-110 transition"
                        >
                          <Github className="w-6 h-6 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-secondary font-semibold text-lg text-white">
                    {item.projectName}
                  </p>
                  <ul className="flex flex-wrap font-medium">
                    {item?.tools?.markdown
                      ?.split(",") // Changed from \n to , since we're joining with comma
                      .filter((tool) => tool.trim() !== "")
                      .map((tool, toolIndex) => (
                        <li
                          key={toolIndex}
                          className="font-secondary flex items-center text-xs lg:text-xs uppercase text-white relative mr-2 my-1"
                        >
                          <span className="bg-[#101630] px-2 rounded-lg inline-block">
                            {tool.trim()}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}