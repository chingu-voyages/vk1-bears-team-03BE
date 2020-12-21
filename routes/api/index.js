import express from "express";
import { userRoutes } from "../../module/User/users.route";
import { assetRoutes } from "../../module/Asset/assets.route";

const apiRoutes = express.Router();

apiRoutes.get("/", function (req, res, next) {
  res.json({
    message: "hello world",
  });
});

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/assets", assetRoutes);

export default apiRoutes;
