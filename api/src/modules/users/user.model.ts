import { model, Schema, type HydratedDocument } from "mongoose";
import { UserRole, UserWithCredential } from "./user.types.js";

export type UserDocument = HydratedDocument<UserWithCredential>;

const UserSchema = new Schema<UserWithCredential>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    passwordHash: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.virtual("resume", {
  ref: "Resume",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

const UserModel = model<UserWithCredential>("User", UserSchema);

export default UserModel;
