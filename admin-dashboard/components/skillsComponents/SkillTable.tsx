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
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { SkillEntry } from "./SkillForm";
import SkillSearchBar from "./SkillSearchBar";
import SkillEmptyState from "./SkillEmptyState";
import SkillActionsDropdown from "./SkillActionsDropdown";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import { useState } from "react";

interface Props {
  skills: SkillEntry[];
  searchTerm: string;
  setSearchTerm: (t: string) => void;
  onEdit: (e: SkillEntry) => void;
  onDelete: (id: string) => void;
}

export default function SkillTable({
  skills,
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
        <SkillSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800 py-6">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Skill Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.length === 0 ? (
              <SkillEmptyState colSpan={3} />
            ) : (
              skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell>
                    {skill.imageUrl ? (
                      <div className="relative w-16 h-16 rounded overflow-hidden">
                        <Image
                          src={skill.imageUrl}
                          alt={skill.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded">
                        <ImageOff className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell className="text-right">
                    <SkillActionsDropdown
                      onEdit={() => onEdit(skill)}
                      onDelete={() => {
                        setToDeleteId(skill.id || null);
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