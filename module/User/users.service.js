import { UserModel } from "./user.model";

const Create = async (data) => {
  try {
    const user = await UserModel.create(data);
    return user;
  } catch (error) {
    throw Error(error);
  }
};

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
