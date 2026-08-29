import "dotenv/config";
import Joi from "joi";
import { SignOptions } from "jsonwebtoken";

interface EnvConfig {
  mongodbUri: string;
  nodeEnv: "development" | "test" | "production";
  port: number;
  frontendOrigin: string[];
  jwtSecret: string;
  jwtExpiration: NonNullable<SignOptions["expiresIn"]>;
  bcryptRounds: number;
}

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

  JWT_SECRET: Joi.string().min(32).required(),

  JWT_EXPIRATION: Joi.string().required(),

  BCRYPT_ROUNDS: Joi.number().integer().min(10).max(15).default(12),
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

export const envConfig: EnvConfig = {
  mongodbUri: value.MONGODB_URI,
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
  frontendOrigin: value.FRONTEND_ORIGIN,
  jwtSecret: value.JWT_SECRET,
  jwtExpiration: value.JWT_EXPIRATION,
  bcryptRounds: value.BCRYPT_ROUNDS,
};
