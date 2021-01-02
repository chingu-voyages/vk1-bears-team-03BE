const express = require("express");
const accessoryRoutes = express.Router();
const {
  getAccessories,
  addAccessory,
  deleteAccessory,
  updateAccessory,
} = require("./accessory.controller");

accessoryRoutes.route("/").get(getAccessories).post(addAccessory);

accessoryRoutes.route("/:id").delete(deleteAccessory).patch(updateAccessory);

export { accessoryRoutes };
