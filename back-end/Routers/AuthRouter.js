const { Router } = require("express");
const { SignupValidation, LoginValidation } = require("../middleware/AuthValidation");
const { signup, login } = require("../controller/AuthController");

const router = Router();

router.post("/login", LoginValidation , login);

router.post("/signup", SignupValidation, signup);

module.exports = router;
