import httpStatus from "../utils/httpStatus";

function isAdmin(req, res, next) {
  if (req.user.role === "admin") {
    next();
  } else {
    res.sendStatus(httpStatus.FORBIDDEN).send();
  }
}

export default isAdmin;
