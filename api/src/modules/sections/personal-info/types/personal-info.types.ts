import { Types } from "mongoose";
import { RepositoryQueryOptions } from "@shared/types";
import { PopulateResume } from "@resumes/types";
import { PersonalInfoDocument } from "@personal-info";
import { Disability, Gender, MaritalStatus } from "./personal-info.enums.js";

export interface PersonalInfo {
  resume: Types.ObjectId;
  fullName: string;
  gender: Gender;
  dateOfBirth: Date;
  nationality?: string;
  placeOfDomicile?: string;
  maritalStatus?: MaritalStatus;
  disabilities?: Disability[];
  email: string;
  phone: string;
  physicalAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PersonalInfoWithResume = Omit<PersonalInfoDocument, "resume"> & {
  resume: Types.ObjectId | PopulateResume;
};

export interface PersonalInfoFilter {
  search?: string;

  gender?: Gender;
  maritalStatus?: MaritalStatus;
  disabilities?: Disability[];
}

export type PersonalInfoSortFields = Pick<
  PersonalInfo,
  "createdAt" | "updatedAt" | "fullName" | "dateOfBirth" | "placeOfDomicile"
>;

export type PersonalInfoSortField = keyof PersonalInfoSortFields;

export type PersonalInfoRepoQueryOptions = RepositoryQueryOptions<
  PersonalInfoFilter,
  PersonalInfoSortFields
>;
