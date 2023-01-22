const { body } = require("express-validator");

exports.userSignupValidator = [
  body("name").not().isEmpty().withMessage("Fillup All The Fields"),
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];

exports.userSigninValidator = [
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least  6 characters long"),
];
