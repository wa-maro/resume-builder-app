import { Types } from "mongoose";
import { Company, WorkExperienceWithResume } from "./experience.types.js";
import { ResumeMinimalResponseDto } from "@resumes/types";

export class WorkExperienceResponseDto {
  readonly id: string;
  readonly position: string;
  readonly company: Company;
  readonly responsibilities: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly currentlyWorking: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly resume: ResumeMinimalResponseDto;

  constructor(experience: WorkExperienceWithResume) {
    this.id = experience._id.toString();
    this.position = experience.position;
    this.company = experience.company;
    this.responsibilities = experience.responsibilities;
    this.startDate = experience.startDate;
    this.endDate = experience.endDate;
    this.currentlyWorking = experience.currentlyWorking;
    this.createdAt = experience.createdAt;
    this.updatedAt = experience.updatedAt;

    if (experience.resume instanceof Types.ObjectId) {
      this.resume = new ResumeMinimalResponseDto(experience.resume.toString());
    } else {
      this.resume = new ResumeMinimalResponseDto(
        experience.resume._id.toString(),
        experience.resume.title,
      );
    }
  }
}
