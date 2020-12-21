const express = require("express");
const assetRoutes = express.Router();
const {
  getAssets,
  addAsset,
  deleteAsset,
  updateAsset,
} = require("./assets.controller");

assetRoutes.route("/").get(getAssets).post(addAsset);

assetRoutes.route("/:id").delete(deleteAsset).patch(updateAsset);

export { assetRoutes };
