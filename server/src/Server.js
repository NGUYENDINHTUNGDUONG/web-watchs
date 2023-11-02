const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const routes = require("./routes");
const errorHandler = require("./middlewares/ErrorMiddleware");

const app = express();

// app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(errorHandler);

routes(app);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 5000;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    // Khi kết nối thành công, khởi động server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => console.log(error));
