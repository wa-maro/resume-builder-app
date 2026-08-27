import { QueryOptions } from "../../shared/types/query-options.js";

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
}

export interface User extends BaseUser {
  id: string;
}

export interface UserWithCredential extends BaseUser {
  passwordHash: string;
}

export interface UserFilter {
  username?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
}

export type UserSortFields = Pick<
  BaseUser,
  "createdAt" | "updatedAt" | "email"
>;

export type UserQueryOptions = QueryOptions<UserFilter, UserSortFields>;
