/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileUpload } from "../ui/file-upload";
import TechStackSelector from "../TechStackSelector";
import { Loader2Icon } from "lucide-react";

export type ProjectEntry = {
  id?: string;
  title: string;
  description: string;
  imageUrls: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
};

interface ProjectFormProps {
  onAdd: (entry: ProjectEntry) => void;
  initialData?: ProjectEntry;
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

export default function ProjectForm({
  onAdd,
  initialData,
  isEditing,
  onCancelEdit,
}: ProjectFormProps) {
  const [form, setForm] = useState<ProjectEntry>({
    title: "",
    description: "",
    imageUrls: [],
    techStack: [],
    githubUrl: "",
    liveUrl: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.imageUrls.length) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await onAdd({ ...form, id: initialData?.id });
      toast.success(
        isEditing ? "Updated successfully!" : "Saved successfully!"
      );
      setForm({
        title: "",
        description: "",
        imageUrls: [],
        techStack: [],
        githubUrl: "",
        liveUrl: "",
      });
      setOpen(false);
      onCancelEdit?.();
    } catch (err) {
      toast.error("Failed to save. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  console.log("Form values being submitted:", form);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Add Your New Projects</h1>
        {!isEditing && (
          <DialogTrigger asChild>
            <Button variant="outline">Add Project</Button>
          </DialogTrigger>
        )}
      </div>
      <DialogContent className="sm:max-w-[625px]  max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit" : "Add"} Project</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update your project info."
                : "Fill the details to add a new project."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TechStackSelector form={form} setForm={setForm} />

            <Label>Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="flex w-full justify-between space-x-4">
              <div className="w-full">
                <Label>GitHub URL</Label>
                <Input
                  name="githubUrl"
                  value={form.githubUrl}
                  onChange={(e) =>
                    setForm({ ...form, githubUrl: e.target.value })
                  }
                />
              </div>

              <div className="w-full">
                <Label>Live URL</Label>
                <Input
                  name="liveUrl"
                  value={form.liveUrl}
                  onChange={(e) =>
                    setForm({ ...form, liveUrl: e.target.value })
                  }
                />
              </div>
            </div>

            <FileUpload
              folder="project-images"
              multiple
              onStart={() => setUploading(true)}
              existingFiles={
                isEditing
                  ? form.imageUrls.map((url) => ({
                      url,
                      name: extractFileName(url), // ⬅️ extract from URL or store in DB
                      size: 0, // You can leave real size if known
                      type: "image/jpeg", // Set real type if known
                    }))
                  : []
              }
              onChange={(urls: string[]) => {
                setForm((prev) => ({ ...prev, imageUrls: urls }));
                setUploading(false);
              }}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={onCancelEdit}
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                  {isEditing ? "Updating..." : "Saving..."}
                </>
              ) : isEditing ? (
                "Update"
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
