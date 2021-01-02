const { PermitModel } = require("./permit.model");

// @desc     Get all assets
// @route    GET /api/v1/assets

exports.getPermits = async (req, res, next) => {
  try {
    const permits = await PermitModel.find();

    return res.status(200).json({
      success: true,
      count: permits.length,
      data: permits,
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

exports.addPermit = async (req, res, next) => {
  try {
    const {
      permit_name,
      permit_phonenumber,
      permit_address,
      permit_country,
      permit_zipcode,
    } = req.body;

    const permit = await PermitModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: permit,
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

exports.deletePermit = async (req, res, next) => {
  try {
    const permit = await PermitModel.findById(req.params.id);

    if (!permit) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await permit.remove();
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

exports.updatePermit = async (req, res, next) => {
  try {
      const permit = await PermitModel.findById(req.params.id);

      if(!permit){
          return res.status(404).json({
              success: false,
              error: 'No asset found'
          });
      }
      Object.assign(permit, req.body);
      await permit.save();
      return res.status(200).json({
          success: true,
          data: permit,
          message: permit
      });

  } catch (error) {
      console.log("This is from the update error", error)
      return res.status(500).json({
          success: false,
          error: "Server Error"
      });
  }
}