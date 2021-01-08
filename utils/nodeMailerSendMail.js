import nodemailer from "nodemailer";
import appConfig from "../config/env";

const wrappedSendMail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "judezgabi25@gmail.com",
        pass: appConfig.gmail_password, // naturally, replace both with your real credentials or an application-specific password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        // console.log("error is " + error);
        resolve(false); // or use reject(false) but then you will have to handle errors
      } else {
        // console.log("Email sent: " + info.response);
        resolve(true);
      }
    });
  });
};

export default wrappedSendMail;
