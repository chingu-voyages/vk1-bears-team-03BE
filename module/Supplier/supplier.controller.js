const { SupplierModel } = require("./Supplier.model");

// @desc     Get all assets
// @route    GET /api/v1/assets

exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await SupplierModel.find();

    return res.status(200).json({
      success: true,
      count: suppliers.length,
      data: suppliers,
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

exports.addSupplier = async (req, res, next) => {
  try {
    const {
      supplier_name,
      supplier_address,
      supplier_country,
      supplier_zipcode,
      supplier_contactname,
      supplier_phonenumber,
      supplier_emailaddress,
      supplier_notes
    } = req.body;

    const supplier = await SupplierModel.create(req.body);

    return res.status(201).json({  
      success: true,
      data: supplier,
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

exports.deleteSupplier = async (req, res, next) => {
  try {
    const supplier = await SupplierModel.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await supplier.remove();
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

exports.updateSupplier = async (req, res, next) => {
  try {
    const supplier = await SupplierModel.findByIdAndUpdate(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await supplier.updateOne(req.body);
    const updatedSupplier = await SupplierModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: updatedSupplier,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
