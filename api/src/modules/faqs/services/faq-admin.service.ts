import {
  CreateFAQInput,
  FAQMinimalResponseDto,
  FAQQueryDto,
  FAQRepoQueryOptions,
  FAQResponseDto,
  UpdateFAQInput,
} from "@faqs/types";
import { faqRepository } from "@faqs";
import { ConflictError, NotFoundError } from "@shared/errors";

async function createFAQForAdmin(data: CreateFAQInput) {
  await checkQuestionExist(data.question);

  const faq = await faqRepository.createForAdmin(data);

  return new FAQResponseDto(faq);
}

async function findFAQs(query: FAQQueryDto) {
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
    faqRepository.findAll(repoQuery),
    faqRepository.getCount(filter),
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

async function findFAQById(id: string) {
  const faq = await faqRepository.findById(id);

  if (!faq) {
    throw new NotFoundError("FAQ doesn't exist");
  }

  return new FAQResponseDto(faq);
}

async function updateFAQById(id: string, data: UpdateFAQInput) {
  const { question, answer, order } = data;
  const updatedFAQ: UpdateFAQInput = {};

  if (question !== undefined) {
    await checkQuestionExist(question, id);

    updatedFAQ.question = question;
  }

  if (answer !== undefined) {
    updatedFAQ.answer = answer;
  }

  if (order !== undefined) {
    updatedFAQ.order = order;
  }

  const faq = await faqRepository.updateById(id, updatedFAQ);

  if (!faq) {
    throw new NotFoundError("FAQ doesn't exist");
  }

  return new FAQResponseDto(faq);
}

async function toggleFAQStatusById(id: string) {
  const faq = await faqRepository.toggleStatusById(id);

  if (!faq) {
    throw new NotFoundError("FAQ doesn't exist");
  }

  return new FAQMinimalResponseDto(faq);
}

async function removeFAQById(id: string) {
  const faq = await faqRepository.deleteById(id);

  if (!faq) {
    throw new NotFoundError("FAQ doesn't exist");
  }

  return new FAQMinimalResponseDto(faq);
}

async function checkQuestionExist(question: string, excludeUserId?: string) {
  const exists = await faqRepository.questionExists(question, excludeUserId);

  if (exists) {
    throw new ConflictError("Question already exists");
  }
}

export const faqAdminService = {
  createFAQForAdmin,
  findFAQById,
  findFAQs,
  removeFAQById,
  toggleFAQStatusById,
  updateFAQById,
};
