"use client";

import { useProjectManager } from "@/hooks/useProjectManager";
import ProjectForm from "@/components/projectsComponents/ProjectForm";
import ProjectTable from "@/components/projectsComponents/ProjectTable";
import ProjectPagination from "@/components/projectsComponents/ProjectPagination";

export default function ProjectsPage() {
  const {
    entries,
    isLoading,
    editingEntry,
    isEditing,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    handleAddOrEdit,
    handleEdit,
    handleDelete,
    cancelEdit,
  } = useProjectManager();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ProjectForm
        onAdd={handleAddOrEdit}
        initialData={editingEntry}
        isEditing={isEditing}
        onCancelEdit={cancelEdit}
      />

      <ProjectTable
        entries={entries}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <ProjectPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
