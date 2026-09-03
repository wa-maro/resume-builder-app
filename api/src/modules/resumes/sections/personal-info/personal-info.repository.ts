import PersonalInfoModel from "./personal-info.model.js";
import {
  AddPersonalInfoInput,
  EditPersonalInfoInput,
} from "./personal-info.types.js";

export async function createForResume(
  resumeId: string,
  data: AddPersonalInfoInput,
) {
  return PersonalInfoModel.create({ resume: resumeId, ...data });
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

export async function findByResumeAndId(resumeId: string, id: string) {
  return PersonalInfoModel.findOne({
    _id: id,
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
