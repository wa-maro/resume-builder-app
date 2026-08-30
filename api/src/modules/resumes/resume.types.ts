import { Types } from "mongoose";
import {
  QueryOptions,
  RepositoryQueryOptions,
} from "../../shared/types/query-options.js";

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
