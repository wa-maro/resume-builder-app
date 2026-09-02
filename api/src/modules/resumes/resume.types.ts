import { Types } from "mongoose";
import {
  QueryOptions,
  RepositoryQueryOptions,
} from "../../shared/types/query-options.js";
import { ResumeDocument } from "./resume.model.js";

export interface Declaration {
  statement: string;
  signature?: string;
  date?: Date;
}

export interface BaseResume {
  user: Types.ObjectId;
  title: string;
  summary: string;
  avatar?: string | undefined;
  declaration?: Declaration | undefined;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume extends BaseResume {
  id: string;
}

export interface ResumeFilter {
  search?: string;
  isActive?: boolean;
}

export type ResumeSortFields = Pick<
  BaseResume,
  "createdAt" | "updatedAt" | "title"
>;

export type ResumeQueryDto = QueryOptions<ResumeFilter, ResumeSortFields>;

export type ResumeRepoQueryOptions = RepositoryQueryOptions<
  ResumeFilter,
  ResumeSortFields
>;

export class ResumeMinimalResponseDto {
  readonly id: string;
  readonly title: string;

  constructor(resume: ResumeDocument) {
    this.id = resume._id.toString();
    this.title = resume.title;
  }
}

export class ResumeResponseDto extends ResumeMinimalResponseDto {
  readonly user: Types.ObjectId;
  readonly summary: string;
  readonly avatar?: string | undefined;
  readonly declaration?: Declaration | undefined;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(resume: ResumeDocument) {
    super(resume);

    this.user = resume.user;
    this.summary = resume.summary;
    this.avatar = resume.avatar;
    this.declaration = resume.declaration;
    this.isActive = resume.isActive;
    this.createdAt = resume.createdAt;
    this.updatedAt = resume.updatedAt;
  }
}

export interface CreateResumeDto {
  title: string;
  summary: string;
  avatar?: string | undefined;
  declaration?: Declaration | undefined;
}

export interface UpdateResumeDto extends Partial<CreateResumeDto> {}
