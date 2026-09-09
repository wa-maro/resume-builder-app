import { ConflictError, NotFoundError } from "@shared/errors";
import { deleteUpload, UploadFolder } from "@shared/utils";
import {
  CreateResumeDto,
  ResumeQueryDto,
  ResumeRepoQueryOptions,
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

async function findResumes(query: ResumeQueryDto) {
  const {
    filter = {},
    page = 1,
    limit = 10,
    sort = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (page - 1) * limit;
  const order = sortOrder === "asc" ? 1 : -1;

  const repoQuery: ResumeRepoQueryOptions = {
    filter,
    skip,
    limit,
    sort,
    order,
  };

  const [resumes, total] = await Promise.all([
    resumeRepository.findAll(repoQuery),
    resumeRepository.getCount(filter),
  ]);

  return {
    data: resumes.map((resume) => new ResumeResponseDto(resume)),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + resumes.length < total,
      hasPreviousPage: skip > 0,
    },
  };
}

async function findResumeById(id: string) {
  const resume = await resumeRepository.findById(id);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
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

async function editResumeById(id: string, data: UpdateResumeDto) {
  const resume = await resumeRepository.updatebyId(id, data);

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

async function removeResumeById(id: string) {
  const resume = await resumeRepository.deleteById(id);

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

async function toggleResumeStatusById(resumeId: string) {
  const resume = await resumeRepository.toggleStatusById(resumeId);

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
  findResumeById,
  findResumeByUserId,
  findResumeAvatarByUserId,
  hasResumeForUser,
  removeResumeByUserId,
  changeResumeAvatarByUserId,
};

export const resumeAdminService = {
  editResumeById,
  findResumeById,
  findResumes,
  removeResumeById,
  toggleResumeStatusById,
};
