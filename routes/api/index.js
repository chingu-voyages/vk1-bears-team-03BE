import express from "express";
import { userRoutes } from "../../module/User/users.route";
import { assetRoutes } from "../../module/Asset/assets.route";
import { requestRoutes } from "../../module/Request/requests.route";
import { borrowedRoutes } from "../../module/borrow/borrowed.route";

const apiRoutes = express.Router();

apiRoutes.get("/", function (req, res, next) {
  res.json({
    message: "hello world",
  });
});

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/assets", assetRoutes);
apiRoutes.use("/requests", requestRoutes);
apiRoutes.use("/borrowedlists", borrowedRoutes);

export default apiRoutes;
