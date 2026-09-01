import { generateToken } from "../../security/jwt-token/jwt-token.service.js";
import {
  compareHash,
  doHash,
} from "../../security/password/password.service.js";
import {
  NotFoundError,
  UnauthorizedError,
} from "../../shared/errors/http-errors.js";
import {
  checkEmailExist,
  checkUsernameExist,
  createUser,
  findUserById,
  findUserByUsernameOrEmail,
  updateUserProfileById,
} from "../users/user.service.js";
import { UserResponseDto } from "../users/user.types.js";
import { AuthResponse, AuthUser } from "./auth.types.js";

export async function registerUser(
  username: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  await Promise.all([checkUsernameExist(username), checkEmailExist(email)]);

  const passwordHash = await doHash(password);

  const user = await createUser({ username, email, passwordHash });

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

export async function updateAuthenticatedUser(
  id: string,
  data: { newUsername: string; newEmail: string; newPassword: string },
) {
  if (data.newUsername) {
    await checkUsernameExist(data.newUsername);
  }

  if (data.newEmail) {
    await checkUsernameExist(data.newEmail);
  }

  const passwordHash = await doHash(data.newPassword);

  const user = await updateUserProfileById(id, {
    username: data.newUsername,
    email: data.newEmail,
    passwordHash,
  });

  return user;
}
