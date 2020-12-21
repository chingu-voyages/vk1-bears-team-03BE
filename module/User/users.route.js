const express = require("express");
const userRoutes = express.Router();
const {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} = require("./users.controller");

userRoutes.route("/").get(getUsers).post(addUser);

userRoutes.route("/:id").delete(deleteUser).patch(updateUser);

export { userRoutes };
