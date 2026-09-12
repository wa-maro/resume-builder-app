import { resumeService } from "@resumes/services";
import { ConflictError, NotFoundError } from "@shared/errors";
import { workExperiencesRepository } from "@work-experiences";
import {
  AddWorkExperienceInput,
  EditWorkExperienceInput,
  WorkExperienceMinimalResponseDto,
  WorkExperienceResponseDto,
} from "@work-experiences/types";
import { buildWorkExperienceUpdate } from "../experience.helper.js";

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
    throw new ConflictError("Work experience already exists.");
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

async function updateByResumeAndId(
  resumeId: string,
  id: string,
  data: EditWorkExperienceInput,
) {
  const existingExperience = await workExperiencesRepository.findByResumeAndId(
    resumeId,
    id,
  );

  if (!existingExperience) {
    throw new NotFoundError("Work experience doesn't exist.");
  }

  const update = buildWorkExperienceUpdate(existingExperience, data);

  const duplicateExperience = await workExperiencesRepository.experienceExists(
    resumeId,
    {
      position: update.position,
      companyName: update.company.name,
      startDate: update.startDate,
    },
    id,
  );

  if (duplicateExperience) {
    throw new ConflictError("Work experience already exists.");
  }

  const experience = await workExperiencesRepository.updateByResumeAndId(
    resumeId,
    id,
    update,
  );

  if (!experience) {
    throw new NotFoundError("Work experience doesn't exist.");
  }

  return new WorkExperienceResponseDto(experience);
}

async function deleteByResumeAndId(resumeId: string, id: string) {
  const resume = await resumeService.findResumeById(resumeId);

  const experience = await workExperiencesRepository.deleteByResumeAndId(
    resume.id,
    id,
  );

  if (!experience) {
    throw new NotFoundError("Work experience doesn't exist.");
  }

  return new WorkExperienceMinimalResponseDto(experience);
}

export const workExperiencesService = {
  createForResume,
  findAllByResume,
  updateByResumeAndId,
  deleteByResumeAndId,
};
