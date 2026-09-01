import UserModel from "./user.model.js";
import {
  CreateUserAdminDto,
  CreateUserDto,
  UpdateUserAdminDto,
  UpdateUserDto,
  UserFilter,
  UserRepoQueryOptions,
} from "./user.types.js";

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
    .limit(limit)
    .exec();
}

export async function getCount(filter: UserFilter) {
  const mongoFilter = buildUserMongoFilter(filter);
  return UserModel.countDocuments(mongoFilter).exec();
}

export async function findById(id: string) {
  return UserModel.findById(id).exec();
}

export async function findByUsernameOrEmail(usernameOrEmail: string) {
  return UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    isActive: true,
  })
    .select("+passwordHash")
    .exec();
}

export async function usernameExists(username: string) {
  return UserModel.exists({ username });
}

export async function emailExists(email: string) {
  return UserModel.exists({ email });
}

export async function create(data: CreateUserDto) {
  return UserModel.create(data);
}

export async function createForAdmin(data: CreateUserAdminDto) {
  return UserModel.create(data);
}

export async function updateByIdForUser(id: string, data: UpdateUserDto) {
  return UserModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).exec();
}

export async function updateByIdForAdmin(id: string, data: UpdateUserAdminDto) {
  return UserModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).exec();
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
