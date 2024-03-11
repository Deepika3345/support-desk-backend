const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        //get token from header
      token = req.headers.authorization.split(" ")[1];

      //   verify token

      const decoded = jwt.verify(token,process.env.JWT_SECRET)

      // Get user
      const user = await User.findById(decoded.id).select("-password");
      if (!user || !user.isAdmin) {
        res.status(401);
        throw new Error("You are not an admin");
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error)
      res.status(401);
      throw new Error("Invalid");
    }
  } else {
    res.status(401);
    throw new Error("You are Unauthorized");
  }
});

module.exports ={ adminProtect};
