"use client";

import { useState, useEffect } from "react";
import { Container, Box, Typography, Snackbar, Alert } from "@mui/material";
import FileUpload from "@/components/HomePage/FileUpload";
import FileTable from "@/components/HomePage/FileTable";
import { FileItem } from "@/types";
import { generateMockFiles } from "@/lib/utils";

const HomePage = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const mockFiles = generateMockFiles(5);
    setFiles(mockFiles);
  }, []);

  const handleUpload = (newFile: FileItem) => {
    setFiles((prev) => [newFile, ...prev]);
  };

  const handleToast = (message: string, severity: "success" | "error") => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Vault UI Demo
        </Typography>
        <Typography variant="h6" color="text.secondary">
          A minimal file management interface built with MUI
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={4}>
        <FileUpload onUpload={handleUpload} onToast={handleToast} />
        <FileTable files={files} />
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HomePage;
