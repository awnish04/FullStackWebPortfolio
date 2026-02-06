/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type TechStackSelectorProps = {
  form: {
    techStack: string[];
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

const availableTech = [
  // Frontend
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Svelte",
  "Solid.js",
  "Preact",
  "Alpine.js",
  "Tailwind CSS",
  "ShadCN",
  "Chakra UI",
  "Material‑UI",
  "Ant Design",
  "Bootstrap",
  "Redux",
  "Zustand",
  "MobX",
  "Recoil",
  "Emotion",
  "Styled Components",
  "Framer Motion",

  // Backend
  "Python", // added
  "Django",
  "Flask",
  "FastAPI",
  "Node.js",
  "Express.js",
  "Fastify",
  "Koa.js",
  "Next.js API Routes",
  "NestJS",
  "Ruby on Rails",
  "Spring Boot",
  "PHP",
  "Laravel",
  "Symfony",
  "Go",
  "Rust",

  // Databases
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "Firebase",
  "Supabase",
  "Prisma",
  "Redis",
  "RedisJSON",
  "CockroachDB",
  "PlanetScale",
  "FaunaDB",
  "DynamoDB",
  "Neo4j",
  "ArangoDB",
  "Elasticsearch",
  "TimescaleDB",

  // Auth & Security
  "JWT",
  "NextAuth",
  "OAuth",
  "Clerk",
  "Auth0",
  "Okta",
  "Keycloak",
  "Argon2",
  "Bcrypt",
  "Firebase Auth",
  "Supabase Auth",
  "SAML",
  "OpenID Connect",
  "OWASP Top10",

  // APIs & Data
  "GraphQL",
  "REST",
  "Apollo Client",
  "tRPC",
  "Axios",
  "SWR",
  "React Query",
  "gRPC",
  "WebSocket",
  "Realtime Database",
  "OpenAPI/Swagger",
  "Kafka",
  "RabbitMQ",

  // DevOps & Hosting
  "Docker",
  "Kubernetes",
  "Helm",
  "Terraform",
  "Pulumi",
  "AWS",
  "AWS Lambda",
  "Azure",
  "Google Cloud",
  "Vercel",
  "Netlify",
  "Netlify Functions",
  "Render",
  "Heroku",
  "Railway",
  "Cloudflare Workers",
  "GitHub Actions",
  "CircleCI",
  "Jenkins",

  // CMS / Content
  "Sanity",
  "Strapi",
  "Hygraph",
  "Contentful",
  "Ghost",
  "WordPress (Headless)",
  "DatoCMS",
  "Netlify CMS",
  "Directus",
  "Keystone.js",

  // Storage & Media
  "Cloudinary",
  "Amazon S3",
  "UploadThing",
  "Firebase Storage",
  "MinIO",
  "Supabase Storage",

  // Testing / QA / Tools / Utilities
  "ESLint",
  "Prettier",
  "Jest",
  "Mocha",
  "Chai",
  "Playwright",
  "Vitest",
  "Cypress",
  "TestCafe",
  "Puppeteer",
  "Storybook",
  "Figma",
  "Webpack",
  "Babel",
  "TurboRepo",
  "Nx",
  "Lerna",
  "Rollup",
  "Snowpack",
  "Vite",
  "Husky",
  "Commitlint",
  "Postman",

  // Emerging / AI / Edge
  "TensorFlow",
  "PyTorch",
  "LangChain",
  "OpenAI API",
  "Stable Diffusion",
  "Edge Functions",
  "Ray",
  "WebAssembly",
];

export default function TechStackSelector({
  form,
  setForm,
}: TechStackSelectorProps) {
  const [search, setSearch] = useState("");

  const filteredTech = availableTech.filter((tech) =>
    tech.toLowerCase().includes(search.toLowerCase())
  );

  const toggleTech = (tech: string, checked?: boolean) => {
    if (checked) {
      setForm((prev: any) => ({
        ...prev,
        techStack: [...prev.techStack, tech],
      }));
      setSearch(""); // ✅ Clear search input
    } else {
      setForm((prev: any) => ({
        ...prev,
        techStack: prev.techStack.filter((t: string) => t !== tech),
      }));
    }
  };

  return (
    <div className="w-full">
      <Label>
        Tech Stack
        <span className=" space-x-2 ml-4">
          {form.techStack.length ? `${form.techStack.length} selected` : ""}
        </span>
      </Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex-wrap justify-start h-full gap-2"
          >
            {form.techStack.length > 0 ? (
              form.techStack.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {tech}
                  <span
                    // type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTech(tech, false);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </span>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Select tech stack</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <Input
            placeholder="Search tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 sticky top-0 z-10 bg-background"
          />
          <div className="max-h-48 overflow-y-auto pr-1 flex flex-col gap-2">
            {filteredTech.map((tech) => (
              <div key={tech} className="flex items-center space-x-2">
                <Checkbox
                  id={tech}
                  checked={form.techStack.includes(tech)}
                  onCheckedChange={(checked) =>
                    toggleTech(tech, checked as boolean)
                  }
                />
                <label htmlFor={tech} className="text-sm">
                  {tech}
                </label>
              </div>
            ))}
            {filteredTech.length === 0 && (
              <p className="text-xs text-muted-foreground text-center">
                No results found.
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
