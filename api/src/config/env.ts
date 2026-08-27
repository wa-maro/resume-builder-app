import "dotenv/config";
import Joi from "joi";

const schema = Joi.object({
  MONGODB_URI: Joi.string().uri().required(),

  NODE_ENV: Joi.string()
    .valid("development", "test", "production")
    .default("development"),

  PORT: Joi.number().port().default(3000),

  FRONTEND_ORIGIN: Joi.array()
    .items(
      Joi.string().uri({
        scheme: ["http", "https"],
      }),
    )
    .min(1)
    .required(),
}).unknown();

const config = {
  ...process.env,
  FRONTEND_ORIGIN: process.env["FRONTEND_ORIGIN"]
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

const { error, value } = schema.validate(config, {
  abortEarly: false,
});

if (error) {
  throw new Error(`\n${error.message}`);
}

export const env = {
  mongodbUri: value.MONGODB_URI,
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
  frontendOrigin: value.FRONTEND_ORIGIN,
};
