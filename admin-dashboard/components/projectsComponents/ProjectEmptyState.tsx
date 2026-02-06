"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { SearchX } from "lucide-react";

interface ProjectEmptyStateProps {
  colSpan: number;
}

export default function ProjectEmptyState({ colSpan }: ProjectEmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center py-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <SearchX className="w-10 h-10 mb-4" />
            <p className="text-lg font-semibold">Nothing found</p>
            <p className="text-sm">
              Try adjusting your search keywords.No projects found for this
              search.
            </p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
