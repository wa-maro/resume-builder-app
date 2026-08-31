import { Types } from "mongoose";
import ResumeModel from "./resume.model.js";
import {
  CreateResumeDto,
  ResumeFilter,
  ResumeRepoQueryOptions,
  UpdateResumeDto,
} from "./resume.types.js";

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
  return ResumeModel.findById(id).exec();
}

export async function findByUserId(userId: string) {
  return ResumeModel.findOne({
    user: userId,
    isActive: true,
  }).exec();
}

export async function updatebyId(id: string, data: UpdateResumeDto) {
  return ResumeModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).exec();
}
