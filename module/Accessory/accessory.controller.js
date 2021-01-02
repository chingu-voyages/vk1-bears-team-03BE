const { accessoryModel } = require("./Accessory.model");

// @desc     Get all assets
// @route    GET /api/v1/assets

exports.getAccessories = async (req, res, next) => {
  try {
    const accessory = await accessoryModel.find();

    return res.status(200).json({
      success: true,
      count: accessories.length,
      data: accessories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc     Add asset
// @route    POST /api/v1/assets

exports.addAccessory = async (req, res, next) => {
  try {
    const {
      accessory_name,
      accessory_category,
      accessory_description,
      accessory_manufacturer,
      accessory_location,
      accessory_purchasedate,
      accessory_supplier,
      accessory_invoicenum,
      accessory_purchasecost,
      accessory_qty,
      accessory_warranty,
      accessory_defaultlocation,
      accessory_notes,

    } = req.body;

    const accessory = await accessoryModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: accessory,
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

exports.deleteAccessory = async (req, res, next) => {
  try {
    const accessory = await accessoryModel.findById(req.params.id);

    if (!accessory) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await accessory.remove();
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

exports.updateAccessory = async (req, res, next) => {
  try {
    const accessory = await accessoryModel.findByIdAndUpdate(req.params.id);

    if (!accessory) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await accessory.updateOne(req.body);
    const updatedAccessory = await accessoryModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: updatedAccessory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
