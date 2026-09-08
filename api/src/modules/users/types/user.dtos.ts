import { QueryOptions } from "@shared/types";
import {
  UserFilter,
  UserSortFields,
  UserWithCredential,
} from "./user.types.js";
import { ResumeMinimalResponseDto } from "@resumes/types";
import { UserRole } from "./user.enums.js";
import { UserDocument } from "@users";

export class UserMinimalResponseDto {
  readonly id: string;
  readonly username?: string;
  readonly isActive?: boolean;

  constructor(id: string, username?: string, isActive?: boolean) {
    this.id = id;
    this.username = username;
    this.isActive = isActive;
  }
}

export class UserResponseDto extends UserMinimalResponseDto {
  override username: string;
  readonly role: UserRole;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly resume?: ResumeMinimalResponseDto;

  constructor(user: UserDocument) {
    super(user._id.toString(), user.username, user.isActive);

    this.username = user.username;
    this.role = user.role;
    this.email = user.email;

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

export type UserQueryDto = QueryOptions<UserFilter, UserSortFields>;

export interface CreateUserDto extends Pick<
  UserWithCredential,
  "username" | "email" | "passwordHash"
> {}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export type CreateUserAdminDto = Pick<
  UserWithCredential,
  "username" | "email" | "passwordHash" | "role"
>;

export type UpdateUserAdminDto = Partial<CreateUserAdminDto>;
