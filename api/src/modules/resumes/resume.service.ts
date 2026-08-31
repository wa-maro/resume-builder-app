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
  findAll,
  findById,
  findByUserId,
  getCount,
  toggleStatusById,
  updatebyId,
} from "./resume.repository.js";
import {
  ConflictError,
  NotFoundError,
} from "../../shared/errors/http-errors.js";

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
    throw new NotFoundError("Resume not found.");
  }

  return new ResumeResponseDto(resume);
}
