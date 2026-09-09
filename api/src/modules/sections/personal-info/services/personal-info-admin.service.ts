import {
  EditPersonalInfoInput,
  PersonalInfoQueryDto,
  PersonalInfoRepoQueryOptions,
  PersonalInfoResponseDto,
} from "@personal-info/types";
import { personalInfoRepository } from "@personal-info";
import { AppError, NotFoundError } from "@shared/errors";
import { Types } from "mongoose";

async function findPersonalInfos(query: PersonalInfoQueryDto) {
  const {
    filter = {},
    page = 1,
    limit = 10,
    sort = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (page - 1) * limit;
  const order = sortOrder === "asc" ? 1 : -1;

  const repoQuery: PersonalInfoRepoQueryOptions = {
    filter,
    skip,
    limit,
    sort,
    order,
  };

  const [personalInfos, total] = await Promise.all([
    personalInfoRepository.findAll(repoQuery),
    personalInfoRepository.getCount(filter),
  ]);

  return {
    data: personalInfos.map(
      (personalInfo) => new PersonalInfoResponseDto(personalInfo),
    ),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + personalInfos.length < total,
      hasPreviousPage: skip > 0,
    },
  };
}

async function findPersonalInfoById(id: string) {
  const personalInfo = await personalInfoRepository.findById(id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  const user = personalInfo.resume.user;

  if (!(user && !(user instanceof Types.ObjectId))) {
    throw new AppError("Expected resume.user to be populated", 500);
  }

  const info = new PersonalInfoResponseDto(personalInfo);

  return {
    ...info,
    resume: {
      ...info.resume,
      user: {
        id: user._id.toString(),
        username: user.username,
      },
    },
  };
}

async function editPersonalInfoById(id: string, data: EditPersonalInfoInput) {
  const personalInfo = await personalInfoRepository.updateById(id, data);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
}

async function removePersonalInfoById(id: string) {
  const personalInfo = await personalInfoRepository.deleteById(id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
}

export const personalInfoAdminService = {
  editPersonalInfoById,
  findPersonalInfoById,
  findPersonalInfos,
  removePersonalInfoById,
};
