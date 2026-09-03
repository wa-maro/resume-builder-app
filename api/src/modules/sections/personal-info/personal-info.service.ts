import { Types } from "mongoose";
import {
  ConflictError,
  NotFoundError,
} from "../../../shared/errors/http-errors.js";
import { findResumeById } from "../../resumes/resume.service.js";
import {
  createForResume,
  deleteById,
  findAll,
  findById,
  findByResumeAndId,
  findByResumeId,
  getCount,
  updateById,
  updateByResumeAndId,
} from "./personal-info.repository.js";
import {
  AddPersonalInfoInput,
  EditPersonalInfoInput,
  PersonalInfoQueryDto,
  PersonalInfoRepoQueryOptions,
  PersonalInfoResponseDto,
} from "./personal-info.types.js";
import { AppError } from "../../../shared/errors/app-error.js";

export async function addPersonalInfo(
  resumeId: string,
  data: AddPersonalInfoInput,
) {
  const resume = await findResumeById(resumeId);

  const existingInfo = await findByResumeId(resume.id);

  if (existingInfo) {
    throw new ConflictError("Personal information already exists");
  }

  const personalInfo = await createForResume(resumeId, data);

  return new PersonalInfoResponseDto(personalInfo);
}

export async function getPersonalInfosForAdmin(query: PersonalInfoQueryDto) {
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
    findAll(repoQuery),
    getCount(filter),
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

export const getPersonalInfobyResume = async (resumeId: string) => {
  const resume = await findResumeById(resumeId);

  const personalInfo = await findByResumeAndId(resume.id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
};

export const getPersonalInfoForAdmin = async (id: string) => {
  const personalInfo = await findById(id);

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
};

export async function editPersonalInfoByResume(
  resumeId: string,
  id: string,
  data: EditPersonalInfoInput,
) {
  const resume = await findResumeById(resumeId);

  const personalInfo = await updateByResumeAndId(resume.id, id, data);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
}

export async function editPersonalInfoById(
  id: string,
  data: EditPersonalInfoInput,
) {
  const personalInfo = await updateById(id, data);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
}

export const removePersonalInfo = async (id: string) => {
  const personalInfo = await deleteById(id);

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
};
