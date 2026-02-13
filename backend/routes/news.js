const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const newControllers = require("../controllers/newControllers");
const {
  default: HandleValidationRequest,
} = require("../validations/HandleValidationRequest");
// const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.get("", newControllers.index); //show all
router.post(
  "",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("author").notEmpty(),
    body("type").notEmpty(),
  ],
  HandleValidationRequest,

  newControllers.store,
); //create new
router.get("/:id", newControllers.show); //detail new
router.delete("/:id", newControllers.destory); //delete new
router.patch(
  "/:id",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("author").notEmpty(),
    body("type").notEmpty(),
  ],
  HandleValidationRequest,
  newControllers.update,
); //update new

module.exports = router;
