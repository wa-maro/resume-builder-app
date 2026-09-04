import multer from "multer";
import path from "node:path";
import fs from "node:fs";

export enum UploadFolder {
  RESUMES = "resumes",
  SKILLS = "skills",
  PROJECTS = "projects",
  ACADEMICS = "academics",
}

export const uploadsDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const createUpload = (folder?: UploadFolder) => {
  const destination = folder ? path.join(uploadsDir, folder) : uploadsDir;

  fs.mkdirSync(destination, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, destination);
    },

    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);

      cb(null, `${Date.now()}-${crypto.randomUUID()}${ext}`);
    },
  });

  return multer({ storage });
};

export default createUpload;
