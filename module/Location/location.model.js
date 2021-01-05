const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  location_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this Location"],
  },
  location_address: {
    type: String,
    trim: true,
    required: [true, "Please provide the address of this location"],
  },
  location_phonenumber: {
    type: String,
    trim: true,
    required: [true, "Please provide the phone number of this location"],
  },
  location_country: {
    type: String,
    trim: true,
    required: [true, "Please provide the country of this location"],
  },
  location_zipcode: {
    type: String,
    trim: true,
    required: [true, "Please provide the zipcode of this location"],
  },
});

const LocationModel = mongoose.model("Location", LocationSchema);
export { LocationModel };
