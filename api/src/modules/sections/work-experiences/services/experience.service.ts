import { resumeService } from "@resumes/services";
import { workExperiencesRepository } from "../experience.repository.js";
import {
  AddWorkExperienceInput,
  WorkExperienceResponseDto,
} from "@work-experiences/types";
import { ConflictError } from "@shared/errors";

async function createForResume(resumeId: string, data: AddWorkExperienceInput) {
  const resume = await resumeService.findResumeById(resumeId);

  const existingExperience = await workExperiencesRepository.findByResumeId(
    resume.id,
  );

  if (existingExperience) {
    throw new ConflictError("Personal information already exists");
  }

  const experience = await workExperiencesRepository.createForResume(
    resumeId,
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
