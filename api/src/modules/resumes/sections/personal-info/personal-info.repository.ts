import PersonalInfoModel from "./personal-info.model.js";
import { AddPersonalInfoInput } from "./personal-info.types.js";

export async function createForResume(
  resumeId: string,
  data: AddPersonalInfoInput,
) {
  return PersonalInfoModel.create({ resume: resumeId, ...data });
}

export async function findByResumeId(resumeId: string) {
  return PersonalInfoModel.findOne({ resume: resumeId }).exec();
}

export async function deleteById(id: string) {
  return PersonalInfoModel.findByIdAndDelete(id).exec();
}
