import {
  QueryOptions,
  RepositoryQueryOptions,
} from "../../shared/types/query-options.js";
import { ResumeDocument } from "../resumes/resume.model.js";
import { ResumeMinimalResponseDto } from "../resumes/resume.types.js";
import { UserDocument } from "./user.model.js";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

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

export type UserQueryDto = QueryOptions<UserFilter, UserSortFields>;

export type UserRepoQueryOptions = RepositoryQueryOptions<
  UserFilter,
  UserSortFields
>;

export class UserMinimalResponseDto {
  readonly id: string;
  readonly username?: string;

  constructor(id: string, username?: string) {
    this.id = id;
    this.username = username;
  }
}

export class UserResponseDto extends UserMinimalResponseDto {
  override username: string;
  readonly role: UserRole;
  readonly email: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly resume?: ResumeMinimalResponseDto;

  constructor(user: UserDocument) {
    super(user._id.toString(), user.username);

    this.username = user.username;
    this.role = user.role;
    this.email = user.email;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;

    this.resume = user.resume
      ? new ResumeMinimalResponseDto(
          user.resume._id.toString(),
          user.resume.title,
        )
      : undefined;
  }
}

export interface CreateUserDto extends Pick<
  UserWithCredential,
  "username" | "email" | "passwordHash"
> {}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export type CreateUserAdminDto = Pick<
  UserWithCredential,
  "username" | "email" | "passwordHash" | "role"
>;

export type CreateUserInputAdmin = Pick<
  UserWithCredential,
  "username" | "email" | "role"
> & {
  password: string;
};

export type UpdateUserInputAdmin = Partial<CreateUserInputAdmin>;

export type UpdateUserAdminDto = Partial<CreateUserAdminDto>;
