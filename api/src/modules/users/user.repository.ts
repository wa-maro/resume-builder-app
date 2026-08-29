import UserModel from "./user.model.js";
import { UserFilter, UserRepoQueryOptions } from "./user.types.js";

export async function findAll(query: UserRepoQueryOptions) {
  const {
    filter = {},
    skip = 0,
    limit = 10,
    sort = "createdAt",
    order = -1,
  } = query;

  const mongoFilter = buildUserMongoFilter(filter);

  return UserModel.find(mongoFilter)
    .sort({
      [sort]: order,
      _id: -1,
    })
    .skip(skip)
    .limit(limit);
}

export async function getCount(filter: UserFilter) {
  const mongoFilter = buildUserMongoFilter(filter);
  return UserModel.countDocuments(mongoFilter).exec();
}

export async function findById(id: string) {
  return UserModel.findById(id);
}

function buildUserMongoFilter(filter: UserFilter) {
  const { search, ...rest } = filter;

  if (!search) {
    return rest;
  }

  return {
    ...rest,
    $or: [
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };
}
