"use client";

import AboutForm from "@/components/aboutComponents/aboutForm";
import AboutTable from "@/components/aboutComponents/aboutTable";
import AboutPagination from "@/components/aboutComponents/AboutPagination";
import { useAboutManager } from "@/hooks/useAboutManager";

export default function AboutPage() {
  const {
    entries,
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
  } = useAboutManager();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AboutForm
        onAdd={handleAddOrEdit}
        initialData={editingData}
        isEditing={isEditing}
        onCancelEdit={cancelEdit}
      />

      <AboutTable
        entries={entries}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <AboutPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}