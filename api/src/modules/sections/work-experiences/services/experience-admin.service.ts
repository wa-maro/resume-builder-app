import { AppError, NotFoundError } from "@shared/errors";
import { SortOrderRepo } from "@shared/types";
import { workExperiencesRepository } from "@work-experiences";
import {
  WorkExperienceQueryDto,
  WorkExperienceRepoQueryOptions,
  WorkExperienceResponseDto,
} from "@work-experiences/types";
import { Types } from "mongoose";

async function findAll(query: WorkExperienceQueryDto) {
  const {
    filter = {},
    page = 1,
    limit = 10,
    sort = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (page - 1) * limit;
  const order: SortOrderRepo = sortOrder === "asc" ? 1 : -1;

  const repoQuery: WorkExperienceRepoQueryOptions = {
    filter,
    skip,
    limit,
    sort,
    order,
  };

  const [experiences, total] = await Promise.all([
    workExperiencesRepository.findAll(repoQuery),
    workExperiencesRepository.getCount(filter),
  ]);

  return {
    data: experiences.map(
      (experience) => new WorkExperienceResponseDto(experience),
    ),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + experiences.length < total,
      hasPreviousPage: skip > 0,
    },
  };
}

async function findById(id: string) {
  const personalInfo = await workExperiencesRepository.findById(id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  const user = personalInfo.resume.user;

  if (!(user && !(user instanceof Types.ObjectId))) {
    throw new AppError("Expected resume.user to be populated", 500);
  }

  const info = new WorkExperienceResponseDto(personalInfo);

  return {
    ...info,
    resume: {
      ...info.resume,
      user: {
        id: user._id.toString(),
        username: user.username,
      },
    },
  };
}

export const workExperiencesAdminService = {
  findAll,
  findById,
};
