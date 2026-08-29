import { UserRole } from "../../modules/users/user.types.js";

export interface JwtPayload {
  id: string;
  username: string;
  role: UserRole;
}
