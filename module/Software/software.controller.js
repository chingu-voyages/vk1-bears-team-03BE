const { softwareModel } = require("./software.model");

// @desc     Get all softwares
// @route    GET /api/v1/softwares

exports.getSoftwares = async (req, res, next) => {
  try {
    const software = await softwareModel.find();

    return res.status(200).json({
      success: true,
      count: softwares.length,
      data: softwares,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc     Add software
// @route    POST /api/v1/softwares

exports.addSoftware = async (req, res, next) => {
  try {
    const {
      software_name,
      software_category,
      software_key,
      software_qty,
      software_manufacturer,
      software_purchasedate,
      software_expirationdate,
      software_supplier,
      software_invoicenum,
      software_purchasecost,
      software_notes,

    } = req.body;

    const software = await softwareModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: software,
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

// @desc     Delete software
// @route    GET /api/v1/softwares/:id

exports.deleteSoftware = async (req, res, next) => {
  try {
    const software = await softwareModel.findById(req.params.id);

    if (!software) {
      return res.status(404).json({
        success: false,
        error: "No software found",
      });
    }

    await software.remove();
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

// @desc     Update software
// @route    GET /api/v1/software/:id

exports.updateSoftware = async (req, res, next) => {
  try {
    const software = await softwareModel.findByIdAndUpdate(req.params.id);

    if (!software) {
      return res.status(404).json({
        success: false,
        error: "No software found",
      });
    }

    await software.updateOne(req.body);
    const updatedsoftware = await softwareModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: updatedsoftware,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
