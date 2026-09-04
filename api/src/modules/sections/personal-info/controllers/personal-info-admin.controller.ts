import { Request, Response } from "express";
import { BadRequestError } from "@shared/errors";
import { SortOrderDto } from "@shared/types";
import {
  editPersonalInfoById,
  getPersonalInfoForAdmin,
  getPersonalInfosForAdmin,
  removePersonalInfo,
} from "../personal-info.service.js";
import {
  Disability,
  EditPersonalInfoInput,
  Gender,
  MaritalStatus,
  PersonalInfoQueryDto,
  PersonalInfoSortField,
} from "../personal-info.types.js";

export async function getPersonalInfos(req: Request, res: Response) {
  const {
    page,
    limit,
    sort,
    sortOrder,
    search,
    gender,
    maritalStatus,
    disabilities,
  } = req.query;

  const query: PersonalInfoQueryDto = {
    filter: {},
  };

  if (page) query.page = Number(page);

  if (limit) query.limit = Number(limit);

  if (sort) query.sort = sort as PersonalInfoSortField;

  if (sortOrder) query.sortOrder = sortOrder as SortOrderDto;

  if (search) query.filter!.search = search as string;

  if (gender) query.filter!.gender = gender as Gender;

  if (maritalStatus)
    query.filter!.maritalStatus = maritalStatus as MaritalStatus;

  if (disabilities) query.filter!.disabilities = disabilities as Disability[];

  return res.status(200).json({
    success: true,
    message: "Personal informations retrieved successfully",
    ...(await getPersonalInfosForAdmin(query)),
  });
}

export async function getPersonalInfo(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Personal information retrieved successfully",
    data: await getPersonalInfoForAdmin(id),
  });
}

export async function updatePersonalInfo(req: Request, res: Response) {
  const { id } = req.params;
  const data: EditPersonalInfoInput = req.body;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Personal information updated successfully",
    data: await editPersonalInfoById(id, data),
  });
}

export async function deletePersonalInfo(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  await removePersonalInfo(id);

  return res.status(200).json({
    success: true,
    message: "Personal information delete successfully",
    data: null,
  });
}
