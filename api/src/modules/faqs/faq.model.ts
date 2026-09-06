import { FAQ } from "@faqs/types";
import { HydratedDocument, model, Schema } from "mongoose";

export type FAQDocument = HydratedDocument<FAQ>;

const FAQSchema = new Schema<FAQ>(
  {
    question: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const FAQModel = model<FAQ>("FAQ", FAQSchema);
