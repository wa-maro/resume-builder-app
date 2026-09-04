import { UserRole } from "@users/types";

export interface JwtPayload {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}
