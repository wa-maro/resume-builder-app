import { errorLogger, infoLogger } from "@shared/utils";
import ResumeModel from "../../modules/resumes/resume.model.js";
import UserModel from "../../modules/users/user.model.js";
import { UserRole } from "../../modules/users/user.types.js";
import resumes from "./data/resumes.js";

export async function resumeSeeder() {
  const users = await UserModel.find()
    .select("_id")
    .where("role")
    .equals(UserRole.USER)
    .lean();

  if (users.length === 0) {
    errorLogger.error("No users found. Resume seeding skipped.");
    return;
  }

  if (resumes.length === 0) {
    errorLogger.error("No resumes found. Resume seeding skipped.");
    return;
  }

  const operations = users.map((user, index) => {
    const resume = resumes[index % resumes.length]!;

    return {
      updateOne: {
        filter: { user: user._id },
        update: {
          $setOnInsert: {
            user: user._id,
            title: resume.title,
            summary: resume.summary,
          },
        },
        upsert: true,
      },
    };
  });

  const result = await ResumeModel.bulkWrite(operations);

  infoLogger.info(
    `Resume seeding completed. Created ${result.upsertedCount} resumes.`,
  );
}
