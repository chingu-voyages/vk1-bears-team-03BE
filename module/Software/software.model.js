const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SoftwareSchema = new mongoose.Schema({
  software_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this Department"],
  },
  software_category: {
    type: String,
    trim: true,
    required: [true, "Please provide the location of this Department"],
  },
  software_key: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  software_qty: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  software_manufacturer: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  software_purchasedate: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  software_expirationdate: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  software_supplier: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  software_invoicenum: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  software_purchasecost: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
  software_notes: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },


});

const SoftwareModel = mongoose.model("Software", SoftwareSchema);
export { SoftwareModel };
