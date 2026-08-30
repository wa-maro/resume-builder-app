import { NotFoundError } from "../../shared/errors/http-errors.js";
import {
  create,
  findAll,
  findById,
  findByUsernameOrEmail,
  findOneBy,
  getCount,
  updateById,
} from "./user.repository.js";
import {
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

export async function findUserBy(username: string, email: string) {
  return findOneBy(username, email);
}

export async function createUser(
  username: string,
  email: string,
  passwordHash: string,
) {
  return create(username, email, passwordHash);
}

export async function updateUserProfileById(
  id: string,
  data: { username: string; email: string; passwordHash: string },
) {
  const user = await updateById(id, data);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  return new UserResponseDto(user);
}
