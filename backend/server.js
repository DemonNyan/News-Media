const express = require("express");
var morgan = require("morgan");
const newRoute = require("./routes/news");
const userRoute = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middlewares/AuthMiddleware");

require("dotenv").config();

const app = express();
app.use(morgan("dev")); //middleware
app.use(express.json()); //Json Format
app.use(cors({ origin: "http://localhost:3000", credentials: true })); //port //cookie creditianl cors
app.use(cookieParser()); // cookie

const db = process.env.MONGODB_URL;

mongoose
  .connect(db)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello MERN Stack!" });
});

app.get("/set-cookies", (req, res) => {
  res.cookie("demon", "cookie data set to demon");
  res.cookie("sithu", "cookie data set to sithu", { httpOnly: true });
  return res.send("Cookie Test");
});

app.get("/get-cookies", (req, res) => {
  let data = req.cookies;
  return res.json(data);
});

app.use("/api/news", AuthMiddleware, newRoute);
app.use("/api/users", userRoute);
