import { Types } from "mongoose";

export interface Declaration {
  statement: string;
  signature?: string;
  date?: Date;
}

export interface BaseResume {
  user: Types.ObjectId;
  title: string;
  summary: string;
  avatar?: string | undefined;
  declaration?: Declaration | undefined;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resume extends BaseResume {
  id: string;
}
