import mongoose from "mongoose";
//
const Schema = mongoose.Schema;

const AssetSchema = new mongoose.Schema({
  asset_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this Asset"],
  },
  asset_category: {
    type: String,
    required: [true, "Please specify a category"],
  },
  asset_status: {
    type: String,
    trim: true,
    enum: ["Available", "Borrowed", "Damaged"],
    default: "Available",
  },
  asset_serial: {
    type: String,
    trim: true,
    required: [true, "Please provide the serial number of this asset"],
  },
  asset_purchasecost: {
    type: String,
    trim: true,
    required: [true, "Please input the purchase cost of this asset"],
  },
  asset_warrantydate: {
    type: String,
    trim: true,
    required: [true, "Please specify the warranty date of this asset"],
  },
  asset_file: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AssetModel = mongoose.model("Asset", AssetSchema);
export { AssetModel };
