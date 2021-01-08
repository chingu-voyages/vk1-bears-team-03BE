const express = require("express");
const assetRoutes = express.Router();
import isAuthenticated from "../../middleware/isAuthenticated";
import { asyncWrapper } from "../../utils/asyncWrapper";
const {
  getAsset,
  getAssets,
  addAsset,
  deleteAsset,
  updateAsset,
} = require("./assets.controller");

assetRoutes.get("/",  asyncWrapper(getAssets))
assetRoutes.get("/viewmore/:id", asyncWrapper(getAsset))
assetRoutes.post("/",  asyncWrapper(addAsset))
assetRoutes.delete("/:id",  asyncWrapper(deleteAsset))
assetRoutes.put("/updateasset/:id", asyncWrapper(updateAsset))

export { assetRoutes };
