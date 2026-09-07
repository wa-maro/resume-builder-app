import { FAQModel } from "@faqs";
import { infoLogger } from "@shared/utils";

export async function resetFAQs() {
  const result = await FAQModel.deleteMany({});

  infoLogger.info(`FAQ reset completed. Deleted ${result.deletedCount} faqs.`);
}
