const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
import { UserModel } from "./module/User/User.model";
import bcrypt from "bcryptjs";
const jwt = require('jsonwebtoken');
import appConfig from "./config/env";

passport.serializeUser(function (user, done) {
	done(null, user);
});
passport.deserializeUser(function (id, done) {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: appConfig.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: appConfig.GOOGLE_OAUTH_CLIENT_SECRET,
			callbackURL: appConfig.GOOGLE_OAUTH_CALLBACK,
		},
		async (accessToken, refreshToken, profile, done) => {
			//replace cb with done
			try {
				//check whether this current user exist in the db
				const existingUser = await UserModel.findOne({ 'google.id': profile.id });
				if (existingUser) {
					// console.log('User already exists in our DB');
					const access_token = jwt.sign(
						existingUser.toJSON(),
						appConfig.SECRET_TOKEN,
						{
							expiresIn: '24h',
						}
					);
					// console.log('access token existing user: ', access_token);
					return done(null, access_token);
				} else {
					//if no existing account, create a new account
					const newUser = new UserModel({
						method: 'google',
						email: profile.emails[0].value,
						google: {
							id: profile.id,
						},
					});
					await newUser.save();
					const access_token = jwt.sign(
						newUser.toJSON(),
						appConfig.SECRET_TOKEN,
						{
							expiresIn: appConfig.SECRET_TOKEN_EXPIRED_IN,
						}
					);
					// console.log('access token new user: ', access_token);
					return done(null, access_token);
				}
			} catch (error) {
				done(error, false, error.message);
			}
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: appConfig.FACEBOOK_OAUTH_CLIENT_ID,
			clientSecret: appConfig.FACEBOOK_OAUTH_CLIENT_SECRET,
			callbackURL: appConfig.FACEBOOK_OAUTH_CALLBACK,
			profileFields: ['id', 'emails', 'name'],
		},
		async (accessToken, refreshToken, profile, done) => {
			//replace cb with done
			try {
				//check whether this current user exist in the db
				// console.log('profile: ', profile);
				const existingUser = await UserModel.findOne({ facebookId: profile.id });
				// console.log('existingUser: ', existingUser);
				if (existingUser) {
					// console.log('User already exists in our DB');
					const access_token = jwt.sign(
						existingUser.toJSON(),
						appConfig.SECRET_TOKEN,
						{
							expiresIn: '24h',
						}
					);
					// console.log('access token existing user: ', access_token);
					return done(null, access_token);
				} else {
					//if no existing account, create a new account
					const newUser = new UserModel({
						method: 'facebook',
						email: profile.emails[0].value,
						google: {
							id: profile.id,
						},
					});
					await newUser.save();
					const access_token = jwt.sign(
						newUser.toJSON(),
						appConfig.SECRET_TOKEN,
						{
							expiresIn: '24h',
						}
					);
					// console.log('access token new user: ', access_token);
					return done(null, access_token);
				}
			} catch (error) {
				done(error, false, error.message);
			}
		}
	)
);

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email'
		},
		async (email, password, done) => {
			try {
				//Find the user given the email
				const user = await UserModel.findOne({ email }).select("+password");
				//If no user found, handle it
				if (!user) {
					return done(null, {success: false, message: "Email not registered"});
				} 
				//If user is not yet activated
				if(user && !user.is_active) {
					return done(null, {success: false, message: "User not activated"});
				}

				//Check if the password is correct
				const valid =
					user.password && (await bcrypt.compare(password, user.password));
				//If not, handle it
				if (!valid) {
					return done(null, {success: false, message: "Password incorrect"});
				}
				//Otherwise, return the user
				done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);
