import { Types } from "mongoose";
import { PersonalInfoDocument } from "./personal-info.model.js";
import {
  PopulateResume,
  ResumeMinimalResponseDto,
} from "../../resume.types.js";
import {
  QueryOptions,
  RepositoryQueryOptions,
} from "../../../../shared/types/query-options.js";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married",
  DIVORCED = "divorced",
  WIDOWED = "widowed",
}

export enum Disability {
  NONE = "none",
  VISUAL = "visual",
  HEARING = "hearing",
  MOBILITY = "mobility",
  COGNITIVE = "cognitive",
  OTHER = "other",
}

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

export class PersonalInfoResponseDto {
  readonly id: string;
  readonly fullName: string;
  readonly gender: Gender;
  readonly dateOfBirth: Date;
  readonly nationality?: string;
  readonly placeOfDomicile?: string;
  readonly maritalStatus?: MaritalStatus;
  readonly disabilities?: Disability[];
  readonly email: string;
  readonly phone: string;
  readonly physicalAddress: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly resume: ResumeMinimalResponseDto;

  constructor(personalInfo: PersonalInfoWithResume) {
    this.id = personalInfo._id.toString();
    this.fullName = personalInfo.fullName;
    this.gender = personalInfo.gender;
    this.dateOfBirth = personalInfo.dateOfBirth;
    this.nationality = personalInfo.nationality;
    this.placeOfDomicile = personalInfo.placeOfDomicile;
    this.maritalStatus = personalInfo.maritalStatus;
    this.disabilities = personalInfo.disabilities;
    this.email = personalInfo.email;
    this.phone = personalInfo.phone;
    this.physicalAddress = personalInfo.physicalAddress;
    this.createdAt = personalInfo.createdAt;
    this.updatedAt = personalInfo.updatedAt;

    if (personalInfo.resume instanceof Types.ObjectId) {
      this.resume = new ResumeMinimalResponseDto(
        personalInfo.resume.toString(),
      );
    } else {
      this.resume = new ResumeMinimalResponseDto(
        personalInfo.resume._id.toString(),
        personalInfo.resume.title,
      );
    }
  }
}

export type AddPersonalInfoInput = {
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
};

export type EditPersonalInfoInput = Partial<AddPersonalInfoInput>;

export interface PersonalInfoFilter {
  search?: string;

  gender?: Gender;
  maritalStatus?: MaritalStatus;
  disabilities?: Disability[];
  nationality?: string;
  placeOfDomicile?: string;
}

export type PersonalInfoSortFields = Pick<
  PersonalInfo,
  "createdAt" | "updatedAt" | "fullName" | "dateOfBirth" | "placeOfDomicile"
>;

export type PersonalInfoQueryDto = QueryOptions<
  PersonalInfoFilter,
  PersonalInfoSortFields
>;

export type PersonalInfoRepoQueryOptions = RepositoryQueryOptions<
  PersonalInfoFilter,
  PersonalInfoSortFields
>;
