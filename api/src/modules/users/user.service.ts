import {
  ConflictError,
  NotFoundError,
} from "../../shared/errors/http-errors.js";
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
} from "./user.repository.js";
import {
  CreateUserAdminDto,
  CreateUserDto,
  UpdateUserAdminDto,
  UpdateUserDto,
  UserQueryDto,
  UserRepoQueryOptions,
  UserResponseDto,
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

export async function findUserByUsernameOrEmail(usernameOrEmail: string) {
  return findByUsernameOrEmail(usernameOrEmail);
}

export async function checkUsernameExist(username: string) {
  const exists = await usernameExists(username);

  if (exists) {
    throw new ConflictError("Username already taken");
  }
}

export async function checkEmailExist(email: string) {
  const exists = await emailExists(email);

  if (exists) {
    throw new ConflictError("Email already taken");
  }
}

export async function createUser(data: CreateUserDto) {
  return create(data);
}

export async function createUserForAdmin(data: CreateUserAdminDto) {
  return create(data);
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
  data: UpdateUserAdminDto,
): Promise<UserResponseDto> {
  const user = await updateByIdForAdmin(id, data);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return new UserResponseDto(user);
}
