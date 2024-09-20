const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./Routers/AuthRouter");
const productsRouter = require("./Routers/ProductRouter");
const app = express();
const port = 8000;

mongoose
  .connect("mongodb://localhost:27017/auth-app")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/auth", authRouter);

app.use("/products", productsRouter);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
