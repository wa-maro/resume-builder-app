import {
  CreateFAQInput,
  FAQMinimalResponseDto,
  FAQQueryDto,
  FAQRepoQueryOptions,
  FAQResponseDto,
} from "@faqs/types";
import {
  createForAdmin,
  findAll,
  findAllActive,
  findById,
  getCount,
} from "../faq.repository.js";
import { NotFoundError } from "@shared/errors";

export async function createFAQForAdmin(data: CreateFAQInput) {
  const faq = await createForAdmin(data);

  return new FAQMinimalResponseDto(faq);
}

export async function findActiveFAQs() {
  const faqs = await findAllActive();

  return faqs.map((faq) => new FAQResponseDto(faq));
}

export async function findFAQs(query: FAQQueryDto) {
  const {
    filter = {},
    page = 1,
    limit = 10,
    sort = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (page - 1) * limit;
  const order = sortOrder === "asc" ? 1 : -1;

  const repoQuery: FAQRepoQueryOptions = {
    filter,
    skip,
    limit,
    sort,
    order,
  };

  const [faqs, total] = await Promise.all([
    findAll(repoQuery),
    getCount(filter),
  ]);

  return {
    data: faqs.map((faq) => new FAQResponseDto(faq)),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + faqs.length < total,
      hasPreviousPage: skip > 0,
    },
  };
}

export async function findFAQById(id: string) {
  const faq = await findById(id);

  if (!faq) {
    throw new NotFoundError("faq not found");
  }

  return new FAQResponseDto(faq);
}
