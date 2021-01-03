const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermitSchema = new Schema({
  permit_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this permit"],
  },
  permit_key: {
    type: String,
    trim: true,
    required: [true, "Please provide the address of this permit"],
  },
  permit_status: {
    type: String,
    trim: true,
    required: [true, "Please provide the phone number of this permit"],
  },
  permit_description: {
    type: String,
    trim: true,
    required: [true, "Please provide the country of this permit"],
  },
  permit_registration: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this permit"],
  },
  permit_supplier: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this permit"],
  },
  permit_invoicenum: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this permit"],
  },
  permit_purchasecost: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this permit"],
  },
  permit_notes: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this permit"],
  },
  permit_expirationdate: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this permit"],
  },
  permit_expirationdate: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this permit"],
  },
  permit_category: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this permit"],
  },
});

const PermitModel = mongoose.model("permit", PermitSchema);
export { PermitModel };
