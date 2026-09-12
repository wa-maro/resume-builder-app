import { PopulateResume } from "@resumes/types";
import { RepositoryQueryOptions } from "@shared/types";
import { WorkExperienceDocument } from "@work-experiences";
import { Types } from "mongoose";

export interface Company {
  name: string;
  location: string;
}

export interface WorkExperience {
  resume: Types.ObjectId;
  position: string;
  company: Company;
  responsibilities: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkExperienceWithResume = Omit<
  WorkExperienceDocument,
  "resume"
> & {
  resume: Types.ObjectId | PopulateResume;
};

export interface WorkExperienceFilter {
  search?: string;
  currentlyWorking?: boolean;
}

export type WorkExperienceSortFields = Pick<
  WorkExperience,
  "createdAt" | "updatedAt" | "position" | "company" | "startDate" | "endDate"
>;

export type WorkExperienceSortField = keyof WorkExperienceSortFields;

export type WorkExperienceRepoQueryOptions = RepositoryQueryOptions<
  WorkExperienceFilter,
  WorkExperienceSortFields
>;

export type UpdateWorkExperience = {
  position: string;
  company: Company;
  responsibilities: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  $unset?: {
    endDate?: 1;
    currentlyWorking?: 1;
  };
};
