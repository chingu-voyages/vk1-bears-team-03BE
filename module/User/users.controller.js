import * as userService from "./users.service";
import httpStatus from "../../utils/httpStatus";

// @desc     Get all users
// @route    GET /api/v1/users
// @access   Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.Find({});

    return res.status(httpStatus.OK).json({
      success: true,
      user_count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc     Add user
// @route    POST /api/v1/users
// @access   Public

exports.addUser = async (req, res, next) => {
  try {
    const user = await userService.Create(req.body);

    return res.status(httpStatus.CREATED).json({
      success: true,
      data: user,
    });
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "ActivationError") {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        error: err.message,
      });
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc     Delete user
// @route    GET /api/v1/users/:id
// @access   Public

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await userService.FindOne({ _id: req.params.id });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        error: "No user found",
      });
    }

    await userService.DeleteOne({ _id: req.params.id });
    return res.status(httpStatus.OK).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc     Update user
// @route    GET /api/v1/users/:id
// @access   Public

exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.FindOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }

    const updatedUser = await userService.FindOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
