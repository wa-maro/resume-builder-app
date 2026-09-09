import { ConflictError, NotFoundError } from "@shared/errors";
import { resumeService } from "@resumes/services";
import { personalInfoRepository } from "@personal-info";
import {
  AddPersonalInfoInput,
  EditPersonalInfoInput,
  PersonalInfoResponseDto,
} from "@personal-info/types";

async function addPersonalInfo(resumeId: string, data: AddPersonalInfoInput) {
  const resume = await resumeService.findResumeById(resumeId);

  const existingInfo = await personalInfoRepository.findByResumeId(resume.id);

  if (existingInfo) {
    throw new ConflictError("Personal information already exists");
  }

  const personalInfo = await personalInfoRepository.createForResume(
    resumeId,
    data,
  );

  return new PersonalInfoResponseDto(personalInfo);
}

async function findPersonalInfoByResumeId(resumeId: string) {
  const resume = await resumeService.findResumeById(resumeId);

  const personalInfo = await personalInfoRepository.findByResumeAndId(
    resume.id,
  );

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
}

async function editPersonalInfoByResumeId(
  resumeId: string,
  id: string,
  data: EditPersonalInfoInput,
) {
  const resume = await resumeService.findResumeById(resumeId);

  const personalInfo = await personalInfoRepository.updateByResumeAndId(
    resume.id,
    id,
    data,
  );

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
}

export const personalInfoService = {
  addPersonalInfo,
  editPersonalInfoByResumeId,
  findPersonalInfoByResumeId,
};
