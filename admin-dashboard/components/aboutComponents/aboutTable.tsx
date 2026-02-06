"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { AboutEntry } from "@/components/aboutComponents/aboutForm";
import AboutSearchBar from "./AboutSearchBar";
import AboutEmptyState from "./AboutEmptyState";
import AboutActionsDropdown from "./AboutActionsDropdown";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import { useState } from "react";

interface Props {
  entries: AboutEntry[];
  searchTerm: string;
  setSearchTerm: (t: string) => void;
  onEdit: (e: AboutEntry) => void;
  onDelete: (id: string) => void;
}

export default function AboutTable({
  entries,
  searchTerm,
  setSearchTerm,
  onEdit,
  onDelete,
}: Props) {
  const [delOpen, setDelOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  return (
    <div className="mt-6 space-y-4">
      <Card className="py-0">
        <AboutSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800 py-6">
            <TableRow>
              <TableHead>Paragraph</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.length === 0 ? (
              <AboutEmptyState colSpan={4} />
            ) : (
              entries.map((e) => (
                <TableRow key={e.id}>
                  
                  
                  <TableCell>{e.paragraph}</TableCell>
                  <TableCell className="text-right">
                    <AboutActionsDropdown
                      onEdit={() => onEdit(e)}
                      onDelete={() => {
                        setToDeleteId(e.id || null);
                        setDelOpen(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      <DeleteConfirmationDialog
        open={delOpen}
        onClose={() => {
          setDelOpen(false);
          setToDeleteId(null);
        }}
        onConfirm={() => {
          if (toDeleteId) onDelete(toDeleteId);
          setDelOpen(false);
          setToDeleteId(null);
        }}
      />
    </div>
  );
}
