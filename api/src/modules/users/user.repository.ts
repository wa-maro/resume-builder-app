import {
  CreateUserAdminDto,
  CreateUserDto,
  UpdateUserAdminDto,
  UpdateUserDto,
  UserFilter,
  UserRepoQueryOptions,
} from "@users/types";
import { UserModel } from "@users";

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
    .populate("resume", "_id title")
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
  return UserModel.findById(id).populate("resume", "_id title").exec();
}

export async function findByUsernameOrEmail(usernameOrEmail: string) {
  return UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    isActive: true,
  })
    .select("+passwordHash")
    .exec();
}

export async function usernameExists(username: string, excludeUserId?: string) {
  return UserModel.exists({
    username,
    ...(excludeUserId && { _id: { $ne: excludeUserId } }),
  });
}

export async function emailExists(email: string, excludeUserId?: string) {
  return UserModel.exists({
    email,
    ...(excludeUserId && { _id: { $ne: excludeUserId } }),
  });
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

export async function deleteByIdForAdmin(id: string) {
  return UserModel.findByIdAndDelete(id).exec();
}

export async function toggleStatusById(id: string) {
  return await UserModel.findByIdAndUpdate(
    id,
    [{ $set: { isActive: { $not: ["$isActive"] } } }],
    {
      returnDocument: "after",
      updatePipeline: true,
    },
  );
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
