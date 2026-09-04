import { infoLogger } from "@shared/utils";
import { ResumeModel } from "@resumes";

export async function resetResumes() {
  const result = await ResumeModel.deleteMany({});

  infoLogger.info(
    `Resume reset completed. Deleted ${result.deletedCount} resumes.`,
  );
}
