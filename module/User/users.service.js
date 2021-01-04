import { UserModel } from "./User.model";
import bcrypt from "bcryptjs";
import crypto from "crypto-random-string";
import wrappedSendMail from "../../utils/nodeMailerSendMail";

const Create = async (data) => {
  const {
    // method,
    // first_name,
    // last_name,
    username,
    password,
    email,
    // user_role,
    // assets_borrowed,
    // is_active,
    // activation_key
  } = data;

  // validate
  if (await UserModel.findOne({ username: username })) {
    throw {
      name: "ValidationError",
      message: `Username ${username} is already taken.`,
    };
  }

  if (await UserModel.findOne({ email: email })) {
    throw {
      name: "ValidationError",
      message: `Email ${email} is already taken.`,
    };
  }

  // hash password
  let hashed = null;
  if (password) {
    hashed = bcrypt.hashSync(password, 10);
  }

  // send activation
  const activation = crypto({
    length: 16,
    type: "alphanumeric",
  });

  // email activation to user
  const mailOptions = {
    from: "sentokiryuuu@gmail.com",
    to: email,
    subject: "Activate your account",
    text: `http://localhost:${process.env.PORT}/api/v1/users/activate/${activation}`,
  };

  const resp = await wrappedSendMail(mailOptions);
  // log or process resp;
  if (!resp) {
    throw {
      name: "ActivationError",
      message: `Error sending activation key to ${email}`,
    };
  }

  const newUser = await UserModel.create({
    ...data,
    // method,
    // first_name,
    // last_name,
    // username,
    password: hashed,
    // email,
    // user_role,
    // assets_borrowed,
    // is_active,
    activation_key: activation,
  });

  return newUser;
}; // END of Create

const Find = async (query) => {
  try {
    const users = await UserModel.find(query);
    return users;
  } catch (error) {
    throw Error(error);
  }
};

const FindOne = async (query) => {
  try {
    const user = await UserModel.findOne(query);
    return user;
  } catch (error) {
    throw Error(error);
  }
};

const FindOneAndPopulate = async (query, populate_field) => {
  try {
    const user = await UserModel.findOne(query).populate(populate_field);
    const organizations = user.organizations;
    return organizations;
  } catch (error) {
    throw Error(error);
  }
};

const FindOneAndUpdate = async (filter, data, options = {}) => {
  try {
    const user = await UserModel.findOneAndUpdate(filter, data, {
      new: true,
      ...options,
    });
    return user;
  } catch (error) {
    throw Error(error);
  }
};

const DeleteOne = async (filter) => {
  try {
    const deletedUser = await UserModel.deleteOne(filter);
    return deletedUser;
  } catch (error) {
    throw Error(error);
  }
};

export {
  Create,
  Find,
  FindOne,
  FindOneAndUpdate,
  FindOneAndPopulate,
  DeleteOne,
};
