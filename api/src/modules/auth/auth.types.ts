import { UserRole } from "../users/user.types.js";

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
}
