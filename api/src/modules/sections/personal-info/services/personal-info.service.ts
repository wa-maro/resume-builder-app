import { Types } from "mongoose";
import { AppError, ConflictError, NotFoundError } from "@shared/errors";
import { resumeService } from "@resumes/services";
import { personalInfoRepository } from "@personal-info";
import {
  AddPersonalInfoInput,
  EditPersonalInfoInput,
  PersonalInfoQueryDto,
  PersonalInfoRepoQueryOptions,
  PersonalInfoResponseDto,
} from "@personal-info/types";

async function addPersonalInfo(resumeId: string, data: AddPersonalInfoInput) {
  const resume = await resumeService.findResumeById(resumeId);

  const existingInfo = await personalInfoRepository.findByResumeId(resume.id);

  if (existingInfo) {
    throw new ConflictError("Personal information already exists");
  }

  const personalInfo = await personalInfoRepository.createForResume(
    resumeId,
    data,
  );

  return new PersonalInfoResponseDto(personalInfo);
}

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

async function findPersonalInfoByResumeId(resumeId: string) {
  const resume = await resumeService.findResumeById(resumeId);

  const personalInfo = await personalInfoRepository.findByResumeAndId(
    resume.id,
  );

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
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

async function editPersonalInfoByResumeId(
  resumeId: string,
  id: string,
  data: EditPersonalInfoInput,
) {
  const resume = await resumeService.findResumeById(resumeId);

  const personalInfo = await personalInfoRepository.updateByResumeAndId(
    resume.id,
    id,
    data,
  );

  if (!personalInfo) {
    throw new NotFoundError("Personal information doesn't exists");
  }

  return new PersonalInfoResponseDto(personalInfo);
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

export const personalInfoService = {
  addPersonalInfo,
  editPersonalInfoByResumeId,
  findPersonalInfoByResumeId,
};

export const personalInfoAdminService = {
  editPersonalInfoById,
  findPersonalInfoById,
  findPersonalInfos,
  removePersonalInfo: removePersonalInfoById,
};
