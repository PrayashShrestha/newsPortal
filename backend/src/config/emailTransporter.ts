import nodemailer from "nodemailer";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();
export const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp.ethereal.email",
  auth: {
    user: process.env.ADMINEMAIL,
    pass: process.env.ADMINPASS,
  },
});
