const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { dbConnection } = require("./database/db");
const userRoute = require("./routes/userRoutes");
const fileRoute = require("./routes/fileRoutes");
const orderRoute = require("./routes/orderRoutes");
require("dotenv").config();
app.use(multer().any());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/accounts", userRoute);
app.use("/api", fileRoute);
app.use("/order", orderRoute);

const url = process.env.URL;

const port = process.env.PORT || 5000;
dbConnection(url);

app.listen(port, () => {
  console.log(`server start on port ${port}`);
});
