import {
  ConflictError,
  NotFoundError,
} from "../../../../shared/errors/http-errors.js";
import { findResumeById } from "../../resume.service.js";
import {
  createForResume,
  deleteById,
  findByResumeId,
} from "./personal-info.repository.js";
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

export const getPersonalInfo = async (resumeId: string, id: string) => {
  const resume = await findResumeById(resumeId);

  const personalInfo = await findByResumeAndId(resume.id, id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
};

export const removePersonalInfo = async (id: string) => {
  const personalInfo = await deleteById(id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
};
