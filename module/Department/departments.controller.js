const { DepartmentModel } = require("./department.model");

// @desc     Get all assets
// @route    GET /api/v1/assets

exports.getDepartments = async (req, res, next) => { 
  try {
    const departments = await DepartmentModel.find();

    return res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
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

exports.addDepartment = async (req, res, next) => {
  try {
    const {
      department_name,
      department_location,
      department_notes,
    } = req.body;

    const department = await DepartmentModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: department,
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

exports.deleteDepartment = async (req, res, next) => {
  try {
    const department = await DepartmentModel.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        error: "No asset found",
      });
    }

    await department.remove();
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

exports.updateDepartment = async (req, res, next) => {
  try {
    const department = await DepartmentModel.findById(req.params.id);

    if(!department){
        return res.status(404).json({
            success: false,
            error: 'No asset found'
        });
    }
    Object.assign(department, req.body);
    await department.save();
    return res.status(200).json({
        success: true,
        data: department,
        message: department
    });

} catch (error) {
    console.log("This is from the update error", error)
    return res.status(500).json({
        success: false,
        error: "Server Error"
    });
}
};
