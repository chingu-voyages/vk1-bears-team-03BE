const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  supplier_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this Location"],
  },
  supplier_address: {
    type: String,
    trim: true,
    required: [true, "Please provide the address of this location"],
  },
  supplier_country: {
    type: String,
    trim: true,
    required: [true, "Please provide the country of this location"],
  },
  supplier_zipcode: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this location"],
  },
  supplier_contactname: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this location"],
  },
  supplier_phonenumber: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this location"],
  },
  supplier_emailaddress: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this location"],
  },
  supplier_notes: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this location"],
  },
});

const SupplierModel = mongoose.model("Supplier", SupplierSchema);
export { SupplierModel };
