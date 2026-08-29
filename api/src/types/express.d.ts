import type { AuthUser } from "../shared/types/auth-user.js";

declare global {
  namespace Express {
    interface Request {
      user: AuthUser;
    }
  }
}

export {};
