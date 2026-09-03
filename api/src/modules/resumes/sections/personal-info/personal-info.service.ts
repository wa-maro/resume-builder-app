import {
  ConflictError,
  NotFoundError,
} from "../../../../shared/errors/http-errors.js";
import { findResumeById } from "../../resume.service.js";
import {
  createForResume,
  deleteById,
  findById,
  findByResumeAndId,
  findByResumeId,
  updateById,
  updateByResumeAndId,
} from "./personal-info.repository.js";
import {
  AddPersonalInfoInput,
  EditPersonalInfoInput,
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

export const getPersonalInfobyResume = async (resumeId: string, id: string) => {
  const resume = await findResumeById(resumeId);

  const personalInfo = await findByResumeAndId(resume.id, id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
};

export const getPersonalInfoForAdmin = async (id: string) => {
  const personalInfo = await findById(id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
};

export async function editPersonalInfoByResume(
  resumeId: string,
  id: string,
  data: EditPersonalInfoInput,
) {
  const resume = await findResumeById(resumeId);

  const personalInfo = await updateByResumeAndId(resume.id, id, data);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
}

export async function editPersonalInfoById(
  id: string,
  data: EditPersonalInfoInput,
) {
  const personalInfo = await updateById(id, data);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
}

export const removePersonalInfo = async (id: string) => {
  const personalInfo = await deleteById(id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
};
