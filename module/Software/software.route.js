const express = require("express");
const SoftwareRoutes = express.Router();
const {
  getSoftwares,
  addSoftware,
  deleteSoftware,
  updateSoftware,
} = require("./software.controller");

softwareRoutes.route("/").get(getSoftwares).post(addSoftware);

softwareRoutes.route("/:id").delete(deleteSoftware).patch(updateSoftware);

export { SoftwareRoutes };
