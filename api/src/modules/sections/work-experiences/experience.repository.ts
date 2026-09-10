import {
  WorkExperienceFilter,
  WorkExperienceRepoQueryOptions,
} from "@work-experiences/types";
import { WorkExperienceModel } from "@work-experiences";
import { PopulateResume } from "@resumes/types";

async function findAll(query: WorkExperienceRepoQueryOptions) {
  const {
    filter = {},
    skip = 0,
    limit = 10,
    sort = "createdAt",
    order = -1,
  } = query;

  const mongoFilter = buildWorkExperienceMongoFilter(filter);

  return WorkExperienceModel.find(mongoFilter)
    .populate<PopulateResume>("resume", "_id title")
    .sort({
      [sort]: order,
      _id: -1,
    })
    .skip(skip)
    .limit(limit)
    .exec();
}

async function getCount(filter: WorkExperienceFilter) {
  const mongoFilter = buildWorkExperienceMongoFilter(filter);

  return WorkExperienceModel.countDocuments(mongoFilter).exec();
}

function buildWorkExperienceMongoFilter(filter: WorkExperienceFilter) {
  const { search, ...rest } = filter;

  if (!search) {
    return rest;
  }

  return {
    ...rest,
    $or: [
      { position: { $regex: search, $options: "i" } },
      { responsibilities: { $regex: search, $options: "i" } },
      { "company.name": { $regex: search, $options: "i" } },
      { "company.location": { $regex: search, $options: "i" } },
    ],
  };
}

export const workExperiencesRepository = {
  findAll,
  getCount,
};
