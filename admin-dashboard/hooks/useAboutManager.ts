// /hooks/useAboutManager.ts
"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { AboutEntry } from "@/components/aboutComponents/aboutForm";
import {
  createAbout,
  deleteAbout,
  getAbout,
  updateAbout,
} from "../lib/graphql-client";

export function useAboutManager(itemsPerPage = 4) {
  const [entries, setEntries] = useState<AboutEntry[]>([]);
  const [editingData, setEditingData] = useState<AboutEntry | undefined>(
    undefined
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filter entries based on search term
  const filteredEntries = useMemo(() => {
    if (!searchTerm) return entries;

    return entries.filter((entry) =>
      entry.paragraph?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [entries, searchTerm]);

  // Paginate the filtered entries
  const paginated = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEntries.slice(startIndex, endIndex);
  }, [filteredEntries, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredEntries.length / itemsPerPage);
  }, [filteredEntries.length, itemsPerPage]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAbout();
        setEntries(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load About entries.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddOrEdit = async (entry: AboutEntry) => {
    try {
      if (entry.id) {
        // ✅ Only pass paragraph to updateAbout
        const updated = await updateAbout(entry.id, {
          paragraph: entry.paragraph,
        });
        setEntries((prev) =>
          prev.map((e) => (e.id === entry.id ? updated : e))
        );
      } else {
        // ✅ Only pass paragraph to createAbout
        const created = await createAbout({ paragraph: entry.paragraph });
        setEntries((prev) => [...prev, created]);
      }
      setEditingData(undefined);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save entry.");
    }
  };

  const handleEdit = (entry: AboutEntry) => {
    setEditingData(entry);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAbout(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
      toast.success("Deleted successfully");
      setCurrentPage((p) =>
        Math.min(p, Math.ceil((entries.length - 1) / itemsPerPage))
      );
      setEditingData(undefined);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete entry.");
    }
  };

  const cancelEdit = () => setEditingData(undefined);

  return {
    entries: paginated,
    allEntries: entries,
    filteredEntries,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    setCurrentPage,
    isLoading,
    isEditing: Boolean(editingData),
    editingData,
    handleAddOrEdit,
    handleEdit,
    handleDelete,
    cancelEdit,
  };
}
