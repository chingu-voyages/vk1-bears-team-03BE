const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this Department"],
  },
  department_location: {
    type: String,
    trim: true,
    required: [true, "Please provide the location of this Department"],
  },
  department_notes: {
    type: String,
    trim: true,
    required: [true, "Please provide the notes of this Department"],
  },
});

const DepartmentModel = mongoose.model("Department", DepartmentSchema);
export { DepartmentModel };
