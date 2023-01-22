const express = require("express");
const {
  signup,
  accountActivate,
  signin,
  getUser
} = require("../controllers/authControll");
const { userMiddleware } = require("../middleware/token");
const router = express.Router();
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/authValidate");
const { runValidation } = require("../validators/errorValidate");


router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/activate/:token", accountActivate);
router.post("/signin", userSigninValidator, signin);
router.get(
  "/getuser",
  userMiddleware,
  getUser
);

module.exports = router;
