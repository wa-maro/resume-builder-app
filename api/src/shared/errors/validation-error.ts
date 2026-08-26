import { AppError } from "./app-error.js";
import Joi from "joi";

export class ValidationError extends AppError {
  public readonly details: Joi.ValidationErrorItem[];

  constructor(message: string, details: Joi.ValidationErrorItem[]) {
    super(message, 400);

    this.details = details;
  }
}
