import { SortOrderRepo } from "@shared/types";
import { workExperiencesRepository } from "@work-experiences";
import {
  WorkExperienceQueryDto,
  WorkExperienceRepoQueryOptions,
  WorkExperienceResponseDto,
} from "@work-experiences/types";

async function findWorkExperiences(query: WorkExperienceQueryDto) {
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

export const workExperiencesAdminService = {
  findWorkExperiences,
};
