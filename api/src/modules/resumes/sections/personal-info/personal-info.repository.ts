import PersonalInfoModel from "./personal-info.model.js";
import { AddPersonalInfoInput } from "./personal-info.types.js";

export async function createForResume(
  resumeId: string,
  data: AddPersonalInfoInput,
) {
  return PersonalInfoModel.create({ resume: resumeId, ...data });
}

export async function findByResume(resumeId: string) {
  return PersonalInfoModel.findOne({ resume: resumeId }).exec();
}
