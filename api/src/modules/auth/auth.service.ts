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
  createUser,
  checkEmailExist,
  findUserById,
  checkUsernameExist,
  findUserByUsernameOrEmail,
  updateUserProfileById,
} from "../users/user.service.js";
import { UpdateUserDto, UserResponseDto } from "../users/user.types.js";
import {
  AuthResponse,
  AuthUser,
  LoginUserInput,
  RegisterUserInput,
  UpdateAuthenticatedUserInput,
} from "./auth.types.js";

export async function registerUser(
  data: RegisterUserInput,
): Promise<AuthResponse> {
  const { username, email, password } = data;

  await Promise.all([checkUsernameExist(username), checkEmailExist(email)]);

  const passwordHash = await doHash(password);

  const user = await createUser({ username, email, passwordHash });

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    role: user.role,
    isActive: user.isActive,
  };

  const token = generateToken(authUser);

  return {
    user: authUser,
    token,
  };
}

export async function loginUser(data: LoginUserInput): Promise<AuthResponse> {
  const { usernameOrEmail, password } = data;

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
    isActive: user.isActive,
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
  data: UpdateAuthenticatedUserInput,
): Promise<UserResponseDto> {
  const { username, email, password } = data;

  const updateData: UpdateUserDto = {};

  if (username) {
    await checkUsernameExist(username, id);

    updateData.username = username;
  }

  if (email) {
    await checkUsernameExist(email, id);

    updateData.email = email;
  }

  if (password) {
    updateData.passwordHash = await doHash(password);
  }

  const user = await updateUserProfileById(id, updateData);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}
