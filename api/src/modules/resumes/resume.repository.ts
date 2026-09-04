import { Types } from "mongoose";
import { ResumeModel } from "@resumes";
import {
  CreateResumeDto,
  ResumeFilter,
  ResumeRepoQueryOptions,
  ResumeUser,
  UpdateResumeDto,
} from "@resumes/types";

export async function createForUser(userId: string, data: CreateResumeDto) {
  return ResumeModel.create({
    user: new Types.ObjectId(userId),
    ...data,
  });
}

export async function findAll(query: ResumeRepoQueryOptions) {
  const {
    filter = {},
    skip = 0,
    limit = 10,
    sort = "createdAt",
    order = -1,
  } = query;

  const mongoFilter = buildResumeMongoFilter(filter);

  return ResumeModel.find(mongoFilter)
    .populate<ResumeUser>("user", "_id username")
    .sort({
      [sort]: order,
      _id: -1,
    })
    .skip(skip)
    .limit(limit)
    .exec();
}

export async function getCount(filter: ResumeFilter) {
  const mongoFilter = buildResumeMongoFilter(filter);

  return ResumeModel.countDocuments(mongoFilter).exec();
}

function buildResumeMongoFilter(filter: ResumeFilter) {
  const { search, ...rest } = filter;

  if (!search) {
    return rest;
  }

  return {
    ...rest,
    $or: [
      { title: { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
    ],
  };
}

export async function findById(id: string) {
  return ResumeModel.findById(id)
    .populate<ResumeUser>("user", "_id username")
    .exec();
}

export async function findByUserId(userId: string) {
  return ResumeModel.findOne({
    user: userId,
    isActive: true,
  })
    .populate<ResumeUser>("user", "_id username")
    .exec();
}

export async function findForUser(userId: string, id: string) {
  return ResumeModel.findOne({
    _id: id,
    user: userId,
  }).exec();
}

export async function updatebyId(id: string, data: UpdateResumeDto) {
  return ResumeModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).exec();
}

export async function updateForUser(
  userId: string,
  resumeId: string,
  data: UpdateResumeDto,
) {
  return ResumeModel.findOneAndUpdate(
    { _id: resumeId, user: userId },
    { $set: data },
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).exec();
}

export async function deleteById(id: string) {
  return ResumeModel.findByIdAndDelete(id).exec();
}

export async function deleteForUser(userId: string, resumeId: string) {
  return ResumeModel.findOneAndDelete({
    _id: resumeId,
    user: userId,
  }).exec();
}

export async function toggleStatusById(resumeId: string) {
  return await ResumeModel.findByIdAndUpdate(
    resumeId,
    [{ $set: { isActive: { $not: ["$isActive"] } } }],
    {
      returnDocument: "after",
      updatePipeline: true,
    },
  ).exec();
}

export async function existsByUserId(userId: string) {
  return ResumeModel.exists({ user: userId }).exec();
}
