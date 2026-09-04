import Joi from "joi";
import { AppError } from "./app-error.js";

export class ValidationError extends AppError {
  public readonly details: Joi.ValidationErrorItem[];

  constructor(message: string, details: Joi.ValidationErrorItem[]) {
    super(message, 400);

    this.details = details;
  }
}

export class FileRequiredError extends AppError {
  constructor(message = "File is required") {
    super(message, 400);
  }
}
