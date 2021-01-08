const { jwtVerify } = require("./helper");
import httpStatus from "../utils/httpStatus";
import appConfig from "../config/env";
const isAuthenticated = async (req, res, next) => {
  const authorization =
    req.headers["x-access-token"] || req.headers.authorization;

  const token =
    authorization &&
    authorization.startsWith("Bearer") &&
    authorization.slice(7, authorization.length);
 
  if (token) {
    try {
      console.log("This is Token from isAuthenticated", token)
      req.decoded = await jwtVerify(token, process.env.SECRET_TOKEN);
      return next();
    } catch (error) {
      console.log("This is the error", error)
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Invalid Token",
      });
    }
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Auth token is not supplied",
  });
};

export default isAuthenticated;



// import jwt from "jsonwebtoken";
// import appConfig from "../config/env";

// function isAuthenticated(req, res, next) {
//   // Gather the jwt access token from the request header
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401); // if there isn't any token

//   jwt.verify(token, process.env.jwt_key, (err, user) => {
//     console.log(err);
//     console.log(token)
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next(); // pass the execution off to whatever request the client intended
//   });
// }

// export default isAuthenticated;
