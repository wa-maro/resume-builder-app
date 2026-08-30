import { generateToken } from "../../security/jwt-token/jwt-token.service.js";
import {
  compareHash,
  doHash,
} from "../../security/password/password.service.js";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../shared/errors/http-errors.js";
import {
  createUser,
  findUserBy,
  findUserById,
  findUserByUsernameOrEmail,
} from "../users/user.service.js";
import { UserResponseDto } from "../users/user.types.js";
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

export async function loginUser(
  usernameOrEmail: string,
  password: string,
): Promise<AuthResponse> {
  const user = await findUserByUsernameOrEmail(usernameOrEmail);
  if (!user) {
    throw new UnauthorizedError("Wrong credentials");
  }

  const isMatch = await compareHash(password, user.passwordHash);
  if (!isMatch) {
    throw new UnauthorizedError("Wrong credentials");
  }

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const token = generateToken(authUser);

  return {
    user: authUser,
    token,
  };
}

export async function findAuthenticatedUser(
  id: string,
): Promise<UserResponseDto> {
  const user = await findUserById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  return new UserResponseDto(user);
}
