const express = require("express");
const userRoutes = express.Router();
import isAuthenticated from "../../middleware/isAuthenticated";
import httpStatus from "../../utils/httpStatus";
import {
  asyncWrapper
} from "../../utils/asyncWrapper";
const {
  getUsers,
  registerUser,
  deleteUser,
  updateUser,
  loginUser,
  logoutUser,
  activateUser
} = require("./users.controller");

const passport = require('passport');
require('../../passport-config'); //not putting in a variable so that we can quicky use it
// const passportLogin = passport.authenticate('local', { session: false });
const passportLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user || (!user.success && typeof user.success === "boolean")) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success : false,
        message: user.message
      });
    }

    req.login(user, next);
  })(req, res, next);
};


userRoutes.get("/", [ isAuthenticated ], asyncWrapper(getUsers));
userRoutes.delete("/:id", [ isAuthenticated ], asyncWrapper(deleteUser))
userRoutes.patch("/:id", [ isAuthenticated ], asyncWrapper(updateUser))


userRoutes.route("/register").post(registerUser);
userRoutes.post('/login', passportLogin, loginUser);
userRoutes.post('/logout', logoutUser);
userRoutes.get("/activate/:activation", activateUser);

// userRoutes.route("/:id").delete(deleteUser).patch(updateUser);

//GOOGLE AUTH
userRoutes.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);
userRoutes.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/fail' }),
	function (req, res) {
		return res
			.status(httpStatus.OK)
			.json({ message: 'Ok', access_token: req._passport.session.user });
	}
);

userRoutes.get(
	'/facebook',
	passport.authenticate('facebook', { scope: ['email'] })
);

userRoutes.get(
	'/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/fail' }),
	function (req, res) {
		// Successful authentication, redirect home.
		return res
			.status(httpStatus.OK)
			.json({ message: 'Ok', access_token: req._passport.session.user });
	}
);


export { userRoutes };
