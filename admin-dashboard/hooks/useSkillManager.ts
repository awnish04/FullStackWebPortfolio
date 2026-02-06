"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "@/lib/graphql-client";
import { SkillEntry } from "@/components/skillsComponents/SkillForm";



export function useSkillManager(itemsPerPage = 4) {
  const [skills, setSkills] = useState<SkillEntry[]>([]);
  const [editingData, setEditingData] = useState<SkillEntry | undefined>(
    undefined
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Filter by skill name
  const filtered = useMemo(
    () =>
      skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [skills, searchTerm]
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filtered, currentPage, itemsPerPage]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSkills();
        // Convert Skill[] to SkillEntry[] - they are compatible
        setSkills(data as SkillEntry[]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load skills.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddOrEdit = async (skill: SkillEntry) => {
    try {
      if (skill.id) {
        const updated = await updateSkill(skill.id, skill);
        setSkills((prev) => 
          prev.map((s) => (s.id === skill.id ? updated as SkillEntry : s))
        );
      } else {
        const created = await createSkill(skill);
        setSkills((prev) => [...prev, created as SkillEntry]);
      }
      setEditingData(undefined);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save skill.");
    }
  };

  const handleEdit = (skill: SkillEntry) => {
    setEditingData(skill);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
      toast.success("Skill deleted successfully");
      setCurrentPage((p) =>
        Math.min(p, Math.ceil((skills.length - 1) / itemsPerPage))
      );
      setEditingData(undefined);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete skill.");
    }
  };

  const cancelEdit = () => setEditingData(undefined);

  return {
    skills: paginated,
    allSkills: skills,
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