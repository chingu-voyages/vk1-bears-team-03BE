const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccessorySchema = new mongoose.Schema({
  accessory_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this Department"],
  },
  accessory_category: {
    type: String,
    trim: true,
    required: [true, "Please provide the location of this Department"],
  },
  accessory_description: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_manufacturer: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_location: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_purchasedate: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_supplier: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_invoicenum: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_purchasecost: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_qty: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_warranty: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_defaultlocation: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  accessory_notes: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },

});

const AccessoryModel = mongoose.model("Location", AccessorySchema);
export { AccessoryModel };
