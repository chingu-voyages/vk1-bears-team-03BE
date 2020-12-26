const express = require("express");
import bodyParser from "body-parser";
const colors = require("colors");
const morgan = require("morgan");
import mainRouter from "./routes";
import connectMongo from "./config/mongoconnect";
const cors = require("cors");

const app = express();

// Production enviroment
const isProduction = process.env.NODE_ENV === "production";
app.use(cors());
app.use(bodyParser.json());

//https debug
if (!isProduction) {
  app.use(morgan("dev"));
}

//Connect Mongo
connectMongo();

app.use("/", mainRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to our Asset Management Backend!</h1>");
});

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
