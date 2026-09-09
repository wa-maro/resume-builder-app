import { resumeAdminService } from "@resumes/services";
import { ConflictError, NotFoundError } from "@shared/errors";
import { deleteUpload, UploadFolder } from "@shared/utils";
import {
  CreateResumeDto,
  ResumeResponseDto,
  UpdateResumeDto,
} from "@resumes/types";
import { resumeRepository } from "@resumes";

async function createResume(userId: string, data: CreateResumeDto) {
  const existingResume = await resumeRepository.findByUserId(userId);

  if (existingResume) {
    throw new ConflictError("Resume already exists");
  }

  const resume = await resumeRepository.createForUser(userId, data);

  if (!resume) {
    throw new NotFoundError("Failed to create resume");
  }

  return new ResumeResponseDto(resume);
}

async function findResumeByUserId(userId: string) {
  const resume = await resumeRepository.findByUserId(userId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

async function editResumeByUserId(
  userId: string,
  resumeId: string,
  data: UpdateResumeDto,
) {
  const existingResume = await resumeRepository.findForUser(userId, resumeId);

  if (!existingResume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  const resume = await resumeRepository.updateForUser(userId, resumeId, data);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

async function removeResumeByUserId(userId: string, resumeId: string) {
  const resume = await resumeRepository.deleteForUser(userId, resumeId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

async function hasResumeForUser(userId: string): Promise<boolean> {
  return Boolean(await resumeRepository.existsByUserId(userId));
}

async function findResumeAvatarByUserId(userId: string, resumeId: string) {
  const resume = await resumeRepository.findForUser(userId, resumeId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  if (!resume.avatar) {
    throw new NotFoundError("Resume avatar doesn't exist");
  }

  return resume.avatar;
}

async function changeResumeAvatarByUserId(
  userId: string,
  resumeId: string,
  filename: string,
) {
  const existingResume = await resumeRepository.findForUser(userId, resumeId);

  if (!existingResume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  const oldAvatar = existingResume.avatar;

  const resume = await resumeRepository.updateForUser(userId, resumeId, {
    avatar: filename,
  });

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  if (oldAvatar) {
    await deleteUpload(oldAvatar, UploadFolder.RESUMES);
  }

  return new ResumeResponseDto(resume);
}

export const resumeService = {
  createResume,
  editResumeByUserId,
  findResumeByUserId,
  findResumeAvatarByUserId,
  hasResumeForUser,
  removeResumeByUserId,
  changeResumeAvatarByUserId,
  findResumeById: resumeAdminService.findResumeById,
};
