import { isMonthYearBeforeOrEqual, isValidMonthYear } from "@shared/utils";
import { Company, WorkExperience } from "@work-experiences/types";
import { HydratedDocument, model, Schema, Types } from "mongoose";

export type WorkExperienceDocument = HydratedDocument<WorkExperience>;

const monthYearValidator = {
  validator: (value: string) => isValidMonthYear(value),
  message: ({ value }: { value: string }) =>
    `${value} is not a valid date format. Use "MMM YYYY" (e.g., Jan 2024).`,
};

const CompanySchema = new Schema<Company>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const WorkExperienceSchema = new Schema<WorkExperience>(
  {
    resume: {
      type: Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: CompanySchema,
      required: true,
    },

    responsibilities: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: String,
      required: true,
      trim: true,
      validate: monthYearValidator,
    },

    endDate: {
      type: String,
      trim: true,
      validate: monthYearValidator,
    },

    currentlyWorking: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

WorkExperienceSchema.pre("validate", async function () {
  if (this.currentlyWorking) {
    this.endDate = undefined;
    return;
  }

  if (!this.endDate) {
    this.invalidate(
      "endDate",
      "End date is required when currently working is false.",
    );
    return;
  }

  if (!isMonthYearBeforeOrEqual(this.startDate, this.endDate)) {
    this.invalidate(
      "endDate",
      "End date must be after or equal to start date.",
    );
  }
});

WorkExperienceSchema.index(
  {
    resume: 1,
    "company.name": 1,
    position: 1,
    startDate: 1,
  },
  { unique: true },
);

export const WorkExperienceModel = model(
  "WorkExperience",
  WorkExperienceSchema,
);
