const { ConsumableModel } = require("./consumable.model");

// @desc     Get all assets
// @route    GET /api/v1/assets

exports.getConsumables = async (req, res, next) => { 
  try {
    const consumables = await ConsumableModel.find();

    return res.status(200).json({
      success: true,
      count: consumables.length,
      data: consumables,
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

exports.addConsumable = async (req, res, next) => {
  try {
    const {
      consumable_name,
      consumable_category,
      consumable_status,
      consumable_description,
      consumable_serial,
      consumable_manufacturer,
      consumable_purchasedate,
      consumable_qty,
      consumable_supplier,
      consumable_invoicenum,
      consumable_purchasecost,
      consumable_warranty,
      consumable_location,
      consumable_notes,
    } = req.body;

    const consumable = await ConsumableModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: consumable,
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

exports.deleteConsumable = async (req, res, next) => {
  try {
    const consumable = await ConsumableModel.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await consumable.remove();
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

exports.updateConsumable = async (req, res, next) => {
  try {
    const consumable = await ConsumableModel.findByIdAndUpdate(req.params.id);

    if (!consumable) {
      
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await consumable.updateOne(req.body);
    const updatedConsumable = await ConsumableModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: updatedConsumable,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
