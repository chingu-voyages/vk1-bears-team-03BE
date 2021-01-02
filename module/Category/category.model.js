const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    trim: true,
    required: [true, "Please add the name of this Asset"],
  },
  category_type: {
    type: String,
    required: [true, "Please specify a category"],
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },
});

const categoryModel = mongoose.model("Category", CategorySchema);
export { categoryModel };
