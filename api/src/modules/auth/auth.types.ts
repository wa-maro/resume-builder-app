import { UserRole } from "../users/user.types.js";

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}
