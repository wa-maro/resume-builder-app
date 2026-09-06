import { CreateFAQInput } from "@faqs/types";
import { FAQModel } from "./faq.model.js";

export async function createForAdmin(data: CreateFAQInput) {
  return FAQModel.create(data);
}
