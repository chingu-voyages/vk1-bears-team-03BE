const express = require("express");
const assetRoutes = express.Router();
const {
  getAsset,
  getAssets,
  addAsset,
  deleteAsset,
  updateAsset,
} = require("./assets.controller");

// assetRoutes.route("/").get(getAssets).post(addAsset);

// assetRoutes.route("/:id").delete(deleteAsset).patch(updateAsset);


assetRoutes
    .route('/')
    .get(getAssets)
    .post(addAsset);

assetRoutes
    .route('/:id')
    .delete(deleteAsset)

assetRoutes
    .route('/asset/:id')
    .get(getAsset)

assetRoutes
    .route('/updateasset/:id')
    .put(updateAsset);

export { assetRoutes };
