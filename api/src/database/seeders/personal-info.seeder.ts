import { errorLogger, infoLogger } from "@shared/utils";
import { ResumeModel } from "@resumes";
import { PersonalInfoModel } from "@personal-info";
import personalInfos from "./data/personal-infos.js";

export async function seedPersonalInfos() {
  const resumes = await ResumeModel.find().select("_id").lean();

  if (resumes.length === 0) {
    errorLogger.error("No resumes found. Personal info seeding skipped.");
    return;
  }

  if (personalInfos.length === 0) {
    errorLogger.error("No personal info found. Personal info seeding skipped.");
    return;
  }

  const operations = resumes.map((resume, index) => {
    const personalInfo = personalInfos[index % personalInfos.length]!;

    return {
      updateOne: {
        filter: { resume: resume._id },
        update: {
          $setOnInsert: {
            resume: resume._id,
            ...personalInfo,
          },
        },
        upsert: true,
      },
    };
  });

  const result = await PersonalInfoModel.bulkWrite(operations);

  infoLogger.info(
    `Personal info seeding completed. Created ${result.upsertedCount} personal info records.`,
  );
}
