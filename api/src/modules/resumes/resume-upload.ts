import { createUpload, UploadFolder } from "../../shared/utils/upload.util.js";

export const RESUME_AVATAR_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
] as const;

export const resumeUpload = createUpload(UploadFolder.RESUMES, {
  allowedMimeTypes: RESUME_AVATAR_MIME_TYPES,
});
