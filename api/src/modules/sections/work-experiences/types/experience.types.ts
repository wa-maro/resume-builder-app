import { Types } from "mongoose";

export interface Company {
  name: string;
  location: string;
}

export interface WorkExperience {
  resume: Types.ObjectId;
  position: string;
  company: Company;
  responsibilities: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
