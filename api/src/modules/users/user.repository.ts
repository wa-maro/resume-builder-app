import {
  CreateUserAdminDto,
  CreateUserDto,
  UpdateUserAdminDto,
  UpdateUserDto,
  UserFilter,
  UserRepoQueryOptions,
} from "@users/types";
import { UserModel } from "@users";

async function findAll(query: UserRepoQueryOptions) {
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

async function getCount(filter: UserFilter) {
  const mongoFilter = buildUserMongoFilter(filter);
  return UserModel.countDocuments(mongoFilter).exec();
}

async function findById(id: string) {
  return UserModel.findById(id).populate("resume", "_id title").exec();
}

async function findByUsernameOrEmail(usernameOrEmail: string) {
  return UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    isActive: true,
  })
    .select("+passwordHash")
    .exec();
}

async function usernameExists(username: string, excludeUserId?: string) {
  return UserModel.exists({
    username,
    ...(excludeUserId && { _id: { $ne: excludeUserId } }),
  });
}

async function emailExists(email: string, excludeUserId?: string) {
  return UserModel.exists({
    email,
    ...(excludeUserId && { _id: { $ne: excludeUserId } }),
  });
}

async function create(data: CreateUserDto) {
  return UserModel.create(data);
}

async function createForAdmin(data: CreateUserAdminDto) {
  return UserModel.create(data);
}

async function updateByIdForUser(id: string, data: UpdateUserDto) {
  return UserModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).exec();
}

async function updateByIdForAdmin(id: string, data: UpdateUserAdminDto) {
  return UserModel.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).exec();
}

async function deleteByIdForAdmin(id: string) {
  return UserModel.findByIdAndDelete(id).exec();
}

async function toggleStatusById(id: string) {
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

export const userRepository = {
  findAll,
  getCount,
  findById,
  findByUsernameOrEmail,
  usernameExists,
  emailExists,
  create,
  createForAdmin,
  updateByIdForUser,
  updateByIdForAdmin,
  deleteByIdForAdmin,
  toggleStatusById,
};
