import { QueryOptions } from "@shared/types";
import { FAQDocument } from "../faq.model.js";
import { FAQ, FAQFilter, FAQSortFields } from "./faq.types.js";

export type CreateFAQInput = Pick<FAQ, "question" | "answer" | "order">;

export type UpdateFAQInput = Partial<CreateFAQInput>;

export class FAQMinimalResponseDto {
  id: string;
  question: string;
  answer: string;

  constructor(faq: FAQDocument) {
    this.id = faq._id.toString();
    this.question = faq.question;
    this.answer = faq.answer;
  }
}

export class FAQResponseDto extends FAQMinimalResponseDto {
  order?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(faq: FAQDocument) {
    super(faq);

    this.order = faq.order;
    this.isActive = faq.isActive;
    this.createdAt = faq.createdAt;
    this.updatedAt = faq.updatedAt;
  }
}

export type FAQQueryDto = QueryOptions<FAQFilter, FAQSortFields>;
