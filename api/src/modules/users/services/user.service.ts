import { ConflictError, NotFoundError } from "@shared/errors";
import { passwordService } from "@security/password";
import { resumeService } from "@resumes/services";
import { userRepository } from "@users";
import {
  CreateUserDto,
  CreateUserInputAdmin,
  UpdateUserAdminDto,
  UpdateUserDto,
  UpdateUserInputAdmin,
  UserMinimalResponseDto,
  UserQueryDto,
  UserRepoQueryOptions,
  UserResponseDto,
  UserRole,
} from "@users/types";

async function findUsers(query: UserQueryDto) {
  const {
    filter = {},
    page = 1,
    limit = 10,
    sort = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (page - 1) * limit;
  const order = sortOrder === "asc" ? 1 : -1;

  const repoQuery: UserRepoQueryOptions = {
    filter,
    skip,
    limit,
    sort,
    order,
  };

  const [users, total] = await Promise.all([
    userRepository.findAll(repoQuery),
    userRepository.getCount(filter),
  ]);

  return {
    data: users.map((user) => new UserResponseDto(user)),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + users.length < total,
      hasPreviousPage: skip > 0,
    },
  };
}

async function findUserById(id: string) {
  return userRepository.findById(id);
}

async function findUserByIdForAdmin(id: string): Promise<UserResponseDto> {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return new UserResponseDto(user);
}

async function findUserByUsernameOrEmail(usernameOrEmail: string) {
  return userRepository.findByUsernameOrEmail(usernameOrEmail);
}

async function checkUsernameExist(username: string, excludeUserId?: string) {
  const exists = await userRepository.usernameExists(username, excludeUserId);

  if (exists) {
    throw new ConflictError("Username already taken");
  }
}

async function checkEmailExist(
  email: string,
  excludeUserId?: string,
): Promise<void> {
  const exists = await userRepository.emailExists(email, excludeUserId);

  if (exists) {
    throw new ConflictError("Email already taken");
  }
}

async function createUser(data: CreateUserDto) {
  return userRepository.create(data);
}

async function createUserForAdmin(
  data: CreateUserInputAdmin,
): Promise<UserResponseDto> {
  const { username, email, password, role } = data;

  await Promise.all([checkUsernameExist(username), checkEmailExist(email)]);

  const passwordHash = await passwordService.doHash(password);

  const user = await userRepository.createForAdmin({
    username,
    email,
    passwordHash,
    role,
  });

  return new UserResponseDto(user);
}

async function updateUserProfileById(
  id: string,
  data: UpdateUserDto,
): Promise<UserResponseDto> {
  const user = await userRepository.updateByIdForUser(id, data);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return new UserResponseDto(user);
}

async function updateUserByIdForAdmin(
  id: string,
  data: UpdateUserInputAdmin,
): Promise<UserResponseDto> {
  const user = await findUserByIdForAdmin(id);

  const updateData: UpdateUserAdminDto = {};

  if (data.username !== undefined) {
    await checkUsernameExist(data.username, id);

    updateData.username = data.username;
  }

  if (data.email !== undefined) {
    await checkEmailExist(data.email, id);

    updateData.email = data.email;
  }

  if (data.role !== undefined) {
    if (user.role !== UserRole.ADMIN && data.role === UserRole.ADMIN) {
      await checkCanChangeRoleToAdmin(id);
    }

    updateData.role = data.role;
  }

  if (data.password !== undefined) {
    updateData.passwordHash = await passwordService.doHash(data.password);
  }

  const updatedUser = await userRepository.updateByIdForAdmin(id, updateData);

  return new UserResponseDto(updatedUser!);
}

async function deleteUserByIdForAdmin(
  id: string,
): Promise<UserMinimalResponseDto> {
  const user = await findUserByIdForAdmin(id);

  await checkCanDeleteUser(user.id);

  const deletedUser = await userRepository.deleteByIdForAdmin(id);

  if (!deletedUser) {
    throw new NotFoundError("User not found");
  }

  return new UserMinimalResponseDto(
    deletedUser._id.toString(),
    deletedUser.username,
    user.isActive,
  );
}

async function toggleUserStatusById(
  id: string,
): Promise<UserMinimalResponseDto> {
  const user = await userRepository.toggleStatusById(id);

  if (!user) {
    throw new NotFoundError("User doesn't exist");
  }

  return new UserMinimalResponseDto(
    user._id.toString(),
    user.username,
    user.isActive,
  );
}

async function checkCanChangeRoleToAdmin(userId: string): Promise<void> {
  const hasResume = await resumeService.hasResumeForUser(userId);

  if (hasResume) {
    throw new ConflictError(
      "Cannot change user role to admin while the user has a resume.",
    );
  }
}

async function checkCanDeleteUser(userId: string): Promise<void> {
  const hasResume = await resumeService.hasResumeForUser(userId);

  if (hasResume) {
    throw new ConflictError("Cannot delete user while the user has a resume.");
  }
}

export const userService = {
  createUser,
  checkEmailExist,
  findUserById,
  checkUsernameExist,
  findUserByUsernameOrEmail,
  updateUserProfileById,
};

export const userAdminService = {
  createUserForAdmin,
  deleteUserByIdForAdmin,
  findUserByIdForAdmin,
  findUsers,
  toggleUserStatusById,
  updateUserByIdForAdmin,
};
