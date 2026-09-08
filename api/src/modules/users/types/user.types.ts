import { RepositoryQueryOptions } from "@shared/types";
import { ResumeDocument } from "@resumes";
import { UserRole } from "./user.enums.js";

interface BaseUser {
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  resume?: ResumeDocument;
}

export interface User extends BaseUser {
  id: string;
}

export interface UserWithCredential extends BaseUser {
  passwordHash: string;
}

export interface UserFilter {
  search?: string;
  role?: UserRole;
  isActive?: boolean;
}

export type UserSortFields = Pick<
  BaseUser,
  "createdAt" | "updatedAt" | "username"
>;

export type UserSortField = keyof UserSortFields;

export type UserRepoQueryOptions = RepositoryQueryOptions<
  UserFilter,
  UserSortFields
>;

export type CreateUserInputAdmin = Pick<
  UserWithCredential,
  "username" | "email" | "role"
> & {
  password: string;
};

export type UpdateUserInputAdmin = Partial<CreateUserInputAdmin>;
