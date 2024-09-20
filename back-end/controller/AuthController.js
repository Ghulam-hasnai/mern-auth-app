const userModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "secret-123";

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "user already found", success: false });
    }

    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "user created", success: true });
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "user not found", success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "user not found", success: false });
    }

    const jwtToken = jwt.sign({ email: user.email, _id: user._id }, secretKey, {
      expiresIn: "24h",
    });

    return res
      .status(201)
      .json({
        message: "login successful",
        success: true,
        jwtToken,
        email,
        name: user.name,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", success: false });
  }
}

module.exports = {
  signup,
  login,
};
