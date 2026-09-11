import { isMonthYearAfter, isValidMonthYear } from "@shared/utils";
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

WorkExperienceSchema.pre("validate", function () {
  if (this.currentlyWorking) {
    if (this.endDate !== undefined) {
      this.invalidate(
        "endDate",
        "End date must not be provided when currently working is true.",
      );
    }

    return;
  }

  if (!this.endDate) {
    this.invalidate(
      "endDate",
      "End date is required when currently working is false.",
    );
    return;
  }

  if (!isMonthYearAfter(this.startDate, this.endDate)) {
    this.invalidate(
      "endDate",
      "End date must be after or equal to the start date.",
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
