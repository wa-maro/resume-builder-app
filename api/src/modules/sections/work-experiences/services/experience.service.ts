import { resumeService } from "@resumes/services";
import { workExperiencesRepository } from "../experience.repository.js";
import { WorkExperienceResponseDto } from "@work-experiences/types";

async function findAllByResume(resumeId: string) {
  const resume = await resumeService.findResumeById(resumeId);

  const experiences = await workExperiencesRepository.findAllByResume(
    resume.id,
  );

  return experiences.map((exp) => new WorkExperienceResponseDto(exp));
}

export const workExperiencesService = {
  findAllByResume,
};
