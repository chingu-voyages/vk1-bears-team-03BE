const express = require("express");
const SupplierRoutes = express.Router();
const {
  getSuppliers,
  addSupplier,
  deleteSupplier,
  updateSupplier,
} = require("./supplier.controller");

SupplierRoutes
.route("/")
.get(getSuppliers)

SupplierRoutes
.route("/addsupplier")
.post(addSupplier);

SupplierRoutes.route("/:id").delete(deleteSupplier)

SupplierRoutes
.route("/updatesupplier/:id")
.put(updateSupplier);


export { SupplierRoutes };
