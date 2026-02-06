"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProjectSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function ProjectSearchBar({
  searchTerm,
  setSearchTerm,
}: ProjectSearchBarProps) {
  return (
    <div className="p-2 pb-0">
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-500 dark:text-gray-400" />
        <Input
          placeholder="Search projects by title or tech stack..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
