import { resumeService } from "@resumes/services";
import { ConflictError, NotFoundError } from "@shared/errors";
import { workExperiencesRepository } from "@work-experiences";
import {
  AddWorkExperienceInput,
  WorkExperienceMinimalResponseDto,
  WorkExperienceResponseDto,
} from "@work-experiences/types";

async function createForResume(resumeId: string, data: AddWorkExperienceInput) {
  const resume = await resumeService.findResumeById(resumeId);

  const duplicateExperience = Boolean(
    await workExperiencesRepository.experienceExists(resumeId, {
      position: data.position,
      companyName: data.company.name,
      startDate: data.startDate,
    }),
  );

  if (duplicateExperience) {
    throw new ConflictError("Work experience already exists");
  }

  const experience = await workExperiencesRepository.createForResume(
    resume.id,
    data,
  );

  return new WorkExperienceResponseDto(experience);
}

async function findAllByResume(resumeId: string) {
  const resume = await resumeService.findResumeById(resumeId);

  const experiences = await workExperiencesRepository.findAllByResume(
    resume.id,
  );

  return experiences.map((exp) => new WorkExperienceResponseDto(exp));
}

async function deleteByResumeAndId(resumeId: string, id: string) {
  const resume = await resumeService.findResumeById(resumeId);

  const experience = await workExperiencesRepository.deleteByResumeAndId(
    resume.id,
    id,
  );

  if (!experience) {
    throw new NotFoundError("Work experience doesn't exist");
  }

  return new WorkExperienceMinimalResponseDto(experience);
}

export const workExperiencesService = {
  createForResume,
  findAllByResume,
  deleteByResumeAndId,
};
