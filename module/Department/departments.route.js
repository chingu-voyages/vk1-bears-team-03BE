const express = require("express");
const DepartmentRoutes = express.Router();
const {
  getDepartments,
  addDepartment,
  deleteDepartment,
  updateDepartment,
} = require("./departments.controller");

DepartmentRoutes
.route("/")
.get(getDepartments)

DepartmentRoutes
.route("/adddepartment")
.post(addDepartment);

DepartmentRoutes.route("/:id").delete(deleteDepartment)

DepartmentRoutes
.route("/updatedepartment/:id")
.put(updateDepartment);


export { DepartmentRoutes };
