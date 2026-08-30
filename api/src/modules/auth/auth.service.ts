import { generateToken } from "../../security/jwt-token/jwt-token.service.js";
import { doHash } from "../../security/password/password.service.js";
import { ConflictError } from "../../shared/errors/http-errors.js";
import { createUser, findUserBy } from "../users/user.service.js";
import { AuthResponse, AuthUser } from "./auth.types.js";

export async function registerUser(
  username: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  const existingUser = await findUserBy(username, email);
  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  const passwordHash = await doHash(password);

  const user = await createUser(username, email, passwordHash);

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const token = generateToken(authUser);

  return {
    user: authUser,
    token: token,
  };
}
