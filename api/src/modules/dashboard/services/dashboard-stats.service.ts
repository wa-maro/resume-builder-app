import { MessageModel } from "@messages";
import { ResumeModel } from "@resumes";
import { UserModel } from "@users";

export async function adminDashboardStats() {
  return {
    resumes: await resumeStats(),
    users: await userstats(),
    messages: await messageStats(),
  };
}

async function resumeStats() {
  const [total, active, recent] = await Promise.all([
    ResumeModel.countDocuments(),
    ResumeModel.countDocuments({ isActive: true }),
    ResumeModel.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("_id title user createdAt")
      .populate("user", "_id username email createdAt"),
  ]);

  return { total, active, recent };
}

async function userstats() {
  const [total, active, recent] = await Promise.all([
    UserModel.countDocuments(),
    UserModel.countDocuments({ isActive: true }),
    UserModel.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("username email role createdAt"),
  ]);

  return { total, active, recent };
}

async function messageStats() {
  const [total, replied, pending, recent] = await Promise.all([
    MessageModel.countDocuments({}),
    MessageModel.countDocuments({ isReplied: true }),
    MessageModel.countDocuments({ isReplied: false }),
    MessageModel.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("name email message isReplied createdAt"),
  ]);

  return { total, replied, pending, recent };
}
