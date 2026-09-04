import { envConfig } from "@config";
import bcrypt from "bcryptjs";

/**
 * Hash the password in plain text
 * @param password string
 * @returns romise string
 */
export const doHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, envConfig.bcryptRounds);
};

/**
 * Compare plain password against encripted version
 * @param password string
 * @param hashedPassword string
 * @returns Promise boolean
 */
export const compareHash = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
