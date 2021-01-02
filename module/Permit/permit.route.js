const express = require("express");
const PermitRoutes = express.Router();
const {
  getPermits,
  addPermit,
  deletePermit,
  updatePermit,
} = require("./permits.controller");

PermitRoutes
.route("/")
.get(getPermits)

PermitRoutes
.route("/addpermit")
.post(addPermit);

PermitRoutes.route("/:id").delete(deletePermit)

PermitRoutes
.route("/updatepermit/:id")
.put(updatePermit);


export { PermitRoutes };
