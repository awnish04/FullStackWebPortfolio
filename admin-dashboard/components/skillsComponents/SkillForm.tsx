"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FileUpload } from "../ui/file-upload";
import { Loader2Icon } from "lucide-react";
import { Skill } from "@/shared/types/skill";


// Use the same Skill type but make id optional for new entries
export type SkillEntry = Omit<Skill, "id"> & { id?: string };

interface SkillFormProps {
  onAdd: (skill: SkillEntry) => void;
  initialData?: SkillEntry;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}

function extractFileName(url: string): string {
  try {
    const segments = url.split("/");
    return decodeURIComponent(segments[segments.length - 1].split("?")[0]);
  } catch {
    return "unknown.jpg";
  }
}

export default function SkillForm({
  onAdd,
  initialData,
  isEditing,
  onCancelEdit,
}: SkillFormProps) {
  const [form, setForm] = useState<SkillEntry>({
    name: "",
    imageUrl: "",
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setOpen(true);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.imageUrl) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      await onAdd({ ...form, id: initialData?.id });

      toast.success(
        isEditing ? "Skill updated successfully!" : "Skill added successfully!"
      );

      setForm({ name: "", imageUrl: "" });
      setOpen(false);
      onCancelEdit?.();
    } catch (err) {
      toast.error("Failed to save skill. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Manage Skills</h1>
        {!isEditing && (
          <DialogTrigger asChild>
            <Button variant="outline">Add New Skill</Button>
          </DialogTrigger>
        )}
      </div>

      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit" : "Add"} Skill</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the skill details."
                : "Add a new skill with name and image."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <LabelInputContainer>
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., React, Node.js, TypeScript"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="imageUrl">Skill Image</Label>
              <FileUpload
                folder="skill-images"
                multiple={false}
                onStart={() => setUploading(true)}
                existingFiles={
                  isEditing && form.imageUrl
                    ? [
                        {
                          url: form.imageUrl,
                          name: extractFileName(form.imageUrl),
                          size: 0,
                          type: "image/jpeg",
                        },
                      ]
                    : []
                }
                onChange={(urls: string[]) => {
                  setForm((prev) => ({ ...prev, imageUrl: urls[0] || "" }));
                  setUploading(false);
                }}
              />
            </LabelInputContainer>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={loading}
                onClick={onCancelEdit}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading || uploading}>
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                  {isEditing ? "Updating..." : "Saving..."}
                </>
              ) : isEditing ? (
                "Update Skill"
              ) : (
                "Add Skill"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col space-y-2", className)}>{children}</div>
);
