const express = require('express');
const router = express.Router();
const { getAssets, addAsset, deleteAsset, updateAsset } = require('../controllers/assets');

router
    .route('/')
    .get(getAssets)
    .post(addAsset);

router
    .route('/:id')
    .delete(deleteAsset)
    .patch(updateAsset);

module.exports = router;