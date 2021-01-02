const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComponentSchema = new mongoose.Schema({
  component_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this Asset"],
  },
  component_category: {
    type: String,
    required: [true, "Please specify a category"],
  },
  component_description: {
    type: String,
    trim: true,
    enum: ["Available", "Borrowed", "Damaged"],
    default: "Available",
  },
  component_serial: {
    type: String,
    trim: true,
    required: [true, "Please provide the serial number of this asset"],
  },
  component_qty: {
    type: String,
    trim: true,
    required: [true, "Please input the purchase cost of this asset"],
  },
  component_location: {
    type: String,
    trim: true,
    required: [true, "Please specify the warranty date of this asset"],
  },
  component_purchasedate: {
    type: String,
    trim: true,
    required: [true, "Please specify the warranty date of this asset"],
  },
  component_supplier: {
    type: String,
    trim: true,
    required: [true, "Please specify the warranty date of this asset"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const componentModel = mongoose.model("Asset", ComponentSchema);
export { componentModel };
