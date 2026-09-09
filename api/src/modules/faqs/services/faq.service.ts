import { FAQResponseDto } from "@faqs/types";
import { faqRepository } from "@faqs";

async function findActiveFAQs() {
  const faqs = await faqRepository.findAllActive();

  return faqs.map((faq) => new FAQResponseDto(faq));
}

export const faqService = {
  findActiveFAQs,
};
