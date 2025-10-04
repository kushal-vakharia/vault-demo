import { FileItem } from "@/types";

export function generateMockFiles(count: number): FileItem[] {
  const fileTypes = ["pdf", "jpg", "png", "doc", "zip"];
  const fileNames = [
    "project_documentation.pdf",
    "profile_picture.jpg",
    "screenshot.png",
    "report.doc",
    "archive.zip",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `file-${i + 1}`,
    name:
      fileNames[i] || `document-${i + 1}.${fileTypes[i % fileTypes.length]}`,
    size: Math.floor(Math.random() * 5000000) + 100000,
    type: fileTypes[i % fileTypes.length],
    uploadDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
  }));
}
