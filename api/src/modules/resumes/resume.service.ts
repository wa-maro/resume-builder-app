import { ConflictError, NotFoundError } from "@shared/errors";
import { deleteUpload, UploadFolder } from "@shared/utils";
import {
  CreateResumeDto,
  ResumeQueryDto,
  ResumeRepoQueryOptions,
  ResumeResponseDto,
  UpdateResumeDto,
} from "./resume.types.js";
import {
  createForUser,
  deleteById,
  deleteForUser,
  existsByUserId,
  findAll,
  findById,
  findByUserId,
  findForUser,
  getCount,
  toggleStatusById,
  updatebyId,
  updateForUser,
} from "./resume.repository.js";

export async function createResume(userId: string, data: CreateResumeDto) {
  const existingResume = await findByUserId(userId);

  if (existingResume) {
    throw new ConflictError("Resume already exists");
  }

  const resume = await createForUser(userId, data);

  if (!resume) {
    throw new NotFoundError("Failed to create resume");
  }

  return new ResumeResponseDto(resume);
}

export async function findResumes(query: ResumeQueryDto) {
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
    findAll(repoQuery),
    getCount(filter),
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

export async function findResumeById(id: string) {
  const resume = await findById(id);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

export async function findResumeByUserId(userId: string) {
  const resume = await findByUserId(userId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

export async function editResumeById(id: string, data: UpdateResumeDto) {
  const resume = await updatebyId(id, data);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

export async function editResumeForUser(
  userId: string,
  resumeId: string,
  data: UpdateResumeDto,
) {
  const existingResume = await findForUser(userId, resumeId);

  if (!existingResume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  const resume = await updateForUser(userId, resumeId, data);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

export async function removeResumeById(id: string) {
  const resume = await deleteById(id);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

export async function removeResumeForUser(userId: string, resumeId: string) {
  const resume = await deleteForUser(userId, resumeId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

export async function toggleResumeStatusById(resumeId: string) {
  const resume = await toggleStatusById(resumeId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

export async function hasResumeForUser(userId: string): Promise<boolean> {
  return Boolean(await existsByUserId(userId));
}

export async function findResumeAvatarForUser(
  userId: string,
  resumeId: string,
) {
  const resume = await findForUser(userId, resumeId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  if (!resume.avatar) {
    throw new NotFoundError("Resume avatar doesn't exist");
  }

  return resume.avatar;
}

export async function changeResumeAvatarForUser(
  userId: string,
  resumeId: string,
  filename: string,
) {
  const existingResume = await findForUser(userId, resumeId);

  if (!existingResume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  const oldAvatar = existingResume.avatar;

  const resume = await updateForUser(userId, resumeId, {
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
