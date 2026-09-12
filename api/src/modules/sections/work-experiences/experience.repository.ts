import {
  AddWorkExperienceInput,
  UpdateWorkExperience,
  WorkExperienceFilter,
  WorkExperienceRepoQueryOptions,
} from "@work-experiences/types";
import { WorkExperienceModel } from "@work-experiences";
import { PopulatedResumeDocument, PopulateResume } from "@resumes/types";

async function createForResume(resumeId: string, data: AddWorkExperienceInput) {
  return WorkExperienceModel.create({ resume: resumeId, ...data });
}

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

async function findAllByResume(resumeId: string) {
  return await WorkExperienceModel.find({
    resume: resumeId,
  }).exec();
}

async function findById(id: string) {
  return await WorkExperienceModel.findById(id)
    .populate<{
      resume: PopulatedResumeDocument;
    }>({
      path: "resume",
      select: "_id title user",
      populate: { path: "user", select: "_id username" },
    })
    .exec();
}

async function findByResumeId(resumeId: string) {
  return WorkExperienceModel.findOne({ resume: resumeId }).exec();
}

async function updateById(id: string, data: UpdateWorkExperience) {
  return WorkExperienceModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).exec();
}

async function updateByResumeAndId(
  resumeId: string,
  id: string,
  data: UpdateWorkExperience,
) {
  return WorkExperienceModel.findOneAndUpdate(
    {
      _id: id,
      resume: resumeId,
    },
    data,
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).exec();
}

async function deleteById(id: string) {
  return WorkExperienceModel.findByIdAndDelete(id).exec();
}

async function deleteByResumeAndId(resumeId: string, id: string) {
  return WorkExperienceModel.findOneAndDelete({
    _id: id,
    resume: resumeId,
  }).exec();
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

export async function experienceExists(
  resumeId: string,
  filter: { position: string; companyName: string; startDate: string },
  excludeId?: string,
) {
  const { companyName, ...rest } = filter;

  return WorkExperienceModel.exists({
    resume: resumeId,
    ...rest,
    "company.name": companyName,
    ...(excludeId && { _id: { $ne: excludeId } }),
  }).exec();
}

export const workExperiencesRepository = {
  createForResume,
  findAll,
  getCount,
  findAllByResume,
  findByResumeId,
  findById,
  updateById,
  updateByResumeAndId,
  deleteById,
  deleteByResumeAndId,
  experienceExists,
};
