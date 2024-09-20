const Joi = require("joi");

function SignupValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  console.log(req.body);
  if (error) {
    return res.status(400).json({ message: "bad Request", error });
  }
  next();
}

function LoginValidation(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad Request", error });
  }
  next();
}

module.exports = {
  SignupValidation,
  LoginValidation,
};
