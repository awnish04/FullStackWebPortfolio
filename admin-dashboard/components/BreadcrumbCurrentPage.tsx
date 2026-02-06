"use client";

import { usePathname } from "next/navigation";
import { BreadcrumbPage } from "@/components/ui/breadcrumb";

// Map of paths to readable titles
const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/about": "About",
  "/dashboard/skills": "Skills",
  "/dashboard/projects": "Projects",
  "/dashboard/settings": "Settings",
};

export default function BreadcrumbCurrentPage() {
  const pathname = usePathname();

  if (!pathname) return <BreadcrumbPage>Loading...</BreadcrumbPage>;

  const title = pageTitles[pathname] || "Page";

  return <BreadcrumbPage>{title}</BreadcrumbPage>;
}
