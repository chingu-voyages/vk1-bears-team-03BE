const express = require("express");
const ConsumableRoutes = express.Router();
const {
  getConsumbles,
  addConsumable,
  deleteConsumable,
  updateConsumable,
} = require("./consumables.controller");

ConsumableRoutes
.route("/")
.get(getConsumbles)

ConsumableRoutes
.route("/addconsumable")
.post(addConsumable);

ConsumableRoutes.route("/:id").delete(deleteConsumable)

ConsumableRoutes
.route("/updateconsumable/:id")
.put(updateConsumable);


export { ConsumableRoutes };
