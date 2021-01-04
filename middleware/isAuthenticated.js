const { jwtVerify } = require("./helper");
import httpStatus from "../utils/httpStatus";

const isAuthenticated = async (req, res, next) => {
  const authorization =
    req.headers["x-access-token"] || req.headers.authorization;

  const token =
    authorization &&
    authorization.startsWith("Bearer") &&
    authorization.slice(7, authorization.length);

  if (token) {
    try {
      req.decoded = await jwtVerify(token);
      return next();
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Invalid Token",
      });
    }
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Auth token is not supplied",
  });
};

module.exports = {
  isAuthenticated,
};
