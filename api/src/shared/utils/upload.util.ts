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

export const createUpload = (
  folder?: UploadFolder,
  options?: {
    allowedMimeTypes?: readonly string[];
  },
) => {
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

  const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (
      options?.allowedMimeTypes &&
      !options.allowedMimeTypes.includes(file.mimetype)
    ) {
      return cb(new Error("Invalid file type"));
    }

    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
};

export default createUpload;
