import PersonalInfoModel from "./personal-info.model.js";
import {
  AddPersonalInfoInput,
  Disability,
  EditPersonalInfoInput,
  Gender,
  MaritalStatus,
  PersonalInfoFilter,
  PersonalInfoRepoQueryOptions,
} from "./personal-info.types.js";

export async function createForResume(
  resumeId: string,
  data: AddPersonalInfoInput,
) {
  return PersonalInfoModel.create({ resume: resumeId, ...data });
}

export async function findAll(query: PersonalInfoRepoQueryOptions) {
  const {
    filter = {},
    skip = 0,
    limit = 10,
    sort = "createdAt",
    order = -1,
  } = query;

  const mongoFilter = buildPersonalInfoMongoFilter(filter);

  return PersonalInfoModel.find(mongoFilter)
    .populate("resume", "_id title")
    .sort({
      [sort]: order,
      _id: -1,
    })
    .skip(skip)
    .limit(limit)
    .exec();
}

export async function getCount(filter: PersonalInfoFilter) {
  const mongoFilter = buildPersonalInfoMongoFilter(filter);
  return PersonalInfoModel.countDocuments(mongoFilter).exec();
}

export async function findById(id: string) {
  return PersonalInfoModel.findById(id)
    .populate({
      path: "resume",
      select: "_id title user",
      populate: { path: "user", select: "_id username" },
    })
    .exec();
}

export async function findByResumeId(resumeId: string) {
  return PersonalInfoModel.findOne({ resume: resumeId }).exec();
}

export async function findByResumeAndId(resumeId: string) {
  return PersonalInfoModel.findOne({
    resume: resumeId,
  }).exec();
}

export async function updateById(id: string, data: EditPersonalInfoInput) {
  return PersonalInfoModel.findByIdAndUpdate(
    id,
    { $set: data },
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).exec();
}

export async function updateByResumeAndId(
  resumeId: string,
  id: string,
  data: EditPersonalInfoInput,
) {
  return PersonalInfoModel.findOneAndUpdate(
    { _id: id, resume: resumeId },
    { $set: data },
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).exec();
}

export async function deleteById(id: string) {
  return PersonalInfoModel.findByIdAndDelete(id).exec();
}

function buildPersonalInfoMongoFilter(filter: PersonalInfoFilter) {
  const { search, disabilities, ...rest } = filter;

  const mongoFilter: {
    gender?: Gender;
    maritalStatus?: MaritalStatus;
    disabilities?: { $in: Disability[] };
    $or?: Array<{
      fullName?: { $regex: string; $options: "i" };
      physicalAddress?: { $regex: string; $options: "i" };
      placeOfDomicile?: { $regex: string; $options: "i" };
      nationality?: { $regex: string; $options: "i" };
    }>;
  } = {
    ...rest,
  };

  if (disabilities?.length) {
    mongoFilter.disabilities = {
      $in: disabilities,
    };
  }

  if (search) {
    mongoFilter.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { physicalAddress: { $regex: search, $options: "i" } },
      { placeOfDomicile: { $regex: search, $options: "i" } },
      { nationality: { $regex: search, $options: "i" } },
    ];
  }

  return mongoFilter;
}
