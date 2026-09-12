import {
  EditWorkExperienceInput,
  UpdateWorkExperience,
  WorkExperienceWithResume,
} from "@work-experiences/types";
import { WorkExperienceDocument } from "@work-experiences";

export function buildWorkExperienceUpdate(
  experience: WorkExperienceDocument | WorkExperienceWithResume,
  data: EditWorkExperienceInput,
) {
  const {
    position,
    company,
    responsibilities,
    startDate,
    endDate,
    currentlyWorking,
  } = data;

  const update: UpdateWorkExperience = {
    position: position ?? experience.position,
    company: {
      name: company?.name ?? experience.company.name,
      location: company?.location ?? experience.company.location,
    },
    responsibilities: responsibilities ?? experience.responsibilities,
    startDate: startDate ?? experience.startDate,
  };

  // if currentlyWorking not explicitly provided.
  if (currentlyWorking !== undefined) {
    update.currentlyWorking = currentlyWorking;

    update.$unset = {
      endDate: 1,
    };
  }

  // if endDate not explicitly provided.
  else if (endDate !== undefined) {
    update.endDate = endDate;

    update.$unset = {
      currentlyWorking: 1,
    };
  }

  // if both currentlyWorking and endDate not provided
  // preserve database state.
  else {
    update.endDate = experience.endDate;
    update.currentlyWorking = experience.currentlyWorking;
  }

  return update;
}
