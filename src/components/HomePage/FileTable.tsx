"use client";

import { useState, useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import { Search, Clear, InsertDriveFile } from "@mui/icons-material";
import { FileItem } from "@/types";

interface FileTableProps {
  files: FileItem[];
}

export default function FileTable({ files }: FileTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("");

  const fileTypes = ["pdf", "jpg", "png", "doc", "zip"];

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = !fileTypeFilter || file.type === fileTypeFilter;
      return matchesSearch && matchesType;
    });
  }, [files, searchTerm, fileTypeFilter]);

  const clearSearch = () => setSearchTerm("");
  const clearFileType = () => setFileTypeFilter("");

  const getFileTypeColor = (type: string) => {
    const colors: {
      [key: string]:
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning";
    } = {
      pdf: "error",
      jpg: "success",
      png: "info",
      doc: "primary",
      zip: "warning",
    };
    return colors[type] || "default";
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ color: "text.secondary", mr: 1 }} />,
            endAdornment: searchTerm && (
              <IconButton size="small" onClick={clearSearch}>
                <Clear />
              </IconButton>
            ),
          }}
          sx={{ minWidth: 200, flex: 1 }}
        />

        <TextField
          select
          label="Select File Type"
          value={fileTypeFilter}
          onChange={(e) => setFileTypeFilter(e.target.value)}
          InputProps={{
            endAdornment: fileTypeFilter && (
              <IconButton size="small" onClick={clearFileType}>
                <Clear />
              </IconButton>
            ),
          }}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Types</MenuItem>
          {fileTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 650 }} aria-label="file table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Upload Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <InsertDriveFile
                    sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    No files uploaded
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Upload your first file to get started
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredFiles.map((file) => (
                <TableRow key={file.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <InsertDriveFile color="action" />
                      <Typography variant="body2">{file.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={file.type.toUpperCase()}
                      size="small"
                      color={getFileTypeColor(file.type)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {file.uploadDate.toLocaleDateString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredFiles.length > 0 && (
        <Typography variant="body2" color="text.secondary" mt={2}>
          Showing {filteredFiles.length} of {files.length} files
        </Typography>
      )}
    </Box>
  );
}
