const { LocationModel } = require("./location.model");

// @desc     Get all assets
// @route    GET /api/v1/assets

exports.getLocations = async (req, res, next) => {
  try {
    const locations = await LocationModel.find();

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
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

exports.addLocation = async (req, res, next) => {
  try {
    const {
      location_name,
      location_phonenumber,
      location_address,
      location_country,
      location_zipcode,
    } = req.body;

    const location = await LocationModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: location,
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

exports.deleteLocation = async (req, res, next) => {
  try {
    const location = await LocationModel.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await location.remove();
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

exports.updateLocation = async (req, res, next) => {
  try {
      const location = await LocationModel.findById(req.params.id);

      if(!location){
          return res.status(404).json({
              success: false,
              error: 'No asset found'
          });
      }
      Object.assign(location, req.body);
      await location.save();
      return res.status(200).json({
          success: true,
          data: location,
          message: location
      });

  } catch (error) {
      console.log("This is from the update error", error)
      return res.status(500).json({
          success: false,
          error: "Server Error"
      });
  }
}