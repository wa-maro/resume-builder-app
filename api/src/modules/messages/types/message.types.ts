import { RepositoryQueryOptions } from "@shared/types";

export interface Message {
  name: string;
  email: string;
  message: string;
  reply: string;
  isReplied?: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageFilter {
  search?: string;
  isReplied?: boolean;
  isActive?: boolean;
}

export type MessageSortFields = Pick<
  Message,
  "createdAt" | "updatedAt" | "name"
>;

export type MessageSortField = keyof MessageSortFields;

export type MessageRepoQueryOptions = RepositoryQueryOptions<
  MessageFilter,
  MessageSortFields
>;
