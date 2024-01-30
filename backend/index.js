const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");
const accountRouter = require("./routers/accountRouter");

try {
  mongoose.connect(process.env.MONGO);
} catch (error) {
  console.log(error);
}

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", accountRouter);

mongoose.connection.once("open", () => {

  console.log("DB connected");

  app.listen(3000, () => {
    console.log("Server on port 3000");
  });

});
