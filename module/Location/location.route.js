const express = require("express");
const LocationRoutes = express.Router();
const {
  getLocations,
  addLocation,
  deleteLocation,
  updateLocation,
} = require("./locations.controller");

LocationRoutes
.route("/")
.get(getLocations)

LocationRoutes
.route("/addlocation")
.post(addLocation);

LocationRoutes.route("/:id").delete(deleteLocation)

LocationRoutes
.route("/updatelocation/:id")
.put(updateLocation);


export { LocationRoutes };
