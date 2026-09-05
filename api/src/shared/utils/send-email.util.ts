import { envConfig } from "@config";
import { SendEmailFieldOptions } from "@shared/types";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: envConfig.smtpOptions.host,
  port: envConfig.smtpOptions.port,
  secure: envConfig.smtpOptions.secure,
  auth: {
    user: envConfig.smtpOptions.user,
    pass: envConfig.smtpOptions.pass,
  },
});

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: SendEmailFieldOptions) => {
  return transporter.sendMail({
    from: `"Admin" <${envConfig.smtpOptions.user}>`,
    to,
    subject,
    text,
    html,
  });
};
