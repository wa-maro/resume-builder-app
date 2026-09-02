import { Types } from "mongoose";
import {
  QueryOptions,
  RepositoryQueryOptions,
} from "../../shared/types/query-options.js";
import { ResumeDocument } from "./resume.model.js";
import { UserMinimalResponseDto } from "../users/user.types.js";

export interface Declaration {
  statement: string;
  signature?: string;
  date?: Date;
}

export interface BaseResume {
  user: Types.ObjectId;
  title: string;
  summary: string;
  avatar?: string;
  declaration?: Declaration;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume extends BaseResume {
  id: string;
}

export type ResumeUser =
  | Types.ObjectId
  | { _id: Types.ObjectId; username: string }
  | null;

export type PopulatedResumeDocument = Omit<ResumeDocument, "user"> & {
  _id: Types.ObjectId;
  user: ResumeUser;
};

export type PopulateResume =
  | Types.ObjectId
  | { _id: Types.ObjectId; title: string };

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
  readonly title?: string;

  constructor(id: string, title?: string) {
    this.id = id;
    this.title = title;
  }
}

export class ResumeResponseDto extends ResumeMinimalResponseDto {
  readonly user: UserMinimalResponseDto | null;
  readonly summary: string;
  readonly avatar?: string;
  readonly declaration?: Declaration;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(resume: PopulatedResumeDocument) {
    super(resume._id.toString(), resume.title);

    if (resume.user instanceof Types.ObjectId) {
      this.user = new UserMinimalResponseDto(resume.user.toString());
    } else if (resume.user) {
      this.user = new UserMinimalResponseDto(
        resume.user._id.toString(),
        resume.user.username,
      );
    } else {
      this.user = null;
    }

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
  avatar?: string;
  declaration?: Declaration;
}

export interface UpdateResumeDto extends Partial<CreateResumeDto> {}
