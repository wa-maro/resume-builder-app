import {
  CreateFAQInput,
  FAQMinimalResponseDto,
  FAQQueryDto,
  FAQRepoQueryOptions,
  FAQResponseDto,
  UpdateFAQInput,
} from "@faqs/types";
import {
  createForAdmin,
  deleteById,
  findAll,
  findAllActive,
  findById,
  getCount,
  questionExists,
  toggleStatusById,
  updateById,
} from "@faqs";
import { ConflictError, NotFoundError } from "@shared/errors";

export async function createFAQForAdmin(data: CreateFAQInput) {
  await checkQuestionExist(data.question);

  const faq = await createForAdmin(data);

  return new FAQResponseDto(faq);
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
    throw new NotFoundError("FAQ doesn't exist");
  }

  return new FAQResponseDto(faq);
}

export async function updateFAQById(id: string, data: UpdateFAQInput) {
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

  const faq = await updateById(id, updatedFAQ);

  if (!faq) {
    throw new NotFoundError("FAQ doesn't exist");
  }

  return new FAQResponseDto(faq);
}

export async function toggleFAQStatusById(id: string) {
  const faq = await toggleStatusById(id);

  if (!faq) {
    throw new NotFoundError("FAQ doesn't exist");
  }

  return new FAQMinimalResponseDto(faq);
}

export async function removeFAQById(id: string) {
  const faq = await deleteById(id);

  if (!faq) {
    throw new NotFoundError("FAQ doesn't exist");
  }

  return new FAQMinimalResponseDto(faq);
}

async function checkQuestionExist(question: string, excludeUserId?: string) {
  const exists = await questionExists(question, excludeUserId);

  if (exists) {
    throw new ConflictError("Question already exists");
  }
}
