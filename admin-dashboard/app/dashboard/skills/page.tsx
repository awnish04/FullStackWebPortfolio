"use client";

import SkillForm from "@/components/skillsComponents/SkillForm";
import SkillTable from "@/components/skillsComponents/SkillTable";
import SkillPagination from "@/components/skillsComponents/SkillsPagination";
import { useSkillManager } from "@/hooks/useSkillManager";

export default function SkillsPage() {
  const {
    skills,
    searchTerm,
    setSearchTerm,
    isLoading,
    editingData,
    isEditing,
    currentPage,
    totalPages,
    setCurrentPage,
    handleAddOrEdit,
    handleEdit,
    handleDelete,
    cancelEdit,
  } = useSkillManager();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SkillForm
        onAdd={handleAddOrEdit}
        initialData={editingData}
        isEditing={isEditing}
        onCancelEdit={cancelEdit}
      />

      <SkillTable
        skills={skills}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <SkillPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}