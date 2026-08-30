import {
  ResumeQueryDto,
  ResumeRepoQueryOptions,
  ResumeResponseDto,
} from "./resume.types.js";
import {
  findAll,
  findById,
  findByUserId,
  getCount,
} from "./resume.repository.js";
import { NotFoundError } from "../../shared/errors/http-errors.js";

export const findResumes = async (query: ResumeQueryDto) => {
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
};

export const findResumeById = async (id: string) => {
  const resume = await findById(id);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
};

export const findResumeByUserId = async (userId: string) => {
  const resume = await findByUserId(userId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
};
