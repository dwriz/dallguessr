if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }

const { errorHandler } = require("./middlewares/errorHandler.js");
const cors = require("cors");

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(require("./routers/index.js"));

app.use(errorHandler);

module.exports = { app };