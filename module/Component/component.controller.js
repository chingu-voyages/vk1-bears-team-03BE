const { componentModel } = require("./Component.model");

// @desc     Get all assets
// @route    GET /api/v1/assets

exports.getComponents = async (req, res, next) => {
  try {
    const components = await componentModel.find();

    return res.status(200).json({
      success: true,
      count: components.length,
      data: components,
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

exports.addComponent = async (req, res, next) => {
  try {
    const {
      component_name,
      component_category,
      component_description,
      component_serial,
      component_qty,
      component_location,
      component_purchasedate,
      component_supplier,
    } = req.body;

    const component = await componentModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: component,
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

exports.deleteComponent = async (req, res, next) => {
  try {
    const component = await componentModel.findById(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await component.remove();
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

exports.updateComponent = async (req, res, next) => {
  try {
    const component = await componentModel.findByIdAndUpdate(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await component.updateOne(req.body);
    const updatedComponent = await componentModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: updatedComponent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
