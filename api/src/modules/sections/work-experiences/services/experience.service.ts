import { resumeService } from "@resumes/services";
import { ConflictError } from "@shared/errors";
import { workExperiencesRepository } from "@work-experiences";
import {
  AddWorkExperienceInput,
  WorkExperienceResponseDto,
} from "@work-experiences/types";

async function createForResume(resumeId: string, data: AddWorkExperienceInput) {
  const resume = await resumeService.findResumeById(resumeId);

  const duplicateExperience = Boolean(
    await workExperiencesRepository.experienceExists(resumeId, data),
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

export const workExperiencesService = {
  findAllByResume,
  createForResume,
};
