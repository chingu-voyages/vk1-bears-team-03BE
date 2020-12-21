const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
import mainRouter from "./routes";
import connectMongo from "./config/mongoconnect";
const cors = require("cors");

//Connect Mongo
connectMongo();

const app = express();

app.use(express.json());

app.use(cors());

// if(process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

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
