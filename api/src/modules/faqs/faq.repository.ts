import {
  CreateFAQInput,
  FAQFilter,
  FAQRepoQueryOptions,
  UpdateFAQInput,
} from "@faqs/types";
import { FAQModel } from "./faq.model.js";

async function createForAdmin(data: CreateFAQInput) {
  return FAQModel.create(data);
}

async function findAllActive() {
  return FAQModel.find({ isActive: true }).sort({ order: -1 }).exec();
}

async function findAll(query: FAQRepoQueryOptions) {
  const {
    filter = {},
    skip = 0,
    limit = 10,
    sort = "createdAt",
    order = -1,
  } = query;

  const mongoFilter = buildFAQMongoFilter(filter);

  return FAQModel.find(mongoFilter)
    .sort({
      [sort]: order,
      _id: -1,
    })
    .skip(skip)
    .limit(limit)
    .exec();
}

async function getCount(filter: FAQFilter) {
  const mongoFilter = buildFAQMongoFilter(filter);

  return FAQModel.countDocuments(mongoFilter).exec();
}

async function findById(id: string) {
  return FAQModel.findById(id).exec();
}

function buildFAQMongoFilter(filter: FAQFilter) {
  const { search, ...rest } = filter;

  if (!search) {
    return rest;
  }

  return {
    ...rest,
    $or: [
      { question: { $regex: search, $options: "i" } },
      { answer: { $regex: search, $options: "i" } },
    ],
  };
}

async function updateById(id: string, data: UpdateFAQInput) {
  return FAQModel.findByIdAndUpdate(
    id,
    { $set: data },
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).exec();
}

async function toggleStatusById(id: string) {
  return await FAQModel.findByIdAndUpdate(
    id,
    [{ $set: { isActive: { $not: ["$isActive"] } } }],
    {
      returnDocument: "after",
      updatePipeline: true,
    },
  ).exec();
}

async function deleteById(id: string) {
  return FAQModel.findByIdAndDelete(id).exec();
}

async function questionExists(question: string, excludeUserId?: string) {
  return FAQModel.exists({
    question: { $regex: question, $options: "i" },
    ...(excludeUserId && { _id: { $ne: excludeUserId } }),
  }).exec();
}

export const faqRepository = {
  createForAdmin,
  findAllActive,
  findAll,
  getCount,
  findById,
  updateById,
  toggleStatusById,
  deleteById,
  questionExists,
};
