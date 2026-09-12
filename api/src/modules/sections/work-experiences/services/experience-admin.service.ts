import { AppError, ConflictError, NotFoundError } from "@shared/errors";
import { SortOrderRepo } from "@shared/types";
import { workExperiencesRepository } from "@work-experiences";
import {
  EditWorkExperienceInput,
  WorkExperienceMinimalResponseDto,
  WorkExperienceQueryDto,
  WorkExperienceRepoQueryOptions,
  WorkExperienceResponseDto,
} from "@work-experiences/types";
import { Types } from "mongoose";
import { buildWorkExperienceUpdate } from "../experience.helper.js";

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
  const experience = await workExperiencesRepository.findById(id);

  if (!experience) {
    throw new NotFoundError("Work experience doesn't exists.");
  }

  const user = experience.resume.user;

  if (!(user && !(user instanceof Types.ObjectId))) {
    throw new AppError("Expected resume.user to be populated", 500);
  }

  const info = new WorkExperienceResponseDto(experience);

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

async function updateById(id: string, data: EditWorkExperienceInput) {
  const existingExperience = await workExperiencesRepository.findById(id);

  if (!existingExperience) {
    throw new NotFoundError("Work experience doesn't exist.");
  }

  const update = buildWorkExperienceUpdate(existingExperience, data);

  const duplicateExperience = await workExperiencesRepository.experienceExists(
    existingExperience.resume.toString(),
    {
      position: update.position,
      companyName: update.company.name,
      startDate: update.startDate,
    },
    id,
  );

  if (duplicateExperience) {
    throw new ConflictError("Work experience already exists.");
  }

  const experience = await workExperiencesRepository.updateById(id, update);

  if (!experience) {
    throw new NotFoundError("Work experience doesn't exist.");
  }

  return new WorkExperienceMinimalResponseDto(experience);
}

async function deleteById(id: string) {
  const experience = await workExperiencesRepository.deleteById(id);

  if (!experience) {
    throw new NotFoundError("Work experience doesn't exists.");
  }

  return new WorkExperienceMinimalResponseDto(experience);
}

export const workExperiencesAdminService = {
  findAll,
  findById,
  updateById,
  deleteById,
};
