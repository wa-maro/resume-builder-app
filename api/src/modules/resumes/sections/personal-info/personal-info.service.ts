import {
  ConflictError,
  NotFoundError,
} from "../../../../shared/errors/http-errors.js";
import { findResumeById } from "../../resume.service.js";
import { createForResume, findByResume } from "./personal-info.repository.js";
import {
  AddPersonalInfoInput,
  PersonalInfoResponseDto,
} from "./personal-info.types.js";

export async function addPersonalInfo(
  resumeId: string,
  data: AddPersonalInfoInput,
) {
  const resume = await findResumeById(resumeId);

  if (!resume) {
    throw new NotFoundError("Resume doesn't exist");
  }

  const existingInfo = await findByResume(resumeId);

  if (existingInfo) {
    throw new ConflictError("Personal information already exists");
  }

  const personalInfo = await createForResume(resumeId, data);

  return new PersonalInfoResponseDto(personalInfo);
}
