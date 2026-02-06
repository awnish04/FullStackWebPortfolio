/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { XIcon } from "lucide-react";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

interface UploadedFile {
  url: string;
  name: string;
  size: number;
  type: string;
  lastModified?: number;
}

interface FileUploadProps {
  onChange?: (urls: string[]) => void;
  onStart?: () => void;
  folder?: string;
  multiple?: boolean;
  existingFiles?: UploadedFile[];
}

export const FileUpload = ({
  onChange,
  onStart,
  folder = "uploads",
  multiple = false,
  existingFiles = [],
}: FileUploadProps) => {
  const [uploaded, setUploaded] = useState<UploadedFile[]>(existingFiles);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (newFiles: File[]) => {
    if (!newFiles.length) return;

    onStart?.();
    setUploading(true);

    const formData = new FormData();
    newFiles.forEach((file) => formData.append("file", file));
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      // Ensure we have an array of upload results
      const uploadedFiles = Array.isArray(data)
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((item: any, i: number) => ({
            url: item.secure_url || item.url || "",
            name: newFiles[i]?.name || "Uploaded file",
            size: newFiles[i]?.size || 0,
            type: newFiles[i]?.type || "unknown",
          }))
        : [];

      const combined = [...uploaded, ...uploadedFiles];
      setUploaded(combined);

      // Send URLs to parent
      onChange?.(combined.map((f) => f.url));
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple,
    noClick: true,
    onDrop: handleFileChange,
  });

  const removeFile = (idx: number) => {
    const updated = uploaded.filter((_, i) => i !== idx);
    setUploaded(updated);
    onChange?.(updated.map((f) => f.url));
  };

  return (
    <div className="w-full border rounded-xl" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-4 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        />

        <div className="absolute inset-0 mask-[radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-bold text-neutral-700 dark:text-neutral-300">
            Upload file
          </p>
          <p className="relative z-20 text-neutral-400 dark:text-neutral-400 text-sm mt-1">
            Drag or drop your files here or click to upload
          </p>

          <div className="relative w-full max-w-xl mx-auto mt-4">
            {uploading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
              </div>
            ) : uploaded.length > 0 ? (
              <div className="flex flex-col gap-4">
                {uploaded.map((file, idx) => {
                  const imageSrc = file.url || "";
                  if (!imageSrc) return null;

                  return (
                    <div
                      key={idx}
                      className="flex gap-4 items-center p-2 rounded-lg border shadow bg-white dark:bg-neutral-900 relative"
                    >
                      <div className="w-32 h-20 relative overflow-hidden rounded">
                        <Image
                          src={imageSrc}
                          alt={`preview-${idx}`}
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-base truncate">{file.name}</p>
                        <p className="text-xs text-neutral-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-gray-200 rounded-full p-1"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 w-full max-w-32 mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]",
                )}
              >
                {isDragActive ? (
                  <motion.p className="text-neutral-600 flex flex-col items-center">
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0_0_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0_0_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        }),
      )}
    </div>
  );
}
