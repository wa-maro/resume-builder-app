import { RepositoryQueryOptions } from "@shared/types";

export interface FAQ {
  question: string;
  answer: string;
  order?: number; // optional: for sorting
  isActive: boolean; // optional: toggle visibility
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQFilter {
  search?: string;
  isActive?: boolean;
}

export type FAQSortFields = Pick<
  FAQ,
  "createdAt" | "updatedAt" | "question" | "order"
>;

export type FAQSortField = keyof FAQSortFields;

export type FAQRepoQueryOptions = RepositoryQueryOptions<
  FAQFilter,
  FAQSortFields
>;
