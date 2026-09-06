export interface FAQ {
  question: string;
  answer: string;
  order?: number; // optional: for sorting
  isActive: boolean; // optional: toggle visibility
  createdAt: Date;
  updatedAt: Date;
}
