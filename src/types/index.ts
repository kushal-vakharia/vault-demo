export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
}

export type UploadStatus = "idle" | "uploading" | "success" | "error";
