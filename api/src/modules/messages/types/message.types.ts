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
