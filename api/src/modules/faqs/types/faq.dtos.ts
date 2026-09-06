import { FAQDocument } from "../faq.model.js";

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
