import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    // refresh_token: String,
    access_token: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Token = mongoose.model("token", TokenSchema, "token");

export { Token };
