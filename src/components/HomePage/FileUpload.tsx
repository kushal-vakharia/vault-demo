"use client";

import { useState } from "react";
import { Paper, Box, Typography, LinearProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { FileItem, UploadStatus } from "@/types";

interface FileUploadProps {
  onUpload: (file: FileItem) => void;
  onToast: (message: string, severity: "success" | "error") => void;
}

export default function FileUpload({ onUpload, onToast }: FileUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [dragOver, setDragOver] = useState(false);

  const getErrorMessage = (fileName: string): string => {
    const errors = [
      `Network timeout while uploading "${fileName}"`,
      `Server rejected "${fileName}" - file may be corrupted`,
      `Storage quota exceeded for "${fileName}"`,
      `Invalid file format for "${fileName}"`,
      `Upload cancelled for "${fileName}" - please try again`,
    ];
    return errors[Math.floor(Math.random() * errors.length)];
  };

  const handleFileSelect = async (file: File) => {
    setStatus("uploading");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const shouldSucceed = Math.random() > 0; // Simulate success or failure

    if (shouldSucceed) {
      const newFile: FileItem = {
        id: `file-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.name.split(".").pop()?.toLowerCase() || "unknown",
        uploadDate: new Date(),
      };
      onUpload(newFile);
      setStatus("success");
      onToast(`"${file.name}" successfully uploaded!`, "success");
    } else {
      setStatus("error");
      const errorMessage = getErrorMessage(file.name);
      onToast(errorMessage, "error");
    }

    setTimeout(() => setStatus("idle"), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        border: dragOver ? "2px dashed #1976d2" : "2px dashed #e0e0e0",
        backgroundColor: dragOver ? "action.hover" : "background.paper",
        transition: "all 0.2s ease",
        cursor: status === "uploading" ? "default" : "pointer",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() =>
        status !== "uploading" &&
        document.getElementById("file-upload")?.click()
      }
    >
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={(e) =>
          e.target.files?.[0] && handleFileSelect(e.target.files[0])
        }
        disabled={status === "uploading"}
      />

      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {status === "uploading" ? (
          <Box width="100%">
            <LinearProgress />
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mt={1}
            >
              Uploading your file...
            </Typography>
          </Box>
        ) : (
          <>
            <CloudUpload sx={{ fontSize: 48, color: "text.secondary" }} />
            <Typography variant="h6" component="div">
              Click to upload or drag and drop
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Simulated upload - no real files will be transferred
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
}
