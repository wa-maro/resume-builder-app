import { HydratedDocument, model, Schema } from "mongoose";
import {
  Disability,
  Gender,
  MaritalStatus,
  PersonalInfo,
} from "./personal-info.types.js";

export type PersonalInfoDocument = HydratedDocument<PersonalInfo>;

const PersonalInfoSchema = new Schema<PersonalInfo>(
  {
    resume: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    nationality: {
      type: String,
      trim: true,
    },

    placeOfDomicile: {
      type: String,
      trim: true,
    },

    maritalStatus: {
      type: String,
      enum: Object.values(MaritalStatus),
    },

    disabilities: {
      type: [String],
      enum: Object.values(Disability),
      default: [Disability.NONE],
      validate: {
        validator: function (arr: Disability[]) {
          return !(arr.includes(Disability.NONE) && arr.length > 1);
        },
        message:
          "If 'none' is selected, no other disabilities can be selected.",
      },
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    physicalAddress: {
      type: String,
      required: true,
      trim: true,
    },
  },

  {
    timestamps: true,
  },
);

const PersonalInfoModel = model<PersonalInfo>(
  "PersonalInformation",
  PersonalInfoSchema,
);

export default PersonalInfoModel;
