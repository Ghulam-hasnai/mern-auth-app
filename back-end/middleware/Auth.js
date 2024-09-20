const jwt = require("jsonwebtoken");

const secretKey = "secret-123";

function ensureAuthenticated(req, res, next) {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(auth, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "unauthorized" });
  }
}

module.exports = ensureAuthenticated;
