const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});

module.exports = { protect };
