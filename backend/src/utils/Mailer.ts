import { transporter } from "../config/emailTransporter";
import { User } from "../models/User";
import { BadRequestError } from "./errors/BadRequestError";

export const welcomeEmail = (user: User, password: string) => {
  const mailData = {
    from: "developer.pr@gmail.com",
    to: user.email,
    subject: `You have been invited as ${user.role.toUpperCase()} in NewsPortal`,
    text: `Welcome to our NewsPortal as ${user.role.toUpperCase()}. Your credentials are:
        Email: ${user.email}
        Password: ${password}
        Username: ${user.username}

        Thankyou.
    `,
  };

  return transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.log(error);
      new BadRequestError(JSON.stringify(error));
      return;
    }
    console.log("Email sent successfully");
  });
};

export const forgetEmail = (user: User, password: string) => {
  const mailData = {
    from: "developer.pr@gmail.com",
    to: user.email,
    subject: `Hello ${user.name}, your new credentials is:
        Password: ${password}

        Thankyou.
    `,
  };

  return transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.log(error);
      new BadRequestError(JSON.stringify(error));
      return;
    }
    console.log("Email sent successfully");
  });
};
