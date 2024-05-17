require("dotenv").config();

const { errorHandler } = require("./middlewares/errorHandler.js");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./routers/index.js"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
