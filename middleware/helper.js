const jwt = require("jsonwebtoken");
import appConfig from "../config/env";

const jwtVerifyRefreshToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_SECRET_TOKEN, (error, decoded) => {
      if (error) {
        reject(new Error(error.message));
      }
      resolve(decoded);
    });
  });

const jwtVerify = (token) =>
  new Promise((resolve, reject) => {
    console.log("This is the token in helper", token)
    jwt.verify(token, appConfig.SECRET_TOKEN, (error, decoded) => {
      if (error) {
        console.log("This is the error from helper", error)
        reject(new Error(error.message));
      }
      resolve(decoded);
    });
  });

module.exports = {
  jwtVerifyRefreshToken,
  jwtVerify,
};
