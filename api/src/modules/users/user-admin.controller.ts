import type { Request, Response } from "express";
import { SortOrderDto } from "@shared/types";
import { BadRequestError } from "@shared/errors";
import { userAdminService } from "@users/services";
import {
  CreateUserInputAdmin,
  UpdateUserInputAdmin,
  UserQueryDto,
  UserRole,
  UserSortField,
} from "@users/types";

async function createUser(req: Request, res: Response) {
  const data: CreateUserInputAdmin = req.body;

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    data: await userAdminService.createUserForAdmin(data),
  });
}

async function getUsers(req: Request, res: Response) {
  const { page, limit, sort, sortOrder, search, role, isActive } = req.query;

  const query: UserQueryDto = {
    filter: {},
  };

  if (page) query.page = Number(page);

  if (limit) query.limit = Number(limit);

  if (sort) query.sort = sort as UserSortField;

  if (sortOrder) query.sortOrder = sortOrder as SortOrderDto;

  if (search) query.filter!.search = search as string;

  if (role) query.filter!.role = role as UserRole;

  if (isActive) query.filter!.isActive = isActive === "true";

  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    ...(await userAdminService.findUsers(query)),
  });
}

async function getUser(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: await userAdminService.findUserByIdForAdmin(id),
  });
}

async function editUser(req: Request, res: Response) {
  const { id } = req.params;
  const data: UpdateUserInputAdmin = req.body;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: await userAdminService.updateUserByIdForAdmin(id, data),
  });
}

async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  await userAdminService.deleteUserByIdForAdmin(id);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: null,
  });
}

async function toggleUserStatus(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  const user = await userAdminService.toggleUserStatusById(id);

  const status = user.isActive ? "activated" : "deactivated";

  return res.status(200).json({
    success: true,
    message: `User ${status} successfully`,
    data: user,
  });
}

export const userAdminController = {
  createUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
  toggleUserStatus,
};
