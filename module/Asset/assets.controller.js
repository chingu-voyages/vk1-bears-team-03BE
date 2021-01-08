import { AssetModel } from "./Asset.model";
import httpStatus from "../../utils/httpStatus";
// @desc     Get all assets
// @route    GET /api/v1/assets

exports.getAssets = async (req, res, next) => {
  try {
    const assets = await AssetModel.find();

    return res.status(httpStatus.OK).json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc     Get asset by ID
// @route    GET /views/assets/:id
// @access   Admin
exports.getAsset = async (req, res, next) => {
  try {
      const asset = await AssetModel.findById(req.params.id);

      if(!asset){
          return res.status(404).json({
              success: false,
              error: 'No asset found'
          });
      }

      
      return res.status(200).json({
          success: true,
          data: asset
      });

  } catch (error) {
      return res.status(500).json({
          success: false,
          error: "Server Error"
      });
  }
}
// @desc     Add asset
// @route    POST /api/v1/assets

exports.addAsset = async (req, res, next) => {
  try {
    const {
      asset_name,
      asset_category,
      asset_status,
      asset_serial,
      asset_purchasecost,
      asset_warrantydate,
      asset_file
    } = req.body;

    const asset = await AssetModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: asset,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc     Delete asset
// @route    GET /api/v1/assets/:id

exports.deleteAsset = async (req, res, next) => {
  try {
    const asset = await AssetModel.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await asset.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc     Update asset
// @route    GET /api/v1/asset/:id

exports.updateAsset = async (req, res, next) => {
  try {
      const asset = await AssetModel.findById(req.params.id);
      
      if(!asset){
          return res.status(404).json({
              success: false,
              error: 'No asset found'
          });
      }
      Object.assign(asset, req.body);
      await asset.save();
      return res.status(200).json({
          success: true,
          data: asset,
          message: asset
      });

  } catch (error) {
      console.log("This is from the update error", error)
      return res.status(500).json({
          success: false,
          error: "Server Error"
      });
  }
}
