import { CreateFAQInput, FAQFilter, FAQRepoQueryOptions } from "@faqs/types";
import { FAQModel } from "./faq.model.js";

export async function createForAdmin(data: CreateFAQInput) {
  return FAQModel.create(data);
}

export async function findAll(query: FAQRepoQueryOptions) {
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

export async function getCount(filter: FAQFilter) {
  const mongoFilter = buildFAQMongoFilter(filter);

  return FAQModel.countDocuments(mongoFilter).exec();
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
