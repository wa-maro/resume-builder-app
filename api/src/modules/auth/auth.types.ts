import { UserRole } from "../users/user.types.js";

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  usernameOrEmail: string;
  password: string;
}

export interface UpdateAuthenticatedUserInput {
  newUsername?: string;
  newEmail?: string;
  newPassword?: string;
}
