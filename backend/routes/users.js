const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const {
  default: HandleValidationRequest,
} = require("../validations/HandleValidationRequest");
const { body } = require("express-validator");
const User = require("../models/Users");

router.post(
  "/login",

  usersController.login,
);

router.post("/logout", usersController.logout);

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email")
      .custom(async (value) => {
        const userData = await User.findOne({ email: value });
        if (userData) {
          throw new Error("Email Already Exist Please Try Again!");
        }
      })
      .notEmpty(),
    body("password").notEmpty(),
  ],
  HandleValidationRequest,
  usersController.register,
);

module.exports = router;
