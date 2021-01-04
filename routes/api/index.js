import express from "express";
import { userRoutes } from "../../module/User/users.route";
import { assetRoutes } from "../../module/Asset/assets.route";
import { requestRoutes } from "../../module/Request/requests.route";
import { LocationRoutes } from "../../module/Location/location.route";
import { DepartmentRoutes } from "../../module/Department/departments.route";
import { SupplierRoutes } from "../../module/Supplier/supplier.route";
import { CategoryRoutes } from "../../module/Category/category.route";

const apiRoutes = express.Router();

apiRoutes.get("/", function (req, res, next) {
  res.json({
    message: "hello world",
  });
});

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/assets", assetRoutes);
apiRoutes.use("/requests", requestRoutes);
apiRoutes.use("/locations", LocationRoutes);
apiRoutes.use("/departments", DepartmentRoutes);
apiRoutes.use("/suppliers", SupplierRoutes);
apiRoutes.use("/categories", CategoryRoutes);



export default apiRoutes;
