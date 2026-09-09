import { NotFoundError, UnauthorizedError } from "@shared/errors";
import { jwtTokenService } from "@security/jwt-token";
import { passwordService } from "@security/password";
import { userService } from "@users/services";
import { UpdateUserDto, UserResponseDto } from "@users/types";
import {
  AuthResponse,
  AuthUser,
  LoginUserInput,
  RegisterUserInput,
  UpdateAuthenticatedUserInput,
} from "./auth.types.js";

async function register(data: RegisterUserInput): Promise<AuthResponse> {
  const { username, email, password } = data;

  await Promise.all([
    userService.checkUsernameExist(username),
    userService.checkEmailExist(email),
  ]);

  const passwordHash = await passwordService.doHash(password);

  const user = await userService.createUser({ username, email, passwordHash });

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    role: user.role,
    isActive: user.isActive,
  };

  const token = jwtTokenService.generateToken(authUser);

  return {
    user: authUser,
    token,
  };
}

async function login(data: LoginUserInput): Promise<AuthResponse> {
  const { usernameOrEmail, password } = data;

  const user = await userService.findUserByUsernameOrEmail(usernameOrEmail);

  if (!user) {
    throw new UnauthorizedError("Wrong credentials");
  }

  const isMatch = await passwordService.compareHash(
    password,
    user.passwordHash,
  );

  if (!isMatch) {
    throw new UnauthorizedError("Wrong credentials");
  }

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    role: user.role,
    isActive: user.isActive,
  };

  const token = jwtTokenService.generateToken(authUser);

  return {
    user: authUser,
    token,
  };
}

async function findAuthenticatedUser(id: string): Promise<UserResponseDto> {
  const user = await userService.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return new UserResponseDto(user);
}

async function updateAuthenticatedUser(
  id: string,
  data: UpdateAuthenticatedUserInput,
): Promise<UserResponseDto> {
  const { username, email, password } = data;

  const updateData: UpdateUserDto = {};

  if (username) {
    await userService.checkUsernameExist(username, id);

    updateData.username = username;
  }

  if (email) {
    await userService.checkUsernameExist(email, id);

    updateData.email = email;
  }

  if (password) {
    updateData.passwordHash = await passwordService.doHash(password);
  }

  const user = await userService.updateUserProfileById(id, updateData);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}

export const authService = {
  register,
  login,
  findAuthenticatedUser,
  updateAuthenticatedUser,
};
