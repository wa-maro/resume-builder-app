import "dotenv/config";
import Joi from "joi";

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "test", "production")
    .default("development"),
  PORT: Joi.number().port().default(3000),
}).unknown();

const { error, value } = schema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(`\n${error.message}`);
}

export const env = {
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
};
