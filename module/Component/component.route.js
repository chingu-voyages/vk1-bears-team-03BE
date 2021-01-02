const express = require("express");
const ComponentRoutes = express.Router();
const {
getComponents,
  addComponent,
  deleteComponent,
  updateComponent,
} = require("./components.controller");

ComponentRoutes
.route("/")
.get(getComponents)

ComponentRoutes
.route("/addcomponent")
.post(addComponent);

ComponentRoutes.route("/:id").delete(deleteComponent)

ComponentRoutes
.route("/updatecomponent/:id")
.put(updateComponent);


export { ComponentRoutes };
