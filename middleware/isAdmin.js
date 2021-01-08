import httpStatus from "../utils/httpStatus";

function isAdmin(req, res, next) {
  console.log("This is from isAdmin", req.user)
  if (req.user.role === "admin") {
    next();
  } else {
    res.sendStatus(httpStatus.FORBIDDEN).send();
  }
}

export default isAdmin;
