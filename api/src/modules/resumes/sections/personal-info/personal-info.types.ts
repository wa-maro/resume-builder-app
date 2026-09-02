import { Types } from "mongoose";

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
