import {
  ResumeQueryDto,
  ResumeRepoQueryOptions,
  ResumeResponseDto,
  UpdateResumeDto,
} from "@resumes/types";
import { NotFoundError } from "@shared/errors";
import { resumeRepository } from "@resumes";
import { SortOrderRepo } from "@shared/types";

async function findResumes(query: ResumeQueryDto) {
  const {
    filter = {},
    page = 1,
    limit = 10,
    sort = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (page - 1) * limit;
  const order: SortOrderRepo = sortOrder === "asc" ? 1 : -1;

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

async function editResumeById(id: string, data: UpdateResumeDto) {
  const resume = await resumeRepository.updatebyId(id, data);

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

async function toggleResumeStatusById(resumeId: string) {
  const resume = await resumeRepository.toggleStatusById(resumeId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  return new ResumeResponseDto(resume);
}

export const resumeAdminService = {
  editResumeById,
  findResumeById,
  findResumes,
  removeResumeById,
  toggleResumeStatusById,
};
