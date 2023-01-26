const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyUser) {
      return res.status(401).send("Unauthorized user");
    }
    req.token = verifyUser;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
