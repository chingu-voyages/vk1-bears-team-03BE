const { categoryModel } = require("./Category.model");

// @desc     Get all assets
// @route    GET /api/v1/assets

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
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

exports.addCategory = async (req, res, next) => {
  try {
    const {
      category_name,
      category_type,
    } = req.body;

    const category = await categoryModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: category,
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

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await category.remove();
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

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await category.updateOne(req.body);
    const updatedcategory = await categoryModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: updatedcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
