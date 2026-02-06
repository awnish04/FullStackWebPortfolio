// hooks/useProjectManager.ts
"use client";

import { useEffect, useState, useMemo } from "react";
import { ProjectEntry } from "@/components/projectsComponents/ProjectForm";
import { toast } from "sonner";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/lib/graphql-client";

export function useProjectManager(itemsPerPage = 3) {
  const [entries, setEntries] = useState<ProjectEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<ProjectEntry | undefined>(
    undefined,
  );
  // const [editingEntry, setEditingEntry] = useState<ProjectEntry | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [entries, searchTerm]);

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEntries.slice(start, start + itemsPerPage);
  }, [filteredEntries, currentPage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects();
        setEntries(data);
      } catch (error) {
        console.error("Failed to load project data", error);
        toast.error("Failed to load project data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddOrEdit = async (entry: ProjectEntry) => {
    try {
      if (entry.id) {
        const updated = await updateProject(entry.id, entry);
        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? updated : e)),
        );
      } else {
        const created = await createProject(entry);
        setEntries((prev) => [...prev, created]);
      }
      setEditingEntry(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (entry: ProjectEntry) => {
    setEditingEntry(entry);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Failed to delete.");
      console.error(err);
    }
  };

  return {
    entries: paginatedEntries,
    allEntries: entries,
    editingEntry,
    isEditing: Boolean(editingEntry),
    isLoading,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    handleAddOrEdit,
    handleEdit,
    handleDelete,
    cancelEdit: () => setEditingEntry(undefined),
  };
}
