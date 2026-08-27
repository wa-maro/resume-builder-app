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

  return UserModel.find(filter)
    .sort({
      [sort]: order,
      _id: -1,
    })
    .skip(skip)
    .limit(limit);
}

export async function getCount(filter: UserFilter) {
  return UserModel.countDocuments(filter).exec();
}
