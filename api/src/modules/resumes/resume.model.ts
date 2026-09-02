import { Schema, model, type HydratedDocument } from "mongoose";
import { BaseResume, Declaration } from "./resume.types.js";

export type ResumeDocument = HydratedDocument<BaseResume>;

const DeclarationSchema = new Schema<Declaration>(
  {
    statement: {
      type: String,
      trim: true,
      default: "",
    },

    signature: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
    },
  },
  { _id: false },
);

const ResumeSchema = new Schema<BaseResume>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
      default: "",
    },

    avatar: {
      type: String,
      trim: true,
    },

    declaration: {
      type: DeclarationSchema,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

ResumeSchema.virtual("personalInfo", {
  ref: "PersonalInformation",
  localField: "_id",
  foreignField: "resume",
  justOne: true,
});

const ResumeModel = model<BaseResume>("Resume", ResumeSchema);

export default ResumeModel;
