import { ConflictError } from "../../../../shared/errors/http-errors.js";
import { findResumeById } from "../../resume.service.js";
import { createForResume, findByResumeId } from "./personal-info.repository.js";
import {
  AddPersonalInfoInput,
  PersonalInfoResponseDto,
} from "./personal-info.types.js";

export async function addPersonalInfo(
  resumeId: string,
  data: AddPersonalInfoInput,
) {
  const resume = await findResumeById(resumeId);

  const existingInfo = await findByResumeId(resume.id);

  if (existingInfo) {
    throw new ConflictError("Personal information already exists");
  }

  const personalInfo = await createForResume(resumeId, data);

  return new PersonalInfoResponseDto(personalInfo);
}
