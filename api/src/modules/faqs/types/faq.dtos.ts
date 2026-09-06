import { QueryOptions } from "@shared/types";
import { FAQDocument } from "../faq.model.js";
import { FAQ, FAQFilter, FAQSortFields } from "./faq.types.js";

export type CreateFAQInput = Pick<FAQ, "question" | "answer" | "order">;

export type UpdateFAQInput = Partial<CreateFAQInput>;

export class FAQMinimalResponseDto {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;

  constructor(faq: FAQDocument) {
    this.id = faq._id.toString();
    this.question = faq.question;
    this.answer = faq.answer;
    this.isActive = faq.isActive;
  }
}

export class FAQResponseDto extends FAQMinimalResponseDto {
  order?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(faq: FAQDocument) {
    super(faq);

    this.order = faq.order;
    this.createdAt = faq.createdAt;
    this.updatedAt = faq.updatedAt;
  }
}

export type FAQQueryDto = QueryOptions<FAQFilter, FAQSortFields>;
