import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ["local", "google", "facebook"],
      default: "local",
      required: true,
    },
    first_name: {
      type: String,
      trim: true,
      required: [true, "Please enter a first name"],
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, "Please a last name"],
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Please enter a username"],
    },
    password: {
      type: String,
      trim: true,
      // required: [true, "Please enter a password"],
			select: false
    },
    google: {
			id: {
				type: String
			}, 
		},
		facebook: {
			id: {
				type: String
			}, 
		},
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Please enter an email address"],
    },
    user_role: {
      type: String,
      trim: true,
      enum: ["user", "admin"],
      default: "user",
    },
    assets_borrowed: [
      {
        type: Schema.Types.ObjectId,
        ref: "Asset",
      },
    ],
    is_active: {
      type: Boolean,
      default: false,
    },
    activation_key: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
export { UserModel };
