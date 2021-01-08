import * as userService from "./users.service";
import httpStatus from "../../utils/httpStatus";
const jwt = require("jsonwebtoken");
import * as TokenService from "../Token/token.service";
import appConfig from "../../config/env";

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

exports.registerUser = async (req, res, next) => {
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

// @desc     login user
// @route    GET /api/v1/users/login
// @access   Public

exports.loginUser = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user)
		const access_token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
        role: user.user_role,
    }, appConfig.SECRET_TOKEN, {
			expiresIn: appConfig.SECRET_TOKEN_EXPIRED_IN,
		});
		console.log("This is from access token", access_token)
    await TokenService.Create({ access_token });
    // console.log(user)
		return res.status(httpStatus.OK).json({ message: 'Ok', access_token, user });
	} catch (error) {
		return next(new Error(error.message));
	}
};

// @desc     logout user
// @route    GET /api/v1/users/logout
// @access   Public

exports.logoutUser = async (req, res, next) => {
	try {
		const authorization =
			req.headers['x-access-token'] || req.headers.authorization;
		const token =
			authorization &&
			authorization.startsWith('Bearer') &&
			authorization.slice(7, authorization.length);

		await Promise.all([TokenService.DeleteOne({ access_token: token })]);

		return res.status(httpStatus.OK).json({ message: 'Ok' });
	} catch (error) {
		return next(new Error(error.message));
	}
};

// @desc     Activate user
// @route    POST /api/v1/activate/:activation
// @access   Public

exports.activateUser = async (req, res, next) => {
  try {
    const activation = req.params.activation;

    const updatedUser = await userService.FindOneAndUpdate(
      { activation_key: activation },
      {
        $set: { is_active: true }
      },
      (err, doc) => {
        if (err) {
          return res.status(httpStatus.BAD_REQUEST).json({
            message: "Activation error",
          });
        }

        if (!doc) {
          return res.status(httpStatus.BAD_REQUEST).json({
            message: "Activation key not found",
          });
        }

        return res.status(httpStatus.OK).json({
          message: "Activation successful",
        });
      }
    );
    return res.status(httpStatus.OK).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: err,
    });
  }
};