import { ResumeMinimalResponseDto } from "@resumes/types";
import { QueryOptions } from "@shared/types";
import { Types } from "mongoose";
import {
  PersonalInfoFilter,
  PersonalInfoSortFields,
  PersonalInfoWithResume,
} from "./personal-info.types.js";
import { Disability, Gender, MaritalStatus } from "./personal-info.enums.js";

export type PersonalInfoQueryDto = QueryOptions<
  PersonalInfoFilter,
  PersonalInfoSortFields
>;

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
