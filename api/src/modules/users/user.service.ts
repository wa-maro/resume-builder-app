import { findAll, getCount } from "./user.repository.js";
import { UserQueryDto, UserRepoQueryOptions } from "./user.types.js";

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
    data: users,
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
