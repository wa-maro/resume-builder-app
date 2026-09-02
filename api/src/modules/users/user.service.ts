import { doHash } from "../../security/password/password.service.js";
import {
  ConflictError,
  NotFoundError,
} from "../../shared/errors/http-errors.js";
import { hasResumeForUser } from "../resumes/resume.service.js";
import {
  create,
  findAll,
  emailExists,
  findById,
  usernameExists,
  findByUsernameOrEmail,
  getCount,
  updateByIdForUser,
  updateByIdForAdmin,
  createForAdmin,
  deleteByIdForAdmin,
  toggleStatusById,
} from "./user.repository.js";
import {
  CreateUserDto,
  CreateUserInputAdmin,
  UpdateUserAdminDto,
  UpdateUserDto,
  UpdateUserInputAdmin,
  UserQueryDto,
  UserRepoQueryOptions,
  UserResponseDto,
  UserRole,
} from "./user.types.js";

export async function findUsers(query: UserQueryDto) {
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
    findAll(repoQuery),
    getCount(filter),
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

export async function findUserById(id: string) {
  return findById(id);
}

export async function findUserByIdForAdmin(id: string) {
  const user = await findById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return new UserResponseDto(user);
}

export async function findUserByUsernameOrEmail(usernameOrEmail: string) {
  return findByUsernameOrEmail(usernameOrEmail);
}

export async function checkUsernameExist(
  username: string,
  excludeUserId?: string,
) {
  const exists = await usernameExists(username, excludeUserId);

  if (exists) {
    throw new ConflictError("Username already taken");
  }
}

export async function checkEmailExist(email: string, excludeUserId?: string) {
  const exists = await emailExists(email, excludeUserId);

  if (exists) {
    throw new ConflictError("Email already taken");
  }
}

export async function createUser(data: CreateUserDto) {
  return create(data);
}

export async function createUserForAdmin(data: CreateUserInputAdmin) {
  const { username, email, password, role } = data;

  await Promise.all([checkUsernameExist(username), checkEmailExist(email)]);

  const passwordHash = await doHash(password);

  const user = await createForAdmin({
    username,
    email,
    passwordHash,
    role,
  });

  return new UserResponseDto(user);
}

export async function updateUserProfileById(
  id: string,
  data: UpdateUserDto,
): Promise<UserResponseDto> {
  const user = await updateByIdForUser(id, data);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return new UserResponseDto(user);
}

export async function updateUserByIdForAdmin(
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
    updateData.passwordHash = await doHash(data.password);
  }

  const updatedUser = await updateByIdForAdmin(id, updateData);

  return new UserResponseDto(updatedUser!);
}

export async function deleteUserByIdForAdmin(
  id: string,
): Promise<UserResponseDto> {
  const user = await deleteByIdForAdmin(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return new UserResponseDto(user);
}

export async function toggleUserStatusById(id: string) {
  const user = await toggleStatusById(id);

  if (!user) {
    throw new NotFoundError("User doesn't exist");
  }

  return new UserResponseDto(user);
}

async function checkCanChangeRoleToAdmin(userId: string) {
  const hasResume = await hasResumeForUser(userId);

  if (hasResume) {
    throw new ConflictError(
      "Cannot change user role to admin while the user has a resume.",
    );
  }
}
