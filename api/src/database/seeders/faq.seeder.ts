import { FAQModel } from "@faqs";
import { infoLogger } from "@shared/utils";

import faqs from "./data/faqs.js";

export async function seedFAQs() {
  if (faqs.length === 0) {
    infoLogger.warn("No FAQs found. FAQ seeding skipped.");
    return;
  }

  const operations = faqs.map((faq) => ({
    updateOne: {
      filter: {
        question: faq.question,
      },
      update: {
        $setOnInsert: faq,
      },
      upsert: true,
    },
  }));

  const result = await FAQModel.bulkWrite(operations);

  infoLogger.info(
    `FAQ seeding completed. Created ${result.upsertedCount} FAQs.`,
  );
}
