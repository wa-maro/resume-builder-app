import { infoLogger } from "@shared/utils";
import { PersonalInfoModel } from "@personal-info";

export async function resetPersonalInfo() {
  const result = await PersonalInfoModel.deleteMany({});

  infoLogger.info(
    `Personal info reset completed. Deleted ${result.deletedCount} personal info records.`,
  );
}
