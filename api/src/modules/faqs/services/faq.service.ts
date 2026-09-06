import { CreateFAQInput, FAQMinimalResponseDto } from "@faqs/types";
import { createForAdmin } from "../faq.repository.js";

export async function createFAQForAdmin(data: CreateFAQInput) {
  const faq = await createForAdmin(data);

  return new FAQMinimalResponseDto(faq);
}
