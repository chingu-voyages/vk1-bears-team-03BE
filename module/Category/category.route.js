const express = require("express");
const CategoryRoutes = express.Router();
const {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("./category.controller");

CategoryRoutes
.route("/")
.get(getCategories)

CategoryRoutes
.route("/addcategory")
.post(addCategory);

CategoryRoutes.route("/:id").delete(deleteCategory)

CategoryRoutes
.route("/updatecategory/:id")
.put(updateCategory);


export { CategoryRoutes };
