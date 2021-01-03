const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConsumableSchema = new Schema({
  consumable_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this consumable"],
  },
  consumable_category: {
    type: String,
    trim: true,
    required: [true, "Please provide the address of this consumable"],
  },
  consumable_status: {
    type: String,
    trim: true,
    required: [true, "Please provide the phone number of this consumable"],
  },
  consumable_description: {
    type: String,
    trim: true,
    required: [true, "Please provide the country of this consumable"],
  },
  consumable_serial: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_manufacturer: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_purchasedate: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_qty: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_remaining: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_supplier: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_invoicenum: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_purchasecost: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_warranty: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_location: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
  consumable_notes: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this consumable"],
  },
});

const ConsumableModel = mongoose.model("consumable", ConsumableSchema);
export { ConsumableModel };
